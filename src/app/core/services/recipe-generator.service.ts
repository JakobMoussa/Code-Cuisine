import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, defer, map, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    GenerateRecipeRequest,
    IngredientItem,
    RecipeDetails,
    RecipeStep,
} from './recipe-state.service';

@Injectable({ providedIn: 'root' })
export class RecipeGeneratorService {
    private readonly http = inject(HttpClient);
    private readonly invalidResponse =
        'The recipe service returned incomplete recipes. Please try again.';

    generateRecipes(data: GenerateRecipeRequest): Observable<RecipeDetails[]> {
        return defer(() => {
            this.validateRequest(data);
            return this.http.post<unknown>(environment.n8nWebhookUrl, data);
        }).pipe(
            timeout(180_000),
            map((response) => {
                const recipes = this.record(response)['recipes'];
                if (!Array.isArray(recipes) || recipes.length !== 3) {
                    throw new Error('Expected exactly 3 recipes. Please try again.');
                }
                return recipes.map((recipe, index) => this.normalizeRecipe(recipe, index, data));
            }),
        );
    }

    private validateRequest(data: GenerateRecipeRequest): void {
        if (!data.ingredients.length || data.ingredients.some((ingredient) =>
            !ingredient.name.trim() || !ingredient.unit.trim()
            || !Number.isFinite(ingredient.amount) || ingredient.amount <= 0,
        )) {
            throw new Error('Please add ingredients with a name and a positive amount before generating recipes.');
        }
        const preferences = data.preferences;
        if (!Number.isInteger(preferences.portions) || preferences.portions < 1
            || !Number.isInteger(preferences.cookingPersons) || preferences.cookingPersons < 1
            || !preferences.cookingTime.trim() || !preferences.cuisine.trim() || !preferences.diet.trim()) {
            throw new Error('Please check your portions, cooking persons, and preferences before generating recipes.');
        }
    }

    private normalizeRecipe(raw: unknown, index: number, request: GenerateRecipeRequest): RecipeDetails {
        const item = this.record(raw);
        const yourIngredients = this.normalizeIngredients(item['yourIngredients']);
        const extraIngredients = this.normalizeIngredients(item['extraIngredients'] ?? []);
        const steps = this.normalizeSteps(item['steps']);
        if (yourIngredients.length + extraIngredients.length === 0 || steps.length === 0) {
            throw new Error(this.invalidResponse);
        }
        const nutrition: Record<string, unknown> = item['nutrition'] == null ? {} : this.record(item['nutrition']);
        const cookingPersons = item['cookingPersons'] ?? request.preferences.cookingPersons;
        if (typeof cookingPersons !== 'number' || !Number.isInteger(cookingPersons) || cookingPersons < 1) {
            throw new Error(this.invalidResponse);
        }
        const tags = item['tags'] ?? [];
        if (!Array.isArray(tags)) throw new Error(this.invalidResponse);

        return {
            id: `generated-${index + 1}`,
            label: `Recipe ${index + 1}`,
            title: this.requiredText(item['title']),
            cookingTime: this.requiredText(item['cookingTime']),
            cookingPersons,
            tags: [...new Set(tags.map((tag) => this.requiredText(tag)))],
            likes: 0,
            nutrition: {
                calories: this.nutritionValue(nutrition['calories']),
                protein: this.nutritionValue(nutrition['protein']),
                fat: this.nutritionValue(nutrition['fat']),
                carbs: this.nutritionValue(nutrition['carbs']),
            },
            yourIngredients,
            extraIngredients,
            steps,
        };
    }

    private normalizeIngredients(raw: unknown): IngredientItem[] {
        if (!Array.isArray(raw)) throw new Error(this.invalidResponse);
        return raw.map((ingredient) => {
            const item = this.record(ingredient);
            const amount = item['amount'];
            if (typeof amount !== 'string' && !(typeof amount === 'number' && Number.isFinite(amount))) {
                throw new Error(this.invalidResponse);
            }
            return {
                name: this.requiredText(item['name']),
                amount: this.requiredText(`${amount}${item['unit'] ? ' ' + this.requiredText(item['unit']) : ''}`),
            };
        });
    }

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

    private record(value: unknown): Record<string, unknown> {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            throw new Error(this.invalidResponse);
        }
        return value as Record<string, unknown>;
    }

    private requiredText(value: unknown): string {
        if (typeof value !== 'string' || !value.trim()) throw new Error(this.invalidResponse);
        return value.trim();
    }

    private nutritionValue(value: unknown): string {
        return typeof value === 'string' && value.trim()
            ? value.trim()
            : typeof value === 'number' && Number.isFinite(value) ? String(value) : '—';
    }
}
