import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeService, RecipeDetails } from '../../../core/services/recipe.service';

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
  showIngredients = false;
  showDirections = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id') || '1';
      this.recipe = this.recipeService.getRecipeById(id);
      this.chefs = Array.from({ length: this.recipe?.cookingPersons ?? 0 }, (_, index) => index + 1);
      this.isFavorite = this.recipe ? this.recipeService.isRecipeLiked(this.recipe.id) : false;
      this.showIngredients = false;
      this.showDirections = false;
      this.cdr.markForCheck();
      if (!this.recipe) void this.router.navigate(['/generate'], { replaceUrl: true });
    });
  }

  toggleFavorite(): void {
    if (!this.recipe) return;
    if (this.isFavorite) {
      this.recipe.likes = Math.max(0, this.recipe.likes - 1);
    } else {
      this.recipe.likes++;
    }
    this.isFavorite = this.recipeService.toggleLikeRecipe(this.recipe);
    this.cdr.markForCheck();
  }

  toggleIngredients(): void {
    this.showIngredients = !this.showIngredients;
  }

  toggleDirections(): void {
    this.showDirections = !this.showDirections;
  }
}
