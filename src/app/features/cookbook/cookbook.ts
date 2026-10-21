import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeStateService } from '../../core/services/recipe-state.service';

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
  private readonly state = inject(RecipeStateService);

  readonly mostLikedRecipes = this.state.likedRecipes;

  cuisines: Cuisine[] = [
    {
      id: 'italian',
      name: 'Italian cuisine',
      emoji: '🤌',
      image: 'assets/1.recipe.png',
    },
    {
      id: 'german',
      name: 'German cuisine',
      emoji: '🥨',
      image: 'assets/2.recipe.png',
    },
    {
      id: 'japanese',
      name: 'Japanese cuisine',
      emoji: '🥢',
      image: 'assets/3.recipe.png',
    },
    {
      id: 'gourmet',
      name: 'Gourmet cuisine',
      emoji: '🍷',
      image: 'assets/4.recipe.png',
    },
    {
      id: 'indian',
      name: 'Indian cuisine',
      emoji: '🍱',
      image: 'assets/5.recipe.png',
    },
    {
      id: 'fusion',
      name: 'Fusion cuisine',
      emoji: '🍱',
      image: 'assets/6.recipe.png',
    },
  ];
}
