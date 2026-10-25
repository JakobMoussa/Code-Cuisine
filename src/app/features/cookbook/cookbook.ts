import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';

/**
 * Represents a saved or favorite recipe displayed in the cookbook.
 */
export interface Recipe {
  id: string;
  title: string;
  cookingTime: string;
  likes: number;
}

/**
 * Represents an international cuisine category item.
 */
export interface Cuisine {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

/**
 * Cookbook component for browsing favorited recipes and cuisine categories.
 */
@Component({
  selector: 'app-cookbook',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cockbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly mostLikedRecipes = signal<Recipe[]>([
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
      title: 'Funghi salami pizza',
      cookingTime: '16min',
      likes: 42,
    },
    {
      id: '4',
      title: 'Gourmet Truffle Mushroom Risotto',
      cookingTime: '30min',
      likes: 89,
    },
  ]);

  /**
   * Initializes the component and loads top liked recipes from Firestore.
   */
  async ngOnInit(): Promise<void> {
    try {
      const topRecipes = await this.recipeService.getMostLikedRecipes(6);
      if (topRecipes && topRecipes.length > 0) {
        this.mostLikedRecipes.set(
          topRecipes.map((r) => ({
            id: r.id,
            title: r.title,
            cookingTime: r.cookingTime,
            likes: r.likes ?? 0,
          }))
        );
        this.cdr.markForCheck();
      }
    } catch (err) {
      console.warn('Could not load top liked recipes from Firestore:', err);
    }
  }

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
