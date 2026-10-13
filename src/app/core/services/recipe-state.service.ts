import { Injectable, signal } from '@angular/core';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface UserPreferences {
  portions: number;
  cookingPersons: number;
  cookingTime: string;
  cuisine: string;
  diet: string;
}

export interface IngredientItem {
  amount: string;
  name: string;
}

export interface RecipeStep {
  number: number;
  title: string;
  chef: string;
  description: string;
}

export interface RecipeNutrition {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}

export interface RecipeDetails {
  id: string;
  label?: string;
  title: string;
  cookingTime: string;
  cookingPersons: number;
  tags: string[];
  likes: number;
  nutrition: RecipeNutrition;
  yourIngredients: IngredientItem[];
  extraIngredients: IngredientItem[];
  steps: RecipeStep[];
}

export interface RecipeResult {
  id: string | number;
  label: string;
  title: string;
  cookingTime: string;
}

export interface GenerateRecipeRequest {
  ingredients: Ingredient[];
  preferences: UserPreferences;
}

// Keep the existing public type names available without duplicating models.
export type RecipePreferences = UserPreferences;
export type GeneratedRecipe = RecipeDetails;

@Injectable({ providedIn: 'root' })
export class RecipeStateService {
  readonly ingredients = signal<Ingredient[]>([]);
  readonly preferences = signal<UserPreferences>({
    portions: 2,
    cookingPersons: 1,
    cookingTime: 'quick',
    cuisine: 'German',
    diet: 'No preferences',
  });
  readonly recipes = signal<RecipeDetails[]>([]);
  readonly generatedPreferences = signal<UserPreferences | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  setPreferences(preferences: Partial<UserPreferences>): void {
    this.preferences.update((current) => ({ ...current, ...preferences }));
  }
}
