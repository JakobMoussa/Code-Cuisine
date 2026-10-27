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
 * Fusion cuisine component displaying curated dishes and generated recipes with pagination.
 */
@Component({
  selector: 'app-fusion-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fusion-cuisine.html',
  styleUrl: './fusion-cuisine.scss',
})
export class FusionCuisine implements OnInit {
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
      id: 'fusion-1',
      number: 1,
      title: 'Crispy Kimchi Quesadillas',
      cookingTime: '20min',
      tags: ['Quick'],
      likes: 83,
    },
    {
      id: 'fusion-2',
      number: 2,
      title: 'Teriyaki Beef Burger',
      cookingTime: '35min',
      tags: ['Medium'],
      likes: 89,
    },
    {
      id: 'fusion-3',
      number: 3,
      title: 'Miso Butter Spaghetti',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 77,
    },
    {
      id: 'fusion-4',
      number: 4,
      title: 'Tandoori Chicken Tacos',
      cookingTime: '40min',
      tags: ['Medium'],
      likes: 92,
    },
    {
      id: 'fusion-5',
      number: 5,
      title: 'Sushi Burrito',
      cookingTime: '35min',
      tags: ['Medium'],
      likes: 95,
    },
    {
      id: 'fusion-6',
      number: 6,
      title: 'Gochujang Spaghetti',
      cookingTime: '25min',
      tags: ['Medium'],
      likes: 74,
    },
    {
      id: 'fusion-7',
      number: 7,
      title: 'Thai Coconut Pesto Noodles',
      cookingTime: '25min',
      tags: ['Vegetarian', 'Medium'],
      likes: 81,
    },
    {
      id: 'fusion-8',
      number: 8,
      title: 'Falafel Steamed Bao Buns',
      cookingTime: '60min',
      tags: ['Vegetarian', 'Complex'],
      likes: 88,
    },
    {
      id: 'fusion-9',
      number: 9,
      title: 'Bulgogi Beef Pizza',
      cookingTime: '50min',
      tags: ['Complex'],
      likes: 96,
    },
    {
      id: 'fusion-10',
      number: 10,
      title: 'Curry Ramen',
      cookingTime: '40min',
      tags: ['Medium'],
      likes: 87,
    },
    {
      id: 'fusion-11',
      number: 11,
      title: 'Mediterranean Bibimbap Bowl',
      cookingTime: '40min',
      tags: ['Vegetarian', 'Medium'],
      likes: 82,
    },
    {
      id: 'fusion-12',
      number: 12,
      title: 'Miso-Glazed Eggplant with Couscous',
      cookingTime: '45min',
      tags: ['Vegetarian', 'Complex'],
      likes: 79,
    },
    {
      id: 'fusion-13',
      number: 13,
      title: 'Butter Chicken Lasagna',
      cookingTime: '90min',
      tags: ['Complex'],
      likes: 94,
    },
    {
      id: 'fusion-14',
      number: 14,
      title: 'Matcha Tiramisu',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Medium'],
      likes: 91,
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
      const list = await this.recipeService.getRecipesForCuisine('fusion');
      this.generatedRecipes = list.map((recipe, index) => ({
        id: recipe.id,
        number: this.recipesPage1.length + index + 1,
        title: recipe.title,
        cookingTime: recipe.cookingTime,
        tags: recipe.tags.length ? recipe.tags : ['Generated'],
        likes: recipe.likes,
      }));
    } catch (err) {
      console.error('Error loading Fusion recipes:', err);
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
