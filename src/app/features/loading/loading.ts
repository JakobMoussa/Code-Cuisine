import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Navbar } from '../../shared/navbar/navbar';
import { RecipeService, Ingredient } from '../../core/services/recipe.service';

@Component({
  selector: 'app-loading',
  imports: [Navbar, RouterLink],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  readonly errorMessage = this.recipeService.errorMessage;
  readonly showInsufficientPopup = signal(false);

  currentFrame = 0;
  totalFrames = 316;
  fps = 30;

  private intervalId?: ReturnType<typeof setInterval>;
  private generationSub?: Subscription;

  public get currentImage(): string {
    const frameNumber = String(this.currentFrame).padStart(5, '0');
    return `assets/loading_animations/Code_Cuisine_${frameNumber}.png`;
  }

  ngOnInit(): void {
    if (!this.recipeService.ingredients().length) {
      void this.router.navigate(['/generate'], { replaceUrl: true });
      return;
    }

    if (!this.hasEnoughIngredients()) {
      this.showInsufficientPopup.set(true);
      return;
    }

    this.startGeneration();
  }

  private hasMinimumIngredientCount(count: number, portions: number): boolean {
    if (portions >= 6 && count < 3) return false;
    if (portions >= 4 && count < 2) return false;
    return count > 0;
  }

  private getIngredientWeight(item: Ingredient): number {
    const amount = Number(item.amount) || 0;
    const unit = (item.unit || '').toLowerCase().trim();
    return unit === 'piece' ? amount * 80 : amount;
  }

  private hasSufficientWeight(ingredients: Ingredient[], portions: number): boolean {
    const totalWeight = ingredients.reduce((sum, item) => sum + this.getIngredientWeight(item), 0);
    return portions < 1 || (totalWeight / portions) >= 65;
  }

  private hasSufficientPieces(ingredients: Ingredient[], portions: number): boolean {
    const isPiece = (item: Ingredient) => (item.unit || '').toLowerCase().trim() === 'piece';
    if (!ingredients.every(isPiece)) return true;
    const totalPieces = ingredients.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    return portions < 3 || totalPieces >= Math.ceil(portions / 2);
  }

  hasEnoughIngredients(): boolean {
    const ingredients = this.recipeService.ingredients();
    const portions = this.recipeService.preferences().portions;
    return (
      this.hasMinimumIngredientCount(ingredients.length, portions) &&
      this.hasSufficientWeight(ingredients, portions) &&
      this.hasSufficientPieces(ingredients, portions)
    );
  }

  closePopup(): void {
    this.showInsufficientPopup.set(false);
    void this.router.navigate(['/preferences']);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showInsufficientPopup()) {
      this.closePopup();
    }
  }

  startAnimation(): void {
    this.stopAnimation();
    this.intervalId = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.cdr.markForCheck();
    }, 1000 / this.fps);
  }

  stopAnimation(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  startGeneration(): void {
    this.generationSub?.unsubscribe();
    this.startAnimation();
    this.generationSub = this.recipeService.generateRecipes().subscribe({
      next: () => {
        this.stopAnimation();
        void this.router.navigate(['/results'], { replaceUrl: true });
      },
      error: () => this.stopAnimation(),
    });
  }

  retryGeneration(): void {
    if (!this.recipeService.isLoading()) this.startGeneration();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    this.generationSub?.unsubscribe();
  }
}
