import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { Ingredients } from './ingredients/ingredients';
import { Preferences } from './preferences/preferences';
import { Loading } from './loading/loading';
import { Results } from './results/results';
import { RecipeDetail } from './recipes/recipe-detail/recipe-detail';
import { RecipeStateService } from '../core/services/recipe-state.service';
import { routes } from '../app.routes';

const endpoint = '/api/n8n/generate-recipes';
const response = {
  recipes: Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    title: `Generated dish ${index + 1}`,
    cookingTime: '15min',
    cookingPersons: 1,
    tags: ['Italian'],
    yourIngredients: [{ name: 'Tomatoes', amount: '300 gram' }],
    extraIngredients: [],
    steps: [{ number: 1, title: 'Cook', description: `Cook dish ${index + 1}.`, chef: 'Chef 1' }],
    nutrition: { calories: '300 kcal', protein: '10g', fat: '12g', carbs: '30g' },
  })),
};

describe('Recipe generation pages', () => {
  let harness: RouterTestingHarness;
  let http: HttpTestingController;
  let state: RecipeStateService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        provideRouter(routes),
      ],
    });
    harness = await RouterTestingHarness.create();
    http = TestBed.inject(HttpTestingController);
    state = TestBed.inject(RecipeStateService);
  });

  afterEach(() => http.verify());

  it('shares inputs, waits for n8n, renders three cards and opens each corresponding detail', async () => {
    const ingredients = await harness.navigateByUrl('/generate', Ingredients);
    ingredients.ingredientName.set('Tomatoes');
    ingredients.ingredientAmount.set(300);
    ingredients.addIngredient();
    const preferences = await harness.navigateByUrl('/preferences', Preferences);
    preferences.selectCuisine('Italian');
    preferences.selectDiet('Vegetarian');
    preferences.incrementPortions();
    expect(state.preferences().portions).toBe(3);
    const generate = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('#btn-generate-final-recipe')!;
    expect(generate.getAttribute('href')).toBe('/loading');
    generate.click();
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Loading);
    const loading = harness.routeDebugElement!.componentInstance as Loading;
    const request = http.expectOne(endpoint);
    expect(request.request.body).toEqual({
      ingredients: [{ name: 'Tomatoes', amount: 300, unit: 'gram' }],
      preferences: { portions: 3, cookingPersons: 1, cookingTime: 'quick', cuisine: 'Italian', diet: 'Vegetarian' },
    });
    expect(harness.routeNativeElement!.textContent).toContain('Generating');
    const frame = loading.currentFrame;
    await new Promise((resolve) => setTimeout(resolve, 80));
    expect(loading.currentFrame).not.toBe(frame);
    expect(harness.routeDebugElement!.componentInstance).toBe(loading);
    expect(state.loading()).toBe(true);
    const stop = vi.spyOn(loading, 'stopAnimation');
    request.flush(response);
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(stop).toHaveBeenCalled();
    expect(state.loading()).toBe(false);
    const cards = harness.routeNativeElement!.querySelectorAll('.results__card');
    expect(cards.length).toBe(3);
    cards.forEach((card, index) => {
      expect(card.textContent).toContain(`Generated dish ${index + 1}`);
      expect(card.textContent).toContain('15min');
    });
    const links = Array.from(harness.routeNativeElement!.querySelectorAll<HTMLAnchorElement>('.results__view-btn'));
    for (let index = 0; index < links.length; index++) {
      await harness.navigateByUrl('/results', Results);
      const link = harness.routeNativeElement!.querySelectorAll<HTMLAnchorElement>('.results__view-btn')[index];
      link.click();
      await harness.fixture.whenStable();
      harness.detectChanges();
      const detail = harness.routeDebugElement!.componentInstance as RecipeDetail;
      expect(detail.recipe?.title).toBe(`Generated dish ${index + 1}`);
      expect(harness.routeNativeElement!.textContent).toContain(`Cook dish ${index + 1}.`);
      expect(harness.routeNativeElement!.textContent).toContain('Tomatoes');
      expect(harness.routeNativeElement!.textContent).toContain('300 gram');
      expect(harness.routeNativeElement!.textContent).toContain('300 kcal');
      expect(harness.routeNativeElement!.querySelectorAll('.recipe-detail__person-row .recipe-detail__chef-pill')).toHaveLength(1);
    }
  });

  it('stops the animation on failure and retries from the existing error UI', async () => {
    state.ingredients.set([{ name: 'Tomatoes', amount: 300, unit: 'gram' }]);
    const loading = await harness.navigateByUrl('/loading', Loading);
    const stop = vi.spyOn(loading, 'stopAnimation');
    http.expectOne(endpoint).error(new ProgressEvent('error'));
    harness.detectChanges();
    expect(stop).toHaveBeenCalled();
    expect(harness.routeNativeElement!.querySelector('[role="alert"]')).toBeTruthy();
    harness.routeNativeElement!.querySelector<HTMLButtonElement>('.loading__retry-btn')!.click();
    expect(state.loading()).toBe(true);
    http.expectOne(endpoint).flush(response);
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Results);
  });

  it('cancels pending generation when leaving the loading page', async () => {
    state.ingredients.set([{ name: 'Tomatoes', amount: 300, unit: 'gram' }]);
    await harness.navigateByUrl('/loading', Loading);
    const request = http.expectOne(endpoint);
    await harness.navigateByUrl('/preferences', Preferences);
    expect(request.cancelled).toBe(true);
    expect(state.loading()).toBe(false);
    expect(state.ingredients()).toHaveLength(1);
  });

  it('redirects empty results and expired generated detail links to ingredient entry', async () => {
    await harness.navigateByUrl('/results');
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Ingredients);
    await harness.navigateByUrl('/recipe/generated-1');
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Ingredients);
    http.expectNone(endpoint);
  });
  it('updates reused detail routes and chef badges for each recipe', async () => {
    state.ingredients.set([{ name: 'Tofu', amount: 400, unit: 'gram' }]);
    await harness.navigateByUrl('/loading', Loading);
    const generated = structuredClone(response);
    generated.recipes[1].cookingPersons = 3;
    http.expectOne(endpoint).flush(generated);
    await harness.fixture.whenStable();
    await harness.navigateByUrl('/recipe/generated-1', RecipeDetail);
    const detail = await harness.navigateByUrl('/recipe/generated-2', RecipeDetail);
    expect(detail.recipe?.title).toBe('Generated dish 2');
    const badges = harness.routeNativeElement!.querySelectorAll('.recipe-detail__person-row .recipe-detail__chef-pill');
    expect(badges).toHaveLength(3);
    expect(badges[2].textContent).toContain('Chef 3');
  });

  it('renders invalid-response errors without navigating and prevents duplicate retry requests', async () => {
    state.ingredients.set([{ name: 'Tomatoes', amount: 300, unit: 'gram' }]);
    const loading = await harness.navigateByUrl('/loading', Loading);
    http.expectOne(endpoint).flush({ recipes: response.recipes.slice(0, 2) });
    harness.detectChanges();
    expect(harness.routeDebugElement!.componentInstance).toBe(loading);
    expect(harness.routeNativeElement!.textContent).toContain('exactly 3');
    loading.retryGeneration();
    loading.retryGeneration();
    http.expectOne(endpoint).flush(response);
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Results);
  });

  it('redirects a direct loading visit with no ingredients without calling the webhook', async () => {
    await harness.navigateByUrl('/loading');
    await harness.fixture.whenStable();
    expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Ingredients);
    http.expectNone(endpoint);
  });

  it('loops past a complete animation cycle while the API request is still pending', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
    try {
      state.ingredients.set([{ name: 'Rice', amount: 300, unit: 'gram' }]);
      const loading = await harness.navigateByUrl('/loading', Loading);
      const request = http.expectOne(endpoint);
      vi.advanceTimersByTime(11_000);
      expect(state.loading()).toBe(true);
      expect(harness.routeDebugElement!.componentInstance).toBe(loading);
      expect(loading.currentFrame).toBeGreaterThan(0);
      expect(loading.currentFrame).toBeLessThan(30);
      request.flush(response);
      await harness.fixture.whenStable();
      expect(harness.routeDebugElement!.componentInstance).toBeInstanceOf(Results);
    } finally {
      vi.useRealTimers();
    }
  });

});
