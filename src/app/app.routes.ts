import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home').then((m) => m.HomePageComponent),
  },
  {
    path: 'calculation',
    loadComponent: () =>
      import('./pages/calculation').then((m) => m.CalculationPageComponent),
  },
];
