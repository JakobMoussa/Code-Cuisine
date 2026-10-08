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
];
