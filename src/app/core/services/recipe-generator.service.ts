/**
 * @fileoverview Recipe generator service.
 * Handles HTTP communication with the n8n webhook backend to request AI-generated recipes,
 * validates payloads and responses, and normalizes output into RecipeDetails domain objects.
 */

// Angular core and HTTP modules
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJS operators and observables
import { Observable, defer, map, timeout } from 'rxjs';

// Environment and type imports
import { environment } from '../../../environments/environment';
import {
    GenerateRecipeRequest,
    IngredientItem,
    RecipeDetails,
    RecipeStep,
} from './recipe-state.service';

/**
 * Service responsible for dispatching recipe generation requests and parsing response data.
 */
@Injectable({ providedIn: 'root' })
export class RecipeGeneratorService {
    /** Angular HttpClient instance */
    private readonly http = inject(HttpClient);
    /** Error message used when backend response fails validation */
    private readonly invalidResponse =
        'The recipe service returned incomplete recipes. Please try again.';

    /**
     * Sends user ingredients and preferences to the n8n webhook to generate 3 recipes.
     *
     * @param data - The generation request containing ingredients and preferences.
     * @returns Observable emitting an array of 3 normalized RecipeDetails.
     */
    generateRecipes(data: GenerateRecipeRequest): Observable<RecipeDetails[]> {
        return defer(() => {
            this.validateRequest(data);
            return this.http.post<unknown>(environment.n8nWebhookUrl, data);
        }).pipe(
            timeout(180_000),
            map((response) => this.parseRecipesResponse(response, data)),
        );
    }

    /**
     * Parses and validates the raw JSON response payload from the webhook.
     *
     * @param response - Raw response from the backend.
     * @param data - Original request payload for fallback values.
     * @returns Array of validated RecipeDetails.
     */
    private parseRecipesResponse(response: unknown, data: GenerateRecipeRequest): RecipeDetails[] {
        const recipes = this.record(response)['recipes'];
        if (!Array.isArray(recipes) || recipes.length !== 3) {
            throw new Error('Expected exactly 3 recipes. Please try again.');
        }
        return recipes.map((recipe, index) => this.normalizeRecipe(recipe, index, data));
    }

    /**
     * Validates incoming request data prior to transmission.
     *
     * @param data - The request data to check.
     */
    private validateRequest(data: GenerateRecipeRequest): void {
        this.validateIngredientsInput(data.ingredients);
        this.validatePreferencesInput(data.preferences);
    }

    /**
     * Validates that the ingredients array is non-empty and each item has valid fields.
     *
     * @param ingredients - Array of ingredient objects.
     */
    private validateIngredientsInput(ingredients: GenerateRecipeRequest['ingredients']): void {
        const isInvalid = !ingredients.length || ingredients.some((ingredient) =>
            !ingredient.name.trim() || !ingredient.unit.trim()
            || !Number.isFinite(ingredient.amount) || ingredient.amount <= 0,
        );
        if (isInvalid) {
            throw new Error('Please add ingredients with a name and a positive amount before generating recipes.');
        }
    }

    /**
     * Validates that preferences contain valid integers and non-empty strings.
     *
     * @param preferences - User preferences object.
     */
    private validatePreferencesInput(preferences: GenerateRecipeRequest['preferences']): void {
        const invalidNumbers = !Number.isInteger(preferences.portions) || preferences.portions < 1
            || !Number.isInteger(preferences.cookingPersons) || preferences.cookingPersons < 1;
        const invalidStrings = !preferences.cookingTime.trim() || !preferences.cuisine.trim() || !preferences.diet.trim();
        if (invalidNumbers || invalidStrings) {
            throw new Error('Please check your portions, cooking persons, and preferences before generating recipes.');
        }
    }

    /**
     * Parses and normalizes ingredients and steps from a raw recipe record.
     *
     * @param item - Raw recipe record.
     * @returns Extracted ingredients and steps.
     */
    private parseIngredientsAndSteps(item: Record<string, unknown>) {
        const yourIngredients = this.normalizeIngredients(item['yourIngredients']);
        const extraIngredients = this.normalizeIngredients(item['extraIngredients'] ?? []);
        const steps = this.normalizeSteps(item['steps']);
        if (yourIngredients.length + extraIngredients.length === 0 || steps.length === 0) {
            throw new Error(this.invalidResponse);
        }
        return { yourIngredients, extraIngredients, steps };
    }

    /**
     * Parses the cooking persons count, falling back if omitted.
     *
     * @param raw - Raw value from API.
     * @param fallback - Fallback count from request.
     * @returns Valid positive integer count.
     */
    private parseCookingPersons(raw: unknown, fallback: number): number {
        const val = raw ?? fallback;
        if (typeof val !== 'number' || !Number.isInteger(val) || val < 1) {
            throw new Error(this.invalidResponse);
        }
        return val;
    }

