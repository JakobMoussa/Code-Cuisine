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
import { RecipeService } from '../../core/services/recipe.service';

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
    return `/assets/loading_animations/Code_Cuisine_${frameNumber}.png`;
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

  hasEnoughIngredients(): boolean {
    const ingredients = this.recipeService.ingredients();
    const portions = this.recipeService.preferences().portions;

    if (!ingredients.length) return false;

    if (portions >= 4 && ingredients.length < 2) {
      return false;
    }
    if (portions >= 6 && ingredients.length < 3) {
      return false;
    }

    const totalWeight = ingredients.reduce((sum, item) => {
      const amount = Number(item.amount) || 0;
      const unit = (item.unit || '').toLowerCase().trim();
      if (unit === 'gram' || unit === 'g') return sum + amount;
      if (unit === 'ml') return sum + amount;
      if (unit === 'piece') return sum + amount * 80;
      return sum + amount;
    }, 0);

    const minWeightPerPortion = 65;
    if (portions >= 1 && totalWeight / portions < minWeightPerPortion) {
      return false;
    }

    const onlyPieces = ingredients.every((item) => (item.unit || '').toLowerCase().trim() === 'piece');
    const totalPieces = ingredients.reduce((sum, item) => {
      return (item.unit || '').toLowerCase().trim() === 'piece' ? sum + (Number(item.amount) || 0) : sum;
    }, 0);
    if (onlyPieces && totalPieces < Math.ceil(portions / 2) && portions >= 3) {
      return false;
    }

    return true;
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
