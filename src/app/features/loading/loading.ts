import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
    selector: 'app-loading',
    imports: [Navbar],
    templateUrl: './loading.html',
    styleUrl: './loading.scss',
})
export class Loading implements OnInit, OnDestroy {

    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);

    currentFrame = 0;
    totalFrames = 316;
    fps = 30;

    private intervalId?: ReturnType<typeof setInterval>;

    public get currentImage(): string {
        const frameNumber = String(this.currentFrame).padStart(5, '0');

        return `/assets/loading_animations/Code_Cuisine_${frameNumber}.png`;
    }

    ngOnInit(): void {
        this.startAnimation();
    }

    startAnimation(): void {
        this.intervalId = setInterval(() => {
            if (this.currentFrame < this.totalFrames - 1) {
                this.currentFrame++;
            } else {
                this.stopAnimation();
                this.router.navigate(['/results']);
            }
            this.cdr.markForCheck();
        }, 1000 / this.fps);
    }

    stopAnimation(): void {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    ngOnDestroy(): void {
        this.stopAnimation();
    }
}


