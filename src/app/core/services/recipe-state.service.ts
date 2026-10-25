/**
 * @fileoverview Recipe state service module.
 * Provides application-wide state management for ingredients, preferences,
 * generated recipes, loading status, and user-favorited recipes using Angular signals.
 */

// Angular core modules
import { Injectable, signal } from '@angular/core';

/**
 * Represents an individual ingredient with its name, quantity, and measurement unit.
 */
export interface Ingredient {
  /** Name of the ingredient */
  name: string;
  /** Numerical amount of the ingredient */
  amount: number;
  /** Unit of measurement (e.g. 'gram', 'ml', 'piece') */
  unit: string;
}

/**
 * User preferences defining dietary restrictions, serving size, and cuisine preferences.
 */
export interface UserPreferences {
  /** Number of portions to prepare */
  portions: number;
  /** Number of persons cooking together */
  cookingPersons: number;
  /** Desired cooking duration category ('quick', 'medium', 'complex') */
  cookingTime: string;
  /** Desired cuisine style (e.g. 'German', 'Italian') */
  cuisine: string;
  /** Dietary lifestyle preference (e.g. 'Vegetarian', 'Vegan', 'No preferences') */
  diet: string;
}

/**
 * An ingredient line item within a generated recipe with preformatted display string.
 */
export interface IngredientItem {
  /** Formatted quantity with unit (e.g. '200g') */
  amount: string;
  /** Name of the ingredient */
  name: string;
}

/**
 * An individual step in a recipe's preparation instructions.
 */
export interface RecipeStep {
  /** Step sequence number (1-based) */
  number: number;
  /** Title or summary of the cooking step */
  title: string;
  /** Assigned cook or role (e.g. 'Chef 1', 'Chef 2') */
  chef: string;
  /** Detailed step instructions */
  description: string;
}

/**
 * Nutritional breakdown of a single recipe.
 */
export interface RecipeNutrition {
  /** Caloric content */
  calories: string;
  /** Protein content */
  protein: string;
  /** Fat content */
  fat: string;
  /** Carbohydrate content */
  carbs: string;
}

/**
 * Full details model for a cooking recipe.
 */
export interface RecipeDetails {
  /** Unique identifier of the recipe */
  id: string;
  /** Optional recipe label or badge */
  label?: string;
  /** Title of the recipe */
  title: string;
  /** Cuisine category */
  cuisine?: string;
  /** Cooking time duration */
  cookingTime: string;
  /** Number of persons cooking */
  cookingPersons: number;
  /** Descriptive tags */
  tags: string[];
  /** Favorite / like count */
  likes: number;
  /** Nutritional information */
  nutrition: RecipeNutrition;
  /** Ingredients supplied by the user */
  yourIngredients: IngredientItem[];
  /** Extra pantry ingredients required */
  extraIngredients: IngredientItem[];
  /** Ordered list of cooking instructions */
  steps: RecipeStep[];
}

/**
 * Lightweight recipe summary model used in card previews.
 */
export interface RecipeResult {
  /** Unique identifier */
  id: string | number;
  /** Label badge */
  label: string;
  /** Recipe title */
  title: string;
  /** Cooking time duration */
  cookingTime: string;
}

/**
 * Request payload sent to the recipe generation backend.
 */
export interface GenerateRecipeRequest {
  /** Array of available ingredients */
  ingredients: Ingredient[];
  /** User-configured cooking preferences */
  preferences: UserPreferences;
}

/** Type alias for UserPreferences */
export type RecipePreferences = UserPreferences;
/** Type alias for RecipeDetails */
export type GeneratedRecipe = RecipeDetails;

/**
 * Central state service maintaining user input, generated results, and liked recipes.
 */
@Injectable({ providedIn: 'root' })
export class RecipeStateService {
  /** Signal containing the current user-entered ingredients list */
  readonly ingredients = signal<Ingredient[]>([]);

  /** Signal holding the current user cooking preferences */
  readonly preferences = signal<UserPreferences>({
    portions: 2,
    cookingPersons: 1,
    cookingTime: 'quick',
    cuisine: 'German',
    diet: 'No preferences',
  });

  /** Signal containing the most recently generated recipes */
  readonly recipes = signal<RecipeDetails[]>([]);

  /** Signal containing preferences active during the last generation run */
  readonly generatedPreferences = signal<UserPreferences | null>(null);

  /** Signal indicating whether an asynchronous generation is active */
  readonly loading = signal(false);

  /** Signal holding any active error message, or null */
  readonly error = signal<string | null>(null);

  /** Signal holding all recipes favorited by the user */
  readonly likedRecipes = signal<Array<{ id: string; title: string; cookingTime: string; likes: number }>>([
    {
      id: '1',
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      likes: 66,
    },
    {
      id: '2',
      title: 'Low Carb Vegan No-Bake Paleo Bars',
      cookingTime: '35min',
      likes: 57,
    },
    {
      id: '3',
      title: 'Schnitzel with Warm Potato Salad',
      cookingTime: '45min',
      likes: 42,
    },
    {
      id: '4',
      title: 'Gourmet Truffle Mushroom Risotto',
      cookingTime: '30min',
      likes: 89,
    },
  ]);

  /**
   * Partially updates user preferences in the state signal.
   *
   * @param preferences - The partial preferences to merge into current state.
   */
  setPreferences(preferences: Partial<UserPreferences>): void {
    this.preferences.update((current) => ({ ...current, ...preferences }));
  }

  /**
   * Clears the user-entered ingredients list.
   */
  clearIngredients(): void {
    this.ingredients.set([]);
  }

  /**
   * Checks whether a recipe is currently marked as favorite.
   *
   * @param id - Unique identifier of the recipe.
   * @returns True if liked, otherwise false.
   */
  isRecipeLiked(id: string): boolean {
    return this.likedRecipes().some((r) => r.id === id);
  }

  /**
   * Toggles the favorite status of a recipe.
   *
   * @param recipe - The recipe to like or unlike.
   * @returns True if the recipe is now liked, false if removed from favorites.
   */
  toggleLikeRecipe(recipe: RecipeDetails): boolean {
    const isCurrentlyLiked = this.isRecipeLiked(recipe.id);
    if (isCurrentlyLiked) {
      this.likedRecipes.update((list) => list.filter((r) => r.id !== recipe.id));
      return false;
    } else {
      this.likedRecipes.update((list) => [
        {
          id: recipe.id,
          title: recipe.title,
          cookingTime: recipe.cookingTime,
          likes: recipe.likes,
        },
        ...list.filter((r) => r.id !== recipe.id),
      ]);
      return true;
    }
  }
}
