import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';
import { RecipeService, RecipeDetails } from '../../../core/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [Navbar, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipe?: RecipeDetails;
  isFavorite = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '1';
      this.recipe = this.recipeService.getRecipeById(id);
    });
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (this.recipe) {
      if (this.isFavorite) {
        this.recipe.likes++;
      } else {
        this.recipe.likes--;
      }
    }
  }
}
