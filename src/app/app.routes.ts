import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'generate',
    loadComponent: () =>
      import('./features/ingredients/ingredients').then((m) => m.Ingredients),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./features/preferences/preferences').then((m) => m.Preferences),
  },
  {
    path: 'cookbook',
    loadComponent: () =>
      import('./features/cookbook/cookbook').then((m) => m.Cookbook),
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./features/loading/loading').then((m) => m.Loading),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./features/results/results').then((m) => m.Results),
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./features/recipes/recipe-detail/recipe-detail').then(
        (m) => m.RecipeDetail
      ),
  },
  {
    path: 'cuisine/italian',
    loadComponent: () =>
      import('./features/italian-cuisine/italian-cuisine').then(
        (m) => m.ItalianCuisine
      ),
  },
  {
    path: 'italian-cuisine',
    loadComponent: () =>
      import('./features/italian-cuisine/italian-cuisine').then(
        (m) => m.ItalianCuisine
      ),
  },
  {
    path: 'cuisine/german',
    loadComponent: () =>
      import('./features/german-cuisine/german-cuisine').then(
        (m) => m.GermanCuisine
      ),
  },
  {
    path: 'german-cuisine',
    loadComponent: () =>
      import('./features/german-cuisine/german-cuisine').then(
        (m) => m.GermanCuisine
      ),
  },
  {
    path: 'cuisine/japanese',
    loadComponent: () =>
      import('./features/japanese-cuisine/japanese-cuisine').then(
        (m) => m.JapaneseCuisine
      ),
  },
  {
    path: 'japanese-cuisine',
    loadComponent: () =>
      import('./features/japanese-cuisine/japanese-cuisine').then(
        (m) => m.JapaneseCuisine
      ),
  },
  {
    path: 'cuisine/indian',
    loadComponent: () =>
      import('./features/indian-cuisine/indian-cuisine').then(
        (m) => m.IndianCuisine
      ),
  },
  {
    path: 'indian-cuisine',
    loadComponent: () =>
      import('./features/indian-cuisine/indian-cuisine').then(
        (m) => m.IndianCuisine
      ),
  },
  {
    path: 'cuisine/gourmet',
    loadComponent: () =>
      import('./features/gourmet-cuisine/gourmet-cuisine').then(
        (m) => m.GourmetCuisine
      ),
  },
  {
    path: 'gourmet-cuisine',
    loadComponent: () =>
      import('./features/gourmet-cuisine/gourmet-cuisine').then(
        (m) => m.GourmetCuisine
      ),
  },
  {
    path: 'cuisine/fusion',
    loadComponent: () =>
      import('./features/fusion-cuisine/fusion-cuisine').then(
        (m) => m.FusionCuisine
      ),
  },
  {
    path: 'fusion-cuisine',
    loadComponent: () =>
      import('./features/fusion-cuisine/fusion-cuisine').then(
        (m) => m.FusionCuisine
      ),
  },
];
