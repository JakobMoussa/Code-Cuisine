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
 * Indian cuisine component displaying curated dishes and generated recipes with pagination.
 */
@Component({
  selector: 'app-indian-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './indian-cuisine.html',
  styleUrl: './indian-cuisine.scss',
})
export class IndianCuisine implements OnInit {
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
      title: 'Butter Chicken',
      cookingTime: '40min',
      tags: ['Classic'],
      likes: 95,
    },
    {
      id: '2',
      number: 2,
      title: 'Chicken Tikka Masala',
      cookingTime: '45min',
      tags: ['Classic'],
      likes: 92,
    },
    {
      id: '3',
      number: 3,
      title: 'Palak Paneer',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 78,
    },
    {
      id: '4',
      number: 4,
      title: 'Chana Masala',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 71,
    },
    {
      id: '5',
      number: 5,
      title: 'Biryani',
      cookingTime: '60min',
      tags: ['Traditional'],
      likes: 98,
    },
    {
      id: '6',
      number: 6,
      title: 'Dal Tadka',
      cookingTime: '25min',
      tags: ['Vegetarian', 'Quick'],
      likes: 69,
    },
    {
      id: '7',
      number: 7,
      title: 'Samosas',
      cookingTime: '45min',
      tags: ['Vegetarian'],
      likes: 83,
    },
    {
      id: '8',
      number: 8,
      title: 'Naan Bread with Garlic',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 88,
    },
    {
      id: '9',
      number: 9,
      title: 'Aloo Gobi',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 62,
    },
    {
      id: '10',
      number: 10,
      title: 'Rogan Josh',
      cookingTime: '75min',
      tags: ['Traditional'],
      likes: 76,
    },
    {
      id: '11',
      number: 11,
      title: 'Malai Kofta',
      cookingTime: '50min',
      tags: ['Vegetarian'],
      likes: 74,
    },
    {
      id: '12',
      number: 12,
      title: 'Vegetable Korma',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 67,
    },
    {
      id: '13',
      number: 13,
      title: 'Paneer Butter Masala',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 84,
    },
    {
      id: '14',
      number: 14,
      title: 'Chicken Vindaloo',
      cookingTime: '50min',
      tags: ['Spicy'],
      likes: 73,
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
      const list = await this.recipeService.getRecipesForCuisine('indian');
      this.generatedRecipes = list.map((recipe, index) => ({
        id: recipe.id,
        number: this.recipesPage1.length + index + 1,
        title: recipe.title,
        cookingTime: recipe.cookingTime,
        tags: recipe.tags.length ? recipe.tags : ['Generated'],
        likes: recipe.likes,
      }));
    } catch (err) {
      console.error('Error loading Indian recipes:', err);
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
