import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { RecipeService } from './recipe.service';
import { RecipeStateService } from './recipe-state.service';

function recipeResponse() {
  return {
    recipes: Array.from({ length: 3 }, (_, index) => ({
      id: index + 1,
      title: `Tomato recipe ${index + 1}`,
      cookingTime: '20min',
      cookingPersons: 1,
      tags: ['Italian', 'Vegetarian'],
      yourIngredients: [{ name: 'Tomatoes', amount: '300 gram' }],
      extraIngredients: [{ name: 'Olive oil', amount: '1 tbsp' }],
      steps: [{ number: 1, title: 'Prepare', description: `Prepare dish ${index + 1}.`, chef: 'Chef 1' }],
      nutrition: { calories: '300 kcal', protein: '10g', fat: '12g', carbs: '30g' },
    })),
  };
}

const endpoint = '/api/n8n/generate-recipes';

describe('Recipe generation', () => {
  let service: RecipeService;
  let state: RecipeStateService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(RecipeService);
    state = TestBed.inject(RecipeStateService);
    http = TestBed.inject(HttpTestingController);
    state.ingredients.set([{ name: 'Tomatoes', amount: 300, unit: 'gram' }]);
    state.setPreferences({ cuisine: 'Italian', diet: 'Vegetarian' });
  });

  afterEach(() => {
    http.verify();
    vi.useRealTimers();
  });

  it('posts shared inputs and stores exactly three complete recipes with distinct detail routes', () => {
    service.generateRecipes().subscribe();
    expect(state.loading()).toBe(true);
    const request = http.expectOne(endpoint);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ ingredients: state.ingredients(), preferences: state.preferences() });
    request.flush(recipeResponse());
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
    expect(state.recipes()).toHaveLength(3);
    expect(service.resultsCards()).toHaveLength(3);
    for (const [index, recipe] of state.recipes().entries()) {
      expect(recipe.id).toBe(`generated-${index + 1}`);
      expect(service.getRecipeById(recipe.id)?.title).toBe(`Tomato recipe ${index + 1}`);
      expect(recipe.nutrition.calories).toBe('300 kcal');
      expect(recipe.steps[0].description).toBe(`Prepare dish ${index + 1}.`);
    }
    expect(service.getRecipeById('missing')).toBeUndefined();
    expect(service.getRecipeById('1')?.title).toBe('Pasta with spinach and cherry tomatoes');
  });

  it.each([0, 1, 2, 4])('rejects a response with %i recipes instead of displaying partial results', (count) => {
    const error = vi.fn();
    service.generateRecipes().subscribe({ error });
    http.expectOne(endpoint).flush({ recipes: Array.from({ length: count }, () => recipeResponse().recipes[0]) });
    expect(error).toHaveBeenCalledOnce();
    expect(state.error()).toContain('exactly 3');
    expect(service.resultsCards()).toEqual([]);
    expect(state.loading()).toBe(false);
  });

  it('rejects malformed recipe details', () => {
    const response = recipeResponse();
    response.recipes[1].steps = [];
    service.generateRecipes().subscribe({ error: () => {} });
    http.expectOne(endpoint).flush(response);
    expect(state.error()).toContain('incomplete');
    expect(state.recipes()).toEqual([]);
  });

  it('shows an error and retries with the same inputs after a server failure', () => {
    service.generateRecipes().subscribe({ error: () => {} });
    const first = http.expectOne(endpoint);
    first.flush('Unavailable', { status: 503, statusText: 'Service Unavailable' });
    expect(state.loading()).toBe(false);
    expect(state.error()).toContain('unavailable');
    service.generateRecipes().subscribe();
    const retry = http.expectOne(endpoint);
    expect(retry.request.body).toEqual(first.request.body);
    expect(state.error()).toBeNull();
    retry.flush(recipeResponse());
    expect(state.recipes()).toHaveLength(3);
  });

  it('clears loading when the request is cancelled', () => {
    const subscription = service.generateRecipes().subscribe();
    const request = http.expectOne(endpoint);
    subscription.unsubscribe();
    expect(request.cancelled).toBe(true);
    expect(state.loading()).toBe(false);
    expect(state.error()).toBeNull();
  });

  it('keeps waiting beyond a minute, then offers retry after the request deadline', () => {
    vi.useFakeTimers();
    service.generateRecipes().subscribe({ error: () => {} });
    const request = http.expectOne(endpoint);
    vi.advanceTimersByTime(60_001);
    expect(state.loading()).toBe(true);
    vi.advanceTimersByTime(120_000);
    expect(state.loading()).toBe(false);
    expect(state.error()).toContain('took too long');
    expect(request.cancelled).toBe(true);
  });

  it('does not reuse stale results or invent missing nutrition', () => {
    service.generateRecipes().subscribe();
    http.expectOne(endpoint).flush(recipeResponse());
    service.generateRecipes().subscribe();
    expect(state.recipes()).toEqual([]);
    const response = recipeResponse();
    http.expectOne(endpoint).flush({ recipes: response.recipes.map(({ nutrition, ...recipe }) => recipe) });
    expect(state.recipes()[0].nutrition.calories).toBe('—');
    expect(state.recipes()[0].likes).toBe(0);
  });
  it.each([0, -1, NaN, Infinity, null])('rejects an invalid ingredient amount (%s) before HTTP', (amount) => {
    state.ingredients.set([{ name: 'Tomatoes', amount: amount as number, unit: 'gram' }]);
    const error = vi.fn();
    service.generateRecipes().subscribe({ error });
    http.expectNone(endpoint);
    expect(error).toHaveBeenCalledOnce();
    expect(state.error()).toContain('positive amount');
    expect(state.loading()).toBe(false);
  });

  it('rejects empty ingredients and invalid preferences before HTTP', () => {
    state.ingredients.set([]);
    service.generateRecipes().subscribe({ error: () => {} });
    http.expectNone(endpoint);
    state.ingredients.set([{ name: 'Tomatoes', amount: 300, unit: 'gram' }]);
    state.setPreferences({ portions: 0, cookingPersons: 1.5 });
    service.generateRecipes().subscribe({ error: () => {} });
    http.expectNone(endpoint);
    expect(state.error()).toContain('preferences');
    expect(state.loading()).toBe(false);
  });

  it('keeps result tags and the request tied to the preferences used for generation', () => {
    state.setPreferences({ portions: 3, cookingPersons: 2, cookingTime: 'medium', cuisine: 'Japanese', diet: 'Vegan' });
    service.generateRecipes().subscribe();
    const request = http.expectOne(endpoint);
    state.setPreferences({ cuisine: 'German', diet: 'Keto' });
    expect(request.request.body.preferences).toEqual({ portions: 3, cookingPersons: 2, cookingTime: 'medium', cuisine: 'Japanese', diet: 'Vegan' });
    request.flush(recipeResponse());
    expect(service.resultTags()).toEqual(['Japanese', 'Medium', 'Vegan']);
    expect(state.preferences().cuisine).toBe('German');
  });

  it.each([null, 'not JSON', { output: [] }, { recipes: [null, {}, {}] }])('handles malformed JSON structures', (body) => {
    service.generateRecipes().subscribe({ error: () => {} });
    http.expectOne(endpoint).flush(body);
    expect(state.error()).toBeTruthy();
    expect(state.loading()).toBe(false);
    expect(state.recipes()).toEqual([]);
  });

  it('identifies a missing development proxy instead of suggesting a blind retry', () => {
    service.generateRecipes().subscribe({ error: () => {} });
    http.expectOne(endpoint).flush('<pre>Cannot POST /api/n8n/generate-recipes</pre>', {
      status: 404, statusText: 'Not Found',
    });
    expect(state.error()).toContain('restart the app server');
    expect(state.loading()).toBe(false);
    expect(state.recipes()).toEqual([]);
  });

  it('distinguishes an unregistered n8n webhook from an inactive development proxy', () => {
    service.generateRecipes().subscribe({ error: () => {} });
    http.expectOne(endpoint).flush({ code: 404, message: 'The requested webhook is not registered.' }, {
      status: 404, statusText: 'Not Found',
    });
    expect(state.error()).toContain('workflow');
    expect(state.error()).toContain('webhook address');
    expect(state.loading()).toBe(false);
  });

});
