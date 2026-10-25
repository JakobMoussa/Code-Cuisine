import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeService, RecipeDetails } from '../../../core/services/recipe.service';

/**
 * Recipe detail component presenting complete instructions and ingredient lists for a single recipe.
 */
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipe?: RecipeDetails;
  chefs: number[] = [];
  isFavorite = false;
  showIngredients = true;
  showDirections = true;

  /**
   * Angular lifecycle hook. Subscribes to route parameter changes and loads the recipe.
   */
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (params) => {
      const id = params.get('id') || '1';
      const localRecipe = this.recipeService.getRecipeById(id);
      if (localRecipe) {
        this.applyRecipe(localRecipe);
      }
      // Fetch latest recipe data from Firestore to synchronize likes from other users
      const backendRecipe = await this.recipeService.fetchRecipeFromBackend(id);
      if (backendRecipe) {
        this.applyRecipe(backendRecipe);
      } else if (!localRecipe) {
        void this.router.navigate(['/generate'], { replaceUrl: true });
      }
    });
  }

  /**
   * Applies loaded recipe details to local view state.
   *
   * @param recipe - The recipe to display.
   */
  private applyRecipe(recipe: RecipeDetails): void {
    this.recipe = recipe;
    this.chefs = Array.from({ length: recipe.cookingPersons ?? 0 }, (_, index) => index + 1);
    this.isFavorite = this.recipeService.isRecipeLiked(recipe.id);
    this.showIngredients = true;
    this.showDirections = true;
    this.cdr.markForCheck();
  }

  /**
   * Toggles the favorite status of the active recipe and adjusts its like count.
   * Saves the updated like count to Firestore so other users can see it.
   */
  async toggleFavorite(): Promise<void> {
    if (!this.recipe) return;
    const previousState = this.isFavorite;
    const isNowFavorite = !previousState;
    this.isFavorite = isNowFavorite;

    // Optimistic UI update
    if (isNowFavorite) {
      this.recipe.likes++;
    } else {
      this.recipe.likes = Math.max(0, this.recipe.likes - 1);
    }
    this.cdr.markForCheck();

    try {
      const confirmedLikes = await this.recipeService.toggleLikeRecipe(this.recipe, isNowFavorite);
      if (typeof confirmedLikes === 'number') {
        this.recipe.likes = confirmedLikes;
        this.cdr.markForCheck();
      }
    } catch (err) {
      console.error('Failed to sync favorite status with backend:', err);
      // Rollback on failure
      this.isFavorite = previousState;
      if (previousState) {
        this.recipe.likes++;
      } else {
        this.recipe.likes = Math.max(0, this.recipe.likes - 1);
      }
      this.cdr.markForCheck();
    }
  }

  /**
   * Toggles the visibility of the ingredients accordion section.
   */
  toggleIngredients(): void {
    this.showIngredients = !this.showIngredients;
  }

  /**
   * Toggles the visibility of the cooking directions accordion section.
   */
  toggleDirections(): void {
    this.showDirections = !this.showDirections;
  }
}
