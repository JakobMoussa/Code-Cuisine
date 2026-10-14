import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Loading } from './loading';
import { RecipeStateService } from '../../core/services/recipe-state.service';
import { routes } from '../../app.routes';

describe('Loading Component Insufficient Ingredients Pop-up', () => {
  let harness: RouterTestingHarness;
  let http: HttpTestingController;
  let state: RecipeStateService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    });
    harness = await RouterTestingHarness.create();
    http = TestBed.inject(HttpTestingController);
    state = TestBed.inject(RecipeStateService);
  });

  afterEach(() => http.verify());

  it('displays the insufficient ingredients pop-up when quantities do not meet servings criteria', async () => {
    state.ingredients.set([
      { name: 'Pasta', amount: 100, unit: 'gram' },
    ]);
    state.setPreferences({ portions: 5 });

    const loading = await harness.navigateByUrl('/loading', Loading);
    harness.detectChanges();

    expect(loading.showInsufficientPopup()).toBe(true);
    http.expectNone('/api/n8n/generate-recipes');

    const popup = harness.routeNativeElement!.querySelector('#insufficient-ingredients-popup');
    expect(popup).not.toBeNull();
    expect(popup!.textContent).toContain('Ups! Not quite enough...');
    expect(popup!.textContent).toContain("It looks like some ingredient quantities aren't sufficient for your selected servings.");

    const link = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('#btn-back-to-ingredients-popup')!;
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('/generate');
  });

  it('displays the pop-up when too few ingredients are entered for 4 or more portions', async () => {
    // Only 1 ingredient for 4 portions
    state.ingredients.set([
      { name: 'Rice', amount: 500, unit: 'gram' },
    ]);
    state.setPreferences({ portions: 4 });

    const loading = await harness.navigateByUrl('/loading', Loading);
    harness.detectChanges();

    expect(loading.showInsufficientPopup()).toBe(true);
    http.expectNone('/api/n8n/generate-recipes');
  });

  it('starts generation when ingredient quantities and variety are sufficient', async () => {
    state.ingredients.set([
      { name: 'Pasta', amount: 400, unit: 'gram' },
      { name: 'Tomatoes', amount: 200, unit: 'gram' },
    ]);
    state.setPreferences({ portions: 4 });

    const loading = await harness.navigateByUrl('/loading', Loading);
    harness.detectChanges();

    expect(loading.showInsufficientPopup()).toBe(false);
    expect(harness.routeNativeElement!.querySelector('#insufficient-ingredients-popup')).toBeNull();

    const request = http.expectOne('/api/n8n/generate-recipes');
    expect(request).toBeTruthy();
  });
});
