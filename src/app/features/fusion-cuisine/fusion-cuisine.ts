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
      id: '1',
      number: 1,
      title: 'Kimchi-Quesadillas',
      cookingTime: '20min',
      tags: ['Quick'],
      likes: 83,
    },
    {
      id: '2',
      number: 2,
      title: 'Teriyaki-Burger',
      cookingTime: '35min',
      tags: ['Medium'],
      likes: 89,
    },
    {
      id: '3',
      number: 3,
      title: 'Miso-Butter-Pasta',
      cookingTime: '20min',
      tags: ['Vegetarian', 'Quick'],
      likes: 77,
    },
    {
      id: '4',
      number: 4,
      title: 'Tandoori-Tacos',
      cookingTime: '40min',
      tags: ['Medium'],
      likes: 92,
    },
    {
      id: '5',
      number: 5,
      title: 'Sushi-Burrito',
      cookingTime: '35min',
      tags: ['Medium'],
      likes: 95,
    },
    {
      id: '6',
      number: 6,
      title: 'Gochujang-Spaghetti',
      cookingTime: '25min',
      tags: ['Medium'],
      likes: 74,
    },
    {
      id: '7',
      number: 7,
      title: 'Thai-Pesto-Nudeln',
      cookingTime: '25min',
      tags: ['Vegetarian', 'Medium'],
      likes: 81,
    },
    {
      id: '8',
      number: 8,
      title: 'Falafel-Bao-Buns',
      cookingTime: '60min',
      tags: ['Vegetarian', 'Complex'],
      likes: 88,
    },
    {
      id: '9',
      number: 9,
      title: 'Bulgogi-Pizza',
      cookingTime: '50min',
      tags: ['Complex'],
      likes: 96,
    },
    {
      id: '10',
      number: 10,
      title: 'Curry-Ramen',
      cookingTime: '40min',
      tags: ['Medium'],
      likes: 87,
    },
    {
      id: '11',
      number: 11,
      title: 'Mediterrane Bibimbap-Bowl',
      cookingTime: '40min',
      tags: ['Vegetarian', 'Medium'],
      likes: 82,
    },
    {
      id: '12',
      number: 12,
      title: 'Miso-Aubergine mit Couscous',
      cookingTime: '45min',
      tags: ['Vegetarian', 'Complex'],
      likes: 79,
    },
    {
      id: '13',
      number: 13,
      title: 'Butter-Chicken-Lasagne',
      cookingTime: '90min',
      tags: ['Complex'],
      likes: 94,
    },
    {
      id: '14',
      number: 14,
      title: 'Matcha-Tiramisu',
      cookingTime: '30min',
      tags: ['Vegetarian', 'Medium'],
      likes: 91,
    },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadGeneratedRecipes();
  }

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
      console.error('Fehler beim Laden der Fusion-Rezepte:', err);
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
