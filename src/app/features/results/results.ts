import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

interface RecipeResult {
  id: number;
  label: string;
  title: string;
  cookingTime: string;
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [Navbar, RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  readonly recipes: RecipeResult[] = [
    {
      id: 1,
      label: 'Recipe 1',
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
    },
    {
      id: 2,
      label: 'Recipe 2',
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
    },
    {
      id: 3,
      label: 'Recipe 3',
      title: 'Pasta alla Trapanese (Sicilian Tomato Pesto)',
      cookingTime: '20min',
    },
  ];
}
