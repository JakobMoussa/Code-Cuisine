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
  cuisine?: string;
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

  setPreferences(preferences: Partial<UserPreferences>): void {
    this.preferences.update((current) => ({ ...current, ...preferences }));
  }

  isRecipeLiked(id: string): boolean {
    return this.likedRecipes().some((r) => r.id === id);
  }

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
