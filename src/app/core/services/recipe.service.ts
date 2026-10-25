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
      title: 'Funghi salami pizza',
      cuisine: 'italian',
      cookingTime: '16min',
      cookingPersons: 2,
      tags: ['Quick', 'Italian'],
      likes: 42,
      nutrition: {
        calories: '680 kcal',
        protein: '24g',
        fat: '28g',
        carbs: '78g',
      },
      yourIngredients: [
        { amount: '1 piece', name: 'Fresh pizza dough' },
        { amount: '150g', name: 'Fresh mushrooms (Champignons / Funghi)' },
        { amount: '80g', name: 'Italian salami (thinly sliced)' },
        { amount: '150g', name: 'Mozzarella cheese' },
      ],
      extraIngredients: [
        { amount: '100ml', name: 'Tomato passata sauce' },
        { amount: '1 tbsp', name: 'Extra virgin olive oil' },
        { amount: '1 tsp', name: 'Dried oregano & sea salt' },
        { amount: 'Fresh', name: 'Basil leaves' },
      ],
      steps: [
        {
          number: 1,
          title: 'Preheat oven & prep ingredients',
          chef: 'Chef 1',
          description:
            'Preheat your oven to 230°C (450°F). Clean and finely slice the fresh mushrooms (Funghi). Cut the mozzarella into small cubes and set out the salami slices.',
        },
        {
          number: 2,
          title: 'Roll out the dough & season the sauce',
          chef: 'Chef 2',
          description:
            'Roll out the pizza dough on parchment paper or a baking tray into a round base. Stir the oregano, a pinch of sea salt, and a splash of olive oil into the tomato sauce.',
        },
        {
          number: 3,
          title: 'Assemble toppings',
          chef: 'Chef 1',
          description:
            'Spread the tomato sauce evenly over the dough, leaving a 1cm crust edge. Distribute the mozzarella, layer the salami slices across the top, and scatter the sliced mushrooms.',
        },
        {
          number: 4,
          title: 'Bake to crispy perfection',
          chef: 'Chef 2',
          description:
            'Transfer to the hot oven and bake for 12–15 minutes until the crust is golden, crispy, and the mozzarella is bubbling. Garnish with fresh basil, slice into wedges, and serve hot.',
        },
      ],
    },
    {
      id: '4',
      label: 'Recipe 4',
      title: 'Pasta alla Trapanese (Sicilian Tomato Pesto)',
      cuisine: 'italian',
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
   * Asynchronously finds a recipe by ID, fetching from Firestore and falling back to memory.
   *
   * @param id - The recipe identifier.
   * @returns A promise resolving to RecipeDetails or undefined.
   */
  async findRecipeAsync(id: string): Promise<RecipeDetails | undefined> {
    const fromFirestore = await this.firestore.getRecipeById(id);
    if (fromFirestore) {
      const defaultR = this.defaultRecipes.find((r) => r.id === id);
      const recipeToUse: RecipeDetails = defaultR
        ? { ...defaultR, likes: fromFirestore.likes }
        : fromFirestore;
      this.cachedRecipes.set(recipeToUse.id, recipeToUse);
      this.updateRecipeLikesInMemory(id, fromFirestore.likes);
      return recipeToUse;
    }
    return this.getRecipeById(id);
  }

  /**
   * Fetches fresh recipe data directly from Firestore backend.
   *
   * @param id - Target recipe identifier.
   * @returns Promise resolving to RecipeDetails or null.
   */
  async fetchRecipeFromBackend(id: string): Promise<RecipeDetails | null> {
    const fromFirestore = await this.firestore.getRecipeById(id);
    if (fromFirestore) {
      const defaultR = this.defaultRecipes.find((r) => r.id === id);
      const recipeToUse: RecipeDetails = defaultR
        ? { ...defaultR, likes: fromFirestore.likes }
        : fromFirestore;
      this.cachedRecipes.set(recipeToUse.id, recipeToUse);
      this.updateRecipeLikesInMemory(id, fromFirestore.likes);
      return recipeToUse;
    }
    return null;
  }

  /**
   * Fetches most liked recipes from Firestore backend.
   *
   * @param limitCount - Maximum number of recipes.
   * @returns Promise resolving to array of top liked RecipeDetails.
   */
  getMostLikedRecipes(limitCount = 10): Promise<RecipeDetails[]> {
    return this.firestore.getMostLikedRecipes(limitCount);
  }

  /**
   * Updates like counters across all in-memory recipe collections.
   *
   * @param id - Target recipe ID.
   * @param likes - Updated like count.
   */
  updateRecipeLikesInMemory(id: string, likes: number): void {
    const generated = this.generatedRecipes();
    const foundGen = generated.find((r) => r.id === id);
    if (foundGen) {
      foundGen.likes = likes;
      this.generatedRecipes.set([...generated]);
    }
    const defaultR = this.defaultRecipes.find((r) => r.id === id);
    if (defaultR) {
      defaultR.likes = likes;
    }
    const cached = this.cachedRecipes.get(id);
    if (cached) {
      cached.likes = likes;
    }
    this.state.updateRecipeLikesInList(id, likes);
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
   * Toggles the like status of a recipe and saves it to Firestore.
   *
   * @param recipe - The recipe to like or unlike.
   * @param isLiked - Optional explicit like flag.
   * @returns Promise resolving to the updated likes count.
   */
  async toggleLikeRecipe(recipe: RecipeDetails, isLiked?: boolean): Promise<number> {
    const desiredState = typeof isLiked === 'boolean'
      ? isLiked
      : !this.isRecipeLiked(recipe.id);

    this.state.setRecipeLiked(recipe, desiredState);

    const delta = desiredState ? 1 : -1;
    const updatedLikes = await this.firestore.updateRecipeLikes(recipe, delta);
    const finalLikes = typeof updatedLikes === 'number'
      ? updatedLikes
      : Math.max(0, recipe.likes);

    recipe.likes = finalLikes;
    this.updateRecipeLikesInMemory(recipe.id, finalLikes);
    return finalLikes;
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
          r.id = this.firestore.generateRecipeId();
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
