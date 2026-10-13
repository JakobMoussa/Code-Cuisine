import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
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
    this.startGeneration();
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
