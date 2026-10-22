import { ChangeDetectorRef, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';

export interface RecipeItem {
  id: string;
  number: number;
  title: string;
  cookingTime: string;
  tags: string[];
  likes: number;
}

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
      id: '1',
      number: 1,
      title: 'Gebratene Jakobsmuscheln auf Erbsenpüree',
      cookingTime: '25min',
      tags: ['Seafood', 'Medium'],
      likes: 88,
    },
    {
      id: '2',
      number: 2,
      title: 'Burrata mit geschmorten Kirschtomaten',
      cookingTime: '25min',
      tags: ['Vegetarian', 'Medium'],
      likes: 91,
    },
    {
      id: '3',
      number: 3,
      title: 'Rote-Bete-Carpaccio mit Ziegenkäse',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Medium'],
      likes: 76,
    },
    {
      id: '4',
      number: 4,
      title: 'Safranrisotto mit Parmesan',
      cookingTime: '40min',
      tags: ['Vegetarian', 'Medium'],
      likes: 85,
    },
    {
      id: '5',
      number: 5,
      title: 'Lachsfilet auf Zitronen-Beurre-blanc',
      cookingTime: '40min',
      tags: ['Seafood', 'Medium'],
      likes: 89,
    },
    {
      id: '6',
      number: 6,
      title: 'Trüffel-Tagliatelle',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Medium'],
      likes: 97,
    },
    {
      id: '7',
      number: 7,
      title: 'Entenbrust mit Orangenjus',
      cookingTime: '50min',
      tags: ['Complex'],
      likes: 84,
    },
    {
      id: '8',
      number: 8,
      title: 'Steinpilzrisotto',
      cookingTime: '45min',
      tags: ['Vegetarian', 'Medium'],
      likes: 82,
    },
    {
      id: '9',
      number: 9,
      title: 'Rinderfilet mit Rotwein-Schalotten-Sauce',
      cookingTime: '55min',
      tags: ['Complex'],
      likes: 94,
    },
    {
      id: '10',
      number: 10,
      title: 'Kabeljau auf Selleriepüree',
      cookingTime: '45min',
      tags: ['Seafood'],
      likes: 79,
    },
    {
      id: '11',
      number: 11,
      title: 'Geschmorte Kalbsbäckchen mit Kartoffelpüree',
      cookingTime: '180min',
      tags: ['Traditional'],
      likes: 90,
    },
    {
      id: '12',
      number: 12,
      title: 'Sous-vide-Rinderfilet mit Kräuterkruste',
      cookingTime: '120min',
      tags: ['Complex'],
      likes: 93,
    },
    {
      id: '13',
      number: 13,
      title: 'Hummer-Bisque',
      cookingTime: '100min',
      tags: ['Seafood', 'Complex'],
      likes: 87,
    },
    {
      id: '14',
      number: 14,
      title: 'Beef Wellington',
      cookingTime: '150min',
      tags: ['Classic', 'Complex'],
      likes: 99,
    },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadGeneratedRecipes();
  }

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
      console.error('Fehler beim Laden der Gourmet-Rezepte:', err);
    } finally {
      this.isLoadingPage2.set(false);
      this.cdr.markForCheck();
    }
  }

  setPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
