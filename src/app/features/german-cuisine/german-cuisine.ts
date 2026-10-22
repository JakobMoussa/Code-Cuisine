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
      id: '1',
      number: 1,
      title: 'Bratkartoffeln mit Spiegelei',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Quick'],
      likes: 48,
    },
    {
      id: '2',
      number: 2,
      title: 'Kartoffelpuffer mit Apfelmus',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 52,
    },
    {
      id: '3',
      number: 3,
      title: 'Käsespätzle',
      cookingTime: '35min',
      tags: ['Vegetarian', 'Quick'],
      likes: 74,
    },
    {
      id: '4',
      number: 4,
      title: 'Flammkuchen nach Elsässer Art',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 63,
    },
    {
      id: '5',
      number: 5,
      title: 'Currywurst mit Pommes',
      cookingTime: '40min',
      tags: ['Classic'],
      likes: 81,
    },
    {
      id: '6',
      number: 6,
      title: 'Bauernfrühstück',
      cookingTime: '30min',
      tags: ['Quick'],
      likes: 39,
    },
    {
      id: '7',
      number: 7,
      title: 'Linsensuppe mit Würstchen',
      cookingTime: '55min',
      tags: ['Hearty'],
      likes: 45,
    },
    {
      id: '8',
      number: 8,
      title: 'Kartoffelsuppe',
      cookingTime: '45min',
      tags: ['Vegetarian'],
      likes: 56,
    },
    {
      id: '9',
      number: 9,
      title: 'Frikadellen mit Kartoffelpüree',
      cookingTime: '50min',
      tags: ['Classic'],
      likes: 67,
    },
    {
      id: '10',
      number: 10,
      title: 'Schnitzel mit Kartoffelsalat',
      cookingTime: '60min',
      tags: ['Classic'],
      likes: 92,
    },
    {
      id: '11',
      number: 11,
      title: 'Königsberger Klopse',
      cookingTime: '60min',
      tags: ['Traditional'],
      likes: 41,
    },
    {
      id: '12',
      number: 12,
      title: 'Rinderrouladen mit Rotkohl',
      cookingTime: '150min',
      tags: ['Traditional'],
      likes: 88,
    },
    {
      id: '13',
      number: 13,
      title: 'Sauerbraten mit Kartoffelklößen',
      cookingTime: '180min',
      tags: ['Traditional'],
      likes: 79,
    },
    {
      id: '14',
      number: 14,
      title: 'Erbseneintopf',
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
