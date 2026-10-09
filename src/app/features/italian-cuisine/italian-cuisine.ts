import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface RecipeItem {
  id: string;
  number: number;
  title: string;
  cookingTime: string;
  tags: string[];
  likes: number;
}

@Component({
  selector: 'app-italian-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './italian-cuisine.html',
  styleUrl: './italian-cuisine.scss',
})
export class ItalianCuisine {
  recipes: RecipeItem[] = [
    {
      id: '1',
      number: 1,
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 66,
    },
    {
      id: '2',
      number: 2,
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
      tags: ['Quick'],
      likes: 32,
    },
    {
      id: '3',
      number: 3,
      title: 'Funghi salami pizza',
      cookingTime: '16min',
      tags: ['Quick'],
      likes: 42,
    },
    {
      id: '1',
      number: 4,
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 66,
    },
    {
      id: '2',
      number: 5,
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
      tags: ['Quick'],
      likes: 32,
    },
    {
      id: '3',
      number: 6,
      title: 'Funghi salami pizza',
      cookingTime: '16min',
      tags: ['Quick'],
      likes: 42,
    },
    {
      id: '1',
      number: 7,
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 66,
    },
    {
      id: '2',
      number: 8,
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
      tags: ['Quick'],
      likes: 32,
    },
    {
      id: '3',
      number: 9,
      title: 'Funghi salami pizza',
      cookingTime: '16min',
      tags: ['Quick'],
      likes: 42,
    },
    {
      id: '1',
      number: 10,
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 66,
    },
    {
      id: '2',
      number: 11,
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
      tags: ['Quick'],
      likes: 32,
    },
    {
      id: '3',
      number: 12,
      title: 'Funghi salami pizza',
      cookingTime: '16min',
      tags: ['Quick'],
      likes: 42,
    },
    {
      id: '1',
      number: 13,
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 66,
    },
    {
      id: '2',
      number: 14,
      title: 'Creamy garlic shrimp pasta',
      cookingTime: '22min',
      tags: ['Quick'],
      likes: 32,
    },
    {
      id: '3',
      number: 15,
      title: 'Funghi salami pizza',
      cookingTime: '16min',
      tags: ['Quick'],
      likes: 42,
    },
  ];
}
