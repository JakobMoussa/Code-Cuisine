import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeService, RecipeResult } from '../../core/services/recipe.service';

export type { RecipeResult };

/**
 * Results page component presenting generated recipe summary cards.
 */
@Component({
  selector: 'app-results',
  imports: [Navbar, RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results implements OnInit {
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  readonly recipes = this.recipeService.resultsCards;
  readonly tags = this.recipeService.resultTags;

  /**
   * Angular lifecycle hook. Redirects to ingredient entry if no generated recipes exist.
   */
  ngOnInit(): void {
    if (!this.recipes().length) {
      void this.router.navigate(['/generate'], { replaceUrl: true });
    }
  }
}
