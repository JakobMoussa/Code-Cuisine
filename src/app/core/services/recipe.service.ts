/**
 * @fileoverview Main recipe orchestration service.
 * Manages ingredients, user preferences, recipe generation calls via webhook,
 * recipe caching, likes management, and synchronization with Firestore.
 */

// Angular core and HTTP modules
import { Injectable, inject, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// RxJS operators and observables
import { Observable, TimeoutError, defer, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

// Service dependencies
import { RecipeGeneratorService } from './recipe-generator.service';
import { RecipeFirestoreService } from './recipe-firestore.service';
import {
  RecipeStateService,
  Ingredient,
  UserPreferences,
  RecipeDetails,
  RecipeResult,
  GenerateRecipeRequest,
} from './recipe-state.service';

// Type re-exports for consumer convenience
export type {
  Ingredient, UserPreferences, IngredientItem, RecipeStep, RecipeNutrition,
  RecipeDetails, RecipeResult, GenerateRecipeRequest,
} from './recipe-state.service';

/**
 * Main application service coordinating recipe generation, storage, and retrieval.
 */
@Injectable({ providedIn: 'root' })
export class RecipeService {
  /** Internal shared state service */
  private readonly state = inject(RecipeStateService);
  /** Service for AI generation via n8n webhook */
  private readonly generator = inject(RecipeGeneratorService);
  /** Service for cloud persistence via Google Cloud Firestore */
  private readonly firestore = inject(RecipeFirestoreService);

  /** Signal containing current user ingredients */
  readonly ingredients = this.state.ingredients;
  /** Signal containing active user preferences */
  readonly preferences = this.state.preferences;
  /** Signal containing generated recipes */
  readonly generatedRecipes = this.state.recipes;
  /** Signal indicating whether recipe generation is in flight */
  readonly isLoading = this.state.loading;
  /** Signal holding generation error message */
  readonly errorMessage = this.state.error;

  /** Default fallback recipes provided when no dynamic generation has occurred */
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

  /** Computed signal providing generated recipes if available, otherwise default fallbacks */
  readonly recipes = computed(() =>
    this.generatedRecipes().length ? this.generatedRecipes() : this.defaultRecipes
  );

  /** Computed summary cards formatted for the results overview page */
  readonly resultsCards = computed<RecipeResult[]>(() => {
    return this.generatedRecipes().map((r, index) => ({
      id: r.id,
      label: r.label || `Recipe ${index + 1}`,
      title: r.title,
      cookingTime: r.cookingTime,
    }));
  });

  /**
   * Formats raw cooking time key into a user-friendly label.
   *
   * @param cookingTime - Key identifier for time ('quick', 'medium', 'complex').
   * @returns Formatted label string.
   */
  private formatTimeLabel(cookingTime?: string): string {
    const timeLabels: Record<string, string> = { quick: 'Quick', medium: 'Medium', complex: 'Complex' };
    return cookingTime ? (timeLabels[cookingTime] ?? cookingTime) : '';
  }

  /**
   * Builds an array of tag strings reflecting selected user preferences.
   *
   * @param prefs - Active user preferences.
   * @returns Array of tag labels.
   */
  private buildResultTags(prefs: UserPreferences): string[] {
    const tags: string[] = [];
    if (prefs.cuisine) tags.push(prefs.cuisine);
    if (prefs.cookingTime) tags.push(this.formatTimeLabel(prefs.cookingTime));
    if (prefs.diet && prefs.diet !== 'No preferences') tags.push(prefs.diet);
    return tags.length > 0 ? tags : ['Italian', 'Quick'];
  }

  /** Computed signal of tags characterizing the active recipe results */
  readonly resultTags = computed<string[]>(() => {
    const prefs = this.state.generatedPreferences() ?? this.preferences();
    return this.buildResultTags(prefs);
  });

  /**
   * Updates user preferences partially in the shared state.
   *
   * @param pref - Partial user preferences object.
   */
  setPreferences(pref: Partial<UserPreferences>): void {
    this.preferences.update((current) => ({
      ...current,
      ...pref,
    }));
  }

  /**
   * Sets the full ingredients list in the state.
   *
   * @param list - Array of ingredients.
   */
  setIngredients(list: Ingredient[]): void {
    this.ingredients.set(list);
  }

  /**
   * Appends an ingredient to the current list.
   *
   * @param item - The ingredient to add.
   */
  addIngredient(item: Ingredient): void {
    this.ingredients.update((list) => [...list, item]);
  }

  /**
   * Removes an ingredient at the specified index.
   *
   * @param index - Zero-based index of the ingredient to remove.
   */
  removeIngredient(index: number): void {
    this.ingredients.update((list) => list.filter((_, i) => i !== index));
  }

  /**
   * Clears all user-entered ingredients from the state.
   */
  clearIngredients(): void {
    this.state.clearIngredients();
  }

  /** In-memory cache for recipes loaded asynchronously from Firestore */
  private readonly cachedRecipes = new Map<string, RecipeDetails>();

  /**
   * Synchronously looks up a recipe by ID across generated, default, and cached sets.
   *
   * @param id - The recipe identifier.
   * @returns The matching RecipeDetails or undefined.
   */
  getRecipeById(id: string): RecipeDetails | undefined {
    return this.generatedRecipes().find((recipe) => recipe.id === id)
      ?? this.defaultRecipes.find((recipe) => recipe.id === id)
      ?? this.cachedRecipes.get(id);
  }

  /**
   * Asynchronously finds a recipe by ID, fetching from Firestore and caching if not available locally.
   *
   * @param id - The recipe identifier.
   * @returns A promise resolving to RecipeDetails or undefined.
   */
  async findRecipeAsync(id: string): Promise<RecipeDetails | undefined> {
    const existing = this.getRecipeById(id);
    if (existing) return existing;
    const fromFirestore = await this.firestore.getRecipeById(id);
    if (fromFirestore) {
      this.cachedRecipes.set(fromFirestore.id, fromFirestore);
      return fromFirestore;
    }
    return undefined;
  }

  /**
   * Fetches recipes for a cuisine from Firestore and updates the local cache.
   *
   * @param cuisine - Target cuisine name.
   * @returns A promise resolving to recipes for that cuisine.
   */
  async getRecipesForCuisine(cuisine: string): Promise<RecipeDetails[]> {
    const fromDb = await this.firestore.getRecipesByCuisine(cuisine);
    fromDb.forEach((r) => this.cachedRecipes.set(r.id, r));
    return fromDb;
  }

  /** Signal holding all liked recipes */
  readonly likedRecipes = this.state.likedRecipes;

  /**
   * Checks whether a given recipe ID is currently liked.
   *
   * @param id - The recipe ID to check.
   * @returns True if liked, otherwise false.
   */
  isRecipeLiked(id: string): boolean {
    return this.state.isRecipeLiked(id);
  }

  /**
   * Toggles the like status of a recipe.
   *
   * @param recipe - The recipe to like or unlike.
   * @returns True if currently liked after toggle, false otherwise.
   */
  toggleLikeRecipe(recipe: RecipeDetails): boolean {
    return this.state.toggleLikeRecipe(recipe);
  }

  /**
   * Returns all recipes currently active (generated or defaults).
   *
   * @returns Array of recipes.
   */
  getAllRecipes(): RecipeDetails[] {
    return this.recipes();
  }

  /**
   * Formats an HTTP error response into an understandable user-facing message.
   *
   * @param error - The HttpErrorResponse object.
   * @returns Readable error string.
   */
  private getHttpErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return typeof error.error === 'string' && error.error.includes('Cannot POST')
        ? 'Recipe requests are not being forwarded. Please restart the app server and try again.'
        : 'The recipe workflow could not be reached. Please check that it is active and its webhook address is correct.';
    }
    return error.status === 0 || error.status >= 500
      ? 'The recipe service is unavailable. Please try again shortly.'
      : 'The recipe request failed. Please try again.';
  }

  /**
   * Resolves various error types into a friendly error message string.
   *
   * @param error - Unknown error caught in execution.
   * @returns Resolved message string.
   */
  private resolveErrorMessage(error: unknown): string {
    if (error instanceof TimeoutError) {
      return 'Recipe generation took too long. Please try again.';
    }
    if (error instanceof HttpErrorResponse) {
      return this.getHttpErrorMessage(error);
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Could not generate recipes. Please try again.';
  }

  /**
   * Constructs the generation request payload from current state signals.
   *
   * @returns The prepared GenerateRecipeRequest object.
   */
  private prepareGenerationRequest(): GenerateRecipeRequest {
    return {
      ingredients: this.ingredients().map((ingredient) => ({ ...ingredient })),
      preferences: { ...this.preferences() },
    };
  }

  /**
   * Dispatches generation call to the generator service and writes results to state and Firestore.
   *
   * @returns Observable emitting the generated recipes.
   */
  private executeRecipeGeneration(): Observable<RecipeDetails[]> {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.generatedRecipes.set([]);
    this.state.generatedPreferences.set(null);
    const request = this.prepareGenerationRequest();
    return this.generator.generateRecipes(request).pipe(
      tap((recipes) => {
        const cuisine = request.preferences.cuisine;
        recipes.forEach((r) => {
          r.cuisine = cuisine;
        });
        this.generatedRecipes.set(recipes);
        this.state.generatedPreferences.set(request.preferences);
        this.firestore.saveGeneratedRecipes(recipes, cuisine).catch((err) => {
          console.error('Could not save recipes to Firestore:', err);
        });
        this.clearIngredients();
      }),
    );
  }

  /**
   * Fetches all saved recipes from Firestore.
   *
   * @returns Promise resolving to the list of recipes.
   */
  getSavedFirestoreRecipes(): Promise<RecipeDetails[]> {
    return this.firestore.getSavedRecipes();
  }

  /**
   * Saves a single recipe directly to Firestore.
   *
   * @param recipe - The recipe to save.
   * @returns Promise resolving to the created document ID.
   */
  saveRecipeToFirestore(recipe: RecipeDetails): Promise<string> {
    return this.firestore.saveRecipe(recipe);
  }

  /**
   * Handles generation failure, sets the error state, and rethrows.
   *
   * @param error - Caught error during generation.
   * @returns Error observable.
   */
  private handleGenerationError(error: unknown): Observable<never> {
    const message = this.resolveErrorMessage(error);
    this.errorMessage.set(message);
    return throwError(() => new Error(message));
  }

  /**
   * Initiates the recipe generation pipeline as an Observable.
   *
   * @returns Observable emitting generated recipes array.
   */
  generateRecipes(): Observable<RecipeDetails[]> {
    return defer(() => this.executeRecipeGeneration()).pipe(
      catchError((error: unknown) => this.handleGenerationError(error)),
      finalize(() => this.isLoading.set(false)),
    );
  }
}
