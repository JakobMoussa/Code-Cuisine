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
 * Gourmet cuisine component displaying curated fine dining dishes and generated recipes with pagination.
 */
@Component({
  selector: 'app-gourmet-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gourmet-cuisine.html',
  styleUrl: './gourmet-cuisine.scss',
})
export class GourmetCuisine implements OnInit {
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
      id: 'gourmet-1',
      number: 1,
      title: 'Pan-Seared Sea Scallops on Pea Puree',
      cookingTime: '25min',
      tags: ['Seafood', 'Medium'],
      likes: 88,
    },
    {
      id: 'gourmet-2',
      number: 2,
      title: 'Burrata with Roasted Tomatoes',
      cookingTime: '25min',
      tags: ['Vegetarian', 'Medium'],
      likes: 91,
    },
    {
      id: 'gourmet-3',
      number: 3,
      title: 'Beet Carpaccio with Warm Goat Cheese',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Medium'],
      likes: 76,
    },
    {
      id: 'gourmet-4',
      number: 4,
      title: 'Saffron Risotto with Aged Parmesan',
      cookingTime: '40min',
      tags: ['Vegetarian', 'Medium'],
      likes: 85,
    },
    {
      id: 'gourmet-5',
      number: 5,
      title: 'Salmon Fillet with Lemon Beurre Blanc',
      cookingTime: '40min',
      tags: ['Seafood', 'Medium'],
      likes: 89,
    },
    {
      id: 'gourmet-6',
      number: 6,
      title: 'Truffle Tagliatelle',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Medium'],
      likes: 97,
    },
    {
      id: 'gourmet-7',
      number: 7,
      title: 'Crispy Duck Breast with Orange Jus',
      cookingTime: '50min',
      tags: ['Complex'],
      likes: 84,
    },
    {
      id: 'gourmet-8',
      number: 8,
      title: 'Wild Porcini Mushroom Risotto',
      cookingTime: '45min',
      tags: ['Vegetarian', 'Medium'],
      likes: 82,
    },
    {
      id: 'gourmet-9',
      number: 9,
      title: 'Filet Mignon with Red Wine Reduction',
      cookingTime: '55min',
      tags: ['Complex'],
      likes: 94,
    },
    {
      id: 'gourmet-10',
      number: 10,
      title: 'Pan-Roasted Cod on Celery Root Puree',
      cookingTime: '45min',
      tags: ['Seafood'],
      likes: 79,
    },
    {
      id: 'gourmet-11',
      number: 11,
      title: 'Braised Veal Cheeks with Truffled Puree',
      cookingTime: '180min',
      tags: ['Traditional'],
      likes: 90,
    },
    {
      id: 'gourmet-12',
      number: 12,
      title: 'Herb-Crusted Beef Tenderloin',
      cookingTime: '120min',
      tags: ['Complex'],
      likes: 93,
    },
    {
      id: 'gourmet-13',
      number: 13,
      title: 'Rich Lobster Bisque',
      cookingTime: '100min',
      tags: ['Seafood', 'Complex'],
      likes: 87,
    },
    {
      id: 'gourmet-14',
      number: 14,
      title: 'Classic Beef Wellington',
      cookingTime: '150min',
      tags: ['Classic', 'Complex'],
      likes: 99,
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
      const list = await this.recipeService.getRecipesForCuisine('gourmet');
      this.generatedRecipes = list.map((recipe, index) => ({
        id: recipe.id,
        number: this.recipesPage1.length + index + 1,
        title: recipe.title,
        cookingTime: recipe.cookingTime,
        tags: recipe.tags.length ? recipe.tags : ['Generated'],
        likes: recipe.likes,
      }));
    } catch (err) {
      console.error('Error loading Gourmet recipes:', err);
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
