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
 * German cuisine component displaying curated dishes and generated recipes with pagination.
 */
@Component({
  selector: 'app-german-cuisine',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './german-cuisine.html',
  styleUrl: './german-cuisine.scss',
})
export class GermanCuisine implements OnInit {
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
      id: 'german-1',
      number: 1,
      title: 'Crispy Pan-Fried Potatoes with Fried Egg',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 48,
    },
    {
      id: 'german-2',
      number: 2,
      title: 'Crispy Potato Pancakes with Applesauce',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 52,
    },
    {
      id: 'german-3',
      number: 3,
      title: 'Cheese Noodles with Caramelized Onions',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 74,
    },
    {
      id: 'german-4',
      number: 4,
      title: 'Crispy Flatbread with Bacon and Onions',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 63,
    },
    {
      id: 'german-5',
      number: 5,
      title: 'Curry Sausage with Crispy French Fries',
      cookingTime: '40min',
      tags: ['Classic'],
      likes: 81,
    },
    {
      id: 'german-6',
      number: 6,
      title: 'Farmer’s Skillet with Potatoes, Bacon and Eggs',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 39,
    },
    {
      id: 'german-7',
      number: 7,
      title: 'Hearty Lentil Soup with Smoked Sausages',
      cookingTime: '55min',
      tags: ['Hearty'],
      likes: 45,
    },
    {
      id: 'german-8',
      number: 8,
      title: 'Creamy Potato Soup with Fresh Herbs',
      cookingTime: '45min',
      tags: ['Vegetarian'],
      likes: 56,
    },
    {
      id: 'german-9',
      number: 9,
      title: 'Pan-Fried Meatballs with Mashed Potatoes',
      cookingTime: '50min',
      tags: ['Classic'],
      likes: 67,
    },
    {
      id: 'german-10',
      number: 10,
      title: 'Crispy Breaded Pork Cutlet with Potato Salad',
      cookingTime: '60min',
      tags: ['Classic'],
      likes: 92,
    },
    {
      id: 'german-11',
      number: 11,
      title: 'Meatballs in Creamy Caper Sauce',
      cookingTime: '60min',
      tags: ['Traditional'],
      likes: 41,
    },
    {
      id: 'german-12',
      number: 12,
      title: 'Braised Stuffed Beef Rolls with Red Cabbage',
      cookingTime: '150min',
      tags: ['Traditional'],
      likes: 88,
    },
    {
      id: 'german-13',
      number: 13,
      title: 'Marinated Roast Beef with Potato Dumplings',
      cookingTime: '180min',
      tags: ['Traditional'],
      likes: 79,
    },
    {
      id: 'german-14',
      number: 14,
      title: 'Hearty Split Pea Soup with Smoked Sausage',
      cookingTime: '90min',
      tags: ['Hearty'],
      likes: 50,
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
      const list = await this.recipeService.getRecipesForCuisine('german');
      this.generatedRecipes = list.map((recipe, index) => ({
        id: recipe.id,
        number: this.recipesPage1.length + index + 1,
        title: recipe.title,
        cookingTime: recipe.cookingTime,
        tags: recipe.tags.length ? recipe.tags : ['Generated'],
        likes: recipe.likes,
      }));
    } catch (err) {
      console.error('Error loading German recipes:', err);
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
