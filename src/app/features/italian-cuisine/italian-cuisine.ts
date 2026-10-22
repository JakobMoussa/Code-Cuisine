import { ChangeDetectorRef, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';

/**
 * Represents a recipe item in the cuisine listing.
 */
export interface RecipeItem {
  id: string;
  number: number;
  title: string;
  cookingTime: string;
  tags: string[];
  likes: number;
}

/**
 * Italian cuisine component displaying curated dishes and generated recipes with pagination.
 */
@Component({
  selector: 'app-italian-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './italian-cuisine.html',
  styleUrl: './italian-cuisine.scss',
})
export class ItalianCuisine implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly currentPage = signal<number>(1);
  readonly isLoadingPage2 = signal<boolean>(false);

  generatedRecipes: RecipeItem[] = [];

  readonly displayedRecipes = computed(() => {
    return this.currentPage() === 1 ? this.recipesPage1 : this.generatedRecipes;
  });

  recipesPage1: RecipeItem[] = [
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

  /**
   * Initializes the component and triggers loading of generated recipes.
   */
  async ngOnInit(): Promise<void> {
    await this.loadGeneratedRecipes();
  }

  /**
   * Fetches generated recipes from Firestore for this cuisine.
   */
  async loadGeneratedRecipes(): Promise<void> {
    this.isLoadingPage2.set(true);
    try {
      const list = await this.recipeService.getRecipesForCuisine('italian');
      this.generatedRecipes = list.map((recipe, index) => ({
        id: recipe.id,
        number: this.recipesPage1.length + index + 1,
        title: recipe.title,
        cookingTime: recipe.cookingTime,
        tags: recipe.tags.length ? recipe.tags : ['Generated'],
        likes: recipe.likes,
      }));
    } catch (err) {
      console.error('Error loading Italian recipes:', err);
    } finally {
      this.isLoadingPage2.set(false);
      this.cdr.markForCheck();
    }
  }

  /**
   * Switches the active pagination page.
   *
   * @param page - Target page index.
   */
  setPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
