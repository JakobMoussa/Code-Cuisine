import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Recipe {
  id: string;
  title: string;
  cookingTime: string;
  likes: number;
}

export interface Cuisine {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

@Component({
  selector: 'app-cookbook',
  imports: [RouterLink],
  templateUrl: './cockbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook {
  mostLikedRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Pasta with spinach and cherry tomatoes',
      cookingTime: '20min',
      likes: 66,
    },
    {
      id: '2',
      title: 'Low Carb Vegan No-Bake Paleo Bars',
      cookingTime: '35min',
      likes: 57,
    },
    {
      id: '3',
      title: 'Schnitzel with Warm Potato Salad',
      cookingTime: '45min',
      likes: 42,
    },
    {
      id: '4',
      title: 'Gourmet Truffle Mushroom Risotto',
      cookingTime: '30min',
      likes: 89,
    },
  ];

  cuisines: Cuisine[] = [
    {
      id: 'italian',
      name: 'Italian cuisine',
      emoji: '🤌',
      image: '/assets/1.recipe.png',
    },
    {
      id: 'german',
      name: 'German cuisine',
      emoji: '🥨',
      image: '/assets/2.recipe.png',
    },
    {
      id: 'japanese',
      name: 'Japanese cuisine',
      emoji: '🥢',
      image: '/assets/3.recipe.png',
    },
    {
      id: 'gourmet',
      name: 'Gourmet cuisine',
      emoji: '🍷',
      image: '/assets/4.recipe.png',
    },
    {
      id: 'Indian',
      name: 'Indian cuisine',
      emoji: '🍱',
      image: '/assets/5.recipe.png',
    },
    {
      id: 'fusion',
      name: 'Fusion cuisine',
      emoji: '🍱',
      image: '/assets/6.recipe.png',
    },
  ];
}
