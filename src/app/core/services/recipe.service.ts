import { Injectable, inject, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, TimeoutError, defer, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { RecipeGeneratorService } from './recipe-generator.service';
import {
  RecipeStateService,
  Ingredient,
  UserPreferences,
  RecipeDetails,
  RecipeResult,
} from './recipe-state.service';

export type {
  Ingredient, UserPreferences, IngredientItem, RecipeStep, RecipeNutrition,
  RecipeDetails, RecipeResult, GenerateRecipeRequest,
} from './recipe-state.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly state = inject(RecipeStateService);
  private readonly generator = inject(RecipeGeneratorService);

  readonly ingredients = this.state.ingredients;
  readonly preferences = this.state.preferences;
  readonly generatedRecipes = this.state.recipes;
  readonly isLoading = this.state.loading;
  readonly errorMessage = this.state.error;

  private readonly defaultRecipes: RecipeDetails[] = [
    {
      id: '1',
      label: 'Recipe 1',
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      cookingPersons: 2,
      tags: ['Vegetarian', 'Quick'],
      likes: 66,
      nutrition: {
        calories: '630 kcal',
        protein: '18g',
        fat: '24g',
        carbs: '58g',
      },
      yourIngredients: [
        { amount: '80g', name: 'Pasta noodles' },
        { amount: '100g', name: 'Baby spinach' },
        { amount: '150g', name: 'Cherry tomatoes' },
        { amount: '1 piece', name: 'Egg' },
      ],
      extraIngredients: [
        { amount: '40g', name: 'Parmesan cheese' },
        { amount: '30ml', name: 'Olive oil' },
        { amount: 'Herbs', name: '(dry basil, oregano, garlic)' },
      ],
      steps: [
        {
          number: 1,
          title: 'Cook the pasta',
          chef: 'Chef 1',
          description:
            'Cook your noodles in boiling, salted water, until the pasta is al dente. Drain the pasta and reserve some of the pasta water.',
        },
        {
          number: 2,
          title: 'Make the sauce',
          chef: 'Chef 2',
          description:
            'While the pasta is cooking, heat olive oil in a pan over medium heat. Add the garlic, and sauté until it starts to turn golden. Add the tomatoes, oregano, salt, and pepper, and cook for 3-4 minutes.',
        },
        {
          number: 3,
          title: 'Finish the pasta',
          chef: 'Chef 1',
          description:
            'Add the noodles to the sauce, then add pasta water until the sauce is the right consistency. Simmer for 1 minute, then add the spinach, basil, chili flakes, and parmesan.',
        },
        {
          number: 4,
          title: 'Make the sauce',
          chef: 'Chef 2',
          description:
            'Lower the heat to low, stir until mixed, and remove from the heat. Season to taste, top with parmesan cheese, and enjoy.',
        },
      ],
    },
    {
      id: '2',
      label: 'Recipe 2',
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
      cookingPersons: 2,
      tags: ['Seafood', 'Quick'],
      likes: 57,
      nutrition: {
        calories: '580 kcal',
        protein: '32g',
        fat: '28g',
        carbs: '46g',
      },
      yourIngredients: [
        { amount: '300g', name: 'Raw peeled shrimp' },
        { amount: '250g', name: 'Penne noodles' },
        { amount: '3 cloves', name: 'Garlic' },
        { amount: '150ml', name: 'Heavy cream' },
      ],
      extraIngredients: [
        { amount: '50g', name: 'Parmesan cheese' },
        { amount: '2 tbsp', name: 'Butter' },
        { amount: 'Fresh', name: 'Parsley & lemon juice' },
      ],
      steps: [
        {
          number: 1,
          title: 'Cook pasta & sear shrimp',
          chef: 'Chef 1',
          description:
            'Cook pasta in boiling salted water. Melt butter in a skillet over high heat, season shrimp and sear for 2 mins per side.',
        },
        {
          number: 2,
          title: 'Prepare cream sauce',
          chef: 'Chef 2',
          description:
            'Saute garlic for 1 minute. Pour in heavy cream, bring to simmer, and melt in Parmesan cheese until smooth.',
        },
        {
          number: 3,
          title: 'Combine and serve',
          chef: 'Chef 1',
          description:
            'Toss pasta and shrimp into the sauce. Garnish with parsley and fresh lemon juice.',
        },
      ],
    },
    {
      id: '3',
      label: 'Recipe 3',
      title: 'Pasta alla Trapanese (Sicilian Tomato Pesto)',
      cookingTime: '20min',
      cookingPersons: 4,
      tags: ['Vegetarian', 'Italian'],
      likes: 84,
      nutrition: {
        calories: '510 kcal',
        protein: '14g',
        fat: '22g',
        carbs: '62g',
      },
      yourIngredients: [
        { amount: '350g', name: 'Rigatoni pasta' },
        { amount: '300g', name: 'Cherry tomatoes' },
        { amount: '50g', name: 'Blanched almonds' },
        { amount: '1 bunch', name: 'Fresh basil' },
      ],
      extraIngredients: [
        { amount: '4 tbsp', name: 'Olive oil' },
        { amount: '50g', name: 'Pecorino Romano' },
        { amount: '1 clove', name: 'Garlic' },
      ],
      steps: [
        {
          number: 1,
          title: 'Blend raw pesto',
          chef: 'Chef 1',
          description:
            'Pulse almonds, garlic, basil, cherry tomatoes, and olive oil in a food processor until a textured pesto forms.',
        },
        {
          number: 2,
          title: 'Cook pasta and toss',
          chef: 'Chef 2',
          description:
            'Boil pasta al dente. Drain, toss with fresh Trapanese pesto, and serve topped with Pecorino Romano.',
        },
      ],
    },
  ];

  readonly recipes = computed(() =>
    this.generatedRecipes().length ? this.generatedRecipes() : this.defaultRecipes
  );

  readonly resultsCards = computed<RecipeResult[]>(() => {
    return this.generatedRecipes().map((r, index) => ({
      id: r.id,
      label: r.label || `Recipe ${index + 1}`,
      title: r.title,
      cookingTime: r.cookingTime,
    }));
  });

  readonly resultTags = computed<string[]>(() => {
    const prefs = this.state.generatedPreferences() ?? this.preferences();
    const tags: string[] = [];
    if (prefs.cuisine) tags.push(prefs.cuisine);
    if (prefs.cookingTime) {
      const timeLabel =
        prefs.cookingTime === 'quick'
          ? 'Quick'
          : prefs.cookingTime === 'medium'
            ? 'Medium'
            : prefs.cookingTime === 'complex'
              ? 'Complex'
              : prefs.cookingTime;
      tags.push(timeLabel);
    }
    if (prefs.diet && prefs.diet !== 'No preferences') {
      tags.push(prefs.diet);
    }
    return tags.length > 0 ? tags : ['Italian', 'Quick'];
  });

  setPreferences(pref: Partial<UserPreferences>): void {
    this.preferences.update((current) => ({
      ...current,
      ...pref,
    }));
  }

  setIngredients(list: Ingredient[]): void {
    this.ingredients.set(list);
  }

  addIngredient(item: Ingredient): void {
    this.ingredients.update((list) => [...list, item]);
  }

  removeIngredient(index: number): void {
    this.ingredients.update((list) => list.filter((_, i) => i !== index));
  }

  getRecipeById(id: string): RecipeDetails | undefined {
    return this.generatedRecipes().find((recipe) => recipe.id === id)
      ?? this.defaultRecipes.find((recipe) => recipe.id === id);
  }

  getAllRecipes(): RecipeDetails[] {
    return this.recipes();
  }

  generateRecipes(): Observable<RecipeDetails[]> {
    return defer(() => {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.generatedRecipes.set([]);
      this.state.generatedPreferences.set(null);

      const request = {
        ingredients: this.ingredients().map((ingredient) => ({ ...ingredient })),
        preferences: { ...this.preferences() },
      };
      return this.generator.generateRecipes(request).pipe(
        tap((recipes) => {
          this.generatedRecipes.set(recipes);
          this.state.generatedPreferences.set(request.preferences);
        }),
      );
    }).pipe(
      catchError((error: unknown) => {
        let message = 'Could not generate recipes. Please try again.';
        if (error instanceof TimeoutError) {
          message = 'Recipe generation took too long. Please try again.';
        } else if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            message = typeof error.error === 'string' && error.error.includes('Cannot POST')
              ? 'Recipe requests are not being forwarded. Please restart the app server and try again.'
              : 'The recipe workflow could not be reached. Please check that it is active and its webhook address is correct.';
          } else {
            message = error.status === 0 || error.status >= 500
              ? 'The recipe service is unavailable. Please try again shortly.'
              : 'The recipe request failed. Please try again.';
          }
        } else if (error instanceof Error) {
          message = error.message;
        }
        this.errorMessage.set(message);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.isLoading.set(false)),
    );
  }
}