    /**
     * Parses and deduplicates tags for a recipe.
     *
     * @param raw - Raw tag array.
     * @returns Deduplicated string array of tags.
     */
    private parseTags(raw: unknown): string[] {
        if (raw != null && !Array.isArray(raw)) throw new Error(this.invalidResponse);
        const tags = Array.isArray(raw) ? raw : [];
        return [...new Set(tags.map((tag) => this.requiredText(tag)))];
    }

    /**
     * Parses nutrition information with fallbacks for missing macros.
     *
     * @param raw - Raw nutrition record.
     * @returns Typed RecipeNutrition object.
     */
    private parseNutrition(raw: unknown): RecipeDetails['nutrition'] {
        const nutrition: Record<string, unknown> = raw == null ? {} : this.record(raw);
        return {
            calories: this.nutritionValue(nutrition['calories']),
            protein: this.nutritionValue(nutrition['protein']),
            fat: this.nutritionValue(nutrition['fat']),
            carbs: this.nutritionValue(nutrition['carbs']),
        };
    }

    /**
     * Normalizes a raw recipe item into a typed RecipeDetails model.
     *
     * @param raw - Raw recipe item from API.
     * @param index - Index in the results array.
     * @param request - Original generation request.
     * @returns Normalized RecipeDetails object.
     */
    private normalizeRecipe(raw: unknown, index: number, request: GenerateRecipeRequest): RecipeDetails {
        const item = this.record(raw);
        const { yourIngredients, extraIngredients, steps } = this.parseIngredientsAndSteps(item);
        const cookingPersons = this.parseCookingPersons(item['cookingPersons'], request.preferences.cookingPersons);
        return {
            id: `generated-${index + 1}`,
            label: `Recipe ${index + 1}`,
            title: this.requiredText(item['title']),
            cookingTime: this.requiredText(item['cookingTime']),
            cookingPersons,
            tags: this.parseTags(item['tags']),
            likes: 0,
            nutrition: this.parseNutrition(item['nutrition']),
            yourIngredients, extraIngredients, steps,
        };
    }

    /**
     * Normalizes a single ingredient entry with name and formatted amount.
     *
     * @param ingredient - Raw ingredient object.
     * @returns Normalized IngredientItem.
     */
    private normalizeIngredientItem(ingredient: unknown): IngredientItem {
        const item = this.record(ingredient);
        const amount = item['amount'];
        if (typeof amount !== 'string' && !(typeof amount === 'number' && Number.isFinite(amount))) {
            throw new Error(this.invalidResponse);
        }
        const unitSuffix = item['unit'] ? ' ' + this.requiredText(item['unit']) : '';
        return {
            name: this.requiredText(item['name']),
            amount: this.requiredText(`${amount}${unitSuffix}`),
        };
    }

    /**
     * Normalizes an array of ingredient entries.
     *
     * @param raw - Raw ingredient array.
     * @returns Array of IngredientItems.
     */
    private normalizeIngredients(raw: unknown): IngredientItem[] {
        if (!Array.isArray(raw)) throw new Error(this.invalidResponse);
        return raw.map((ingredient) => this.normalizeIngredientItem(ingredient));
    }

    /**
     * Normalizes an array of cooking steps with sequential numbering.
     *
     * @param raw - Raw steps array.
     * @returns Array of RecipeSteps.
     */
    private normalizeSteps(raw: unknown): RecipeStep[] {
        if (!Array.isArray(raw)) throw new Error(this.invalidResponse);
        return raw.map((step, index) => {
            const item = this.record(step);
            return {
                number: index + 1,
                title: this.requiredText(item['title']),
                description: this.requiredText(item['description']),
                chef: item['chef'] == null ? 'Chef 1' : this.requiredText(item['chef']),
            };
        });
    }

    /**
     * Ensures a value is a valid non-null object record.
     *
     * @param value - Value to check.
     * @returns The value cast as Record.
     */
    private record(value: unknown): Record<string, unknown> {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            throw new Error(this.invalidResponse);
        }
        return value as Record<string, unknown>;
    }

    /**
     * Ensures and trims a non-empty string.
     *
     * @param value - Value to validate.
     * @returns Trimmed string.
     */
    private requiredText(value: unknown): string {
        if (typeof value !== 'string' || !value.trim()) throw new Error(this.invalidResponse);
        return value.trim();
    }

    /**
     * Formats a nutrition numeric/text value into a display string.
     *
     * @param value - Raw nutrition value.
     * @returns Display string or '—'.
     */
    private nutritionValue(value: unknown): string {
        return typeof value === 'string' && value.trim()
            ? value.trim()
            : typeof value === 'number' && Number.isFinite(value) ? String(value) : '—';
    }
}
