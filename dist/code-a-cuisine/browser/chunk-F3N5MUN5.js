import {
  Navbar
} from "./chunk-VIDJBO73.js";
import {
  RecipeService
} from "./chunk-YUTAVKYH.js";
import "./chunk-RZNXE2LB.js";
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Router,
  RouterLink,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-APPJTXDK.js";

// src/app/features/loading/loading.ts
function Loading_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10)(4, "button", 11);
    \u0275\u0275listener("click", function Loading_Conditional_6_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retryGeneration());
    });
    \u0275\u0275text(5, " Retry ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 12);
    \u0275\u0275text(7, " Back to preferences ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function Loading_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "Generating ...");
    \u0275\u0275elementEnd();
  }
}
function Loading_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275listener("click", function Loading_Conditional_8_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePopup());
    });
    \u0275\u0275elementStart(1, "div", 14);
    \u0275\u0275listener("click", function Loading_Conditional_8_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function Loading_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePopup());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 16);
    \u0275\u0275element(4, "line", 17)(5, "line", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h2", 19);
    \u0275\u0275text(7, "Ups! Not quite enough...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 20);
    \u0275\u0275text(9, " It looks like some ingredient quantities aren't sufficient for your selected servings. Please add or adjust quantities and try again. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 21)(11, "span");
    \u0275\u0275text(12, "Go back to ingredients");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 22);
    \u0275\u0275text(14, "\u2192");
    \u0275\u0275elementEnd()()()();
  }
}
var Loading = class _Loading {
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  recipeService = inject(RecipeService);
  errorMessage = this.recipeService.errorMessage;
  showInsufficientPopup = signal(false, ...ngDevMode ? [{ debugName: "showInsufficientPopup" }] : (
    /* istanbul ignore next */
    []
  ));
  currentFrame = 0;
  totalFrames = 316;
  fps = 30;
  intervalId;
  generationSub;
  get currentImage() {
    const frameNumber = String(this.currentFrame).padStart(5, "0");
    return `/assets/loading_animations/Code_Cuisine_${frameNumber}.png`;
  }
  ngOnInit() {
    if (!this.recipeService.ingredients().length) {
      void this.router.navigate(["/generate"], { replaceUrl: true });
      return;
    }
    if (!this.hasEnoughIngredients()) {
      this.showInsufficientPopup.set(true);
      return;
    }
    this.startGeneration();
  }
  hasEnoughIngredients() {
    const ingredients = this.recipeService.ingredients();
    const portions = this.recipeService.preferences().portions;
    if (!ingredients.length)
      return false;
    if (portions >= 4 && ingredients.length < 2) {
      return false;
    }
    if (portions >= 6 && ingredients.length < 3) {
      return false;
    }
    const totalWeight = ingredients.reduce((sum, item) => {
      const amount = Number(item.amount) || 0;
      const unit = (item.unit || "").toLowerCase().trim();
      if (unit === "gram" || unit === "g")
        return sum + amount;
      if (unit === "ml")
        return sum + amount;
      if (unit === "piece")
        return sum + amount * 80;
      return sum + amount;
    }, 0);
    const minWeightPerPortion = 65;
    if (portions >= 1 && totalWeight / portions < minWeightPerPortion) {
      return false;
    }
    const onlyPieces = ingredients.every((item) => (item.unit || "").toLowerCase().trim() === "piece");
    const totalPieces = ingredients.reduce((sum, item) => {
      return (item.unit || "").toLowerCase().trim() === "piece" ? sum + (Number(item.amount) || 0) : sum;
    }, 0);
    if (onlyPieces && totalPieces < Math.ceil(portions / 2) && portions >= 3) {
      return false;
    }
    return true;
  }
  closePopup() {
    this.showInsufficientPopup.set(false);
    void this.router.navigate(["/preferences"]);
  }
  onEscape() {
    if (this.showInsufficientPopup()) {
      this.closePopup();
    }
  }
  startAnimation() {
    this.stopAnimation();
    this.intervalId = setInterval(() => {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.cdr.markForCheck();
    }, 1e3 / this.fps);
  }
  stopAnimation() {
    if (this.intervalId !== void 0) {
      clearInterval(this.intervalId);
      this.intervalId = void 0;
    }
  }
  startGeneration() {
    this.generationSub?.unsubscribe();
    this.startAnimation();
    this.generationSub = this.recipeService.generateRecipes().subscribe({
      next: () => {
        this.stopAnimation();
        void this.router.navigate(["/results"], { replaceUrl: true });
      },
      error: () => this.stopAnimation()
    });
  }
  retryGeneration() {
    if (!this.recipeService.isLoading())
      this.startGeneration();
  }
  ngOnDestroy() {
    this.stopAnimation();
    this.generationSub?.unsubscribe();
  }
  static \u0275fac = function Loading_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Loading)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Loading, selectors: [["app-loading"]], hostBindings: function Loading_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function Loading_keydown_escape_HostBindingHandler() {
        return ctx.onEscape();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 9, vars: 3, consts: [[1, "loading-page"], ["variant", "light"], [1, "loading"], [1, "loading__container"], [1, "loading__spinner"], ["alt", "Loading animation", 1, "loading__image", 3, "src"], ["role", "alert", 1, "loading__error-container"], [1, "loading__text"], ["role", "presentation", 1, "loading-popup-backdrop"], [1, "loading__error-text"], [1, "loading__error-actions"], ["type", "button", 1, "loading__retry-btn", 3, "click"], ["routerLink", "/preferences", 1, "loading__back-btn"], ["role", "presentation", 1, "loading-popup-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "popup-title", "id", "insufficient-ingredients-popup", 1, "loading-popup", 3, "click"], ["type", "button", "aria-label", "Close popup", "id", "btn-close-loading-popup", 1, "loading-popup__close-btn", 3, "click"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["id", "popup-title", 1, "loading-popup__title"], [1, "loading-popup__description"], ["routerLink", "/generate", "id", "btn-back-to-ingredients-popup", 1, "loading-popup__link"], [1, "loading-popup__arrow"]], template: function Loading_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-navbar", 1);
      \u0275\u0275elementStart(2, "main", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, Loading_Conditional_6_Template, 8, 1, "div", 6)(7, Loading_Conditional_7_Template, 2, 0, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, Loading_Conditional_8_Template, 15, 0, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("src", ctx.currentImage, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 6 : 7);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showInsufficientPopup() ? 8 : -1);
    }
  }, dependencies: [Navbar, RouterLink], styles: ['\n.loading-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: #396039;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n}\n.loading[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.loading__container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  gap: 24px;\n}\n.loading__spinner[_ngcontent-%COMP%] {\n  width: 253px;\n  height: 309px;\n  border-top-color: var(--color-cream);\n  border-radius: 20px;\n  background-color: #C4D0C4;\n}\n.loading__text[_ngcontent-%COMP%] {\n  color: #FAF0E6;\n  font-family: "Ubuntu";\n  font-size: 48px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n.loading__image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding-bottom: 20px;\n}\n.loading__error-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  margin-top: 24px;\n  text-align: center;\n  max-width: 520px;\n  padding: 0 20px;\n}\n.loading__error-text[_ngcontent-%COMP%] {\n  color: #FAF0E6;\n  font-family: "Ubuntu", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.loading__error-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.loading__retry-btn[_ngcontent-%COMP%] {\n  background-color: #FAF0E6;\n  color: #396039;\n  font-family: "Ubuntu", sans-serif;\n  font-size: 18px;\n  font-weight: 700;\n  padding: 12px 32px;\n  border-radius: 30px;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.loading__retry-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.95;\n  transform: translateY(-1px);\n}\n.loading__retry-btn[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.loading__back-btn[_ngcontent-%COMP%] {\n  color: #FAF0E6;\n  font-family: "Ubuntu", sans-serif;\n  font-size: 16px;\n  text-decoration: underline;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.loading__back-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.loading-popup-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background-color: rgba(0, 0, 0, 0.48);\n  backdrop-filter: blur(5px);\n  -webkit-backdrop-filter: blur(5px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_popupFadeIn 0.22s ease forwards;\n}\n.loading-popup[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: #396039;\n  border-radius: 36px;\n  padding: 56px 64px 48px 64px;\n  max-width: 680px;\n  width: 100%;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);\n  color: #FFFFFF;\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_popupScaleUp 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n.loading-popup__close-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 32px;\n  right: 36px;\n  background: transparent;\n  border: none;\n  color: #FFFFFF;\n  cursor: pointer;\n  padding: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.15s ease, opacity 0.15s ease;\n}\n.loading-popup__close-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n  transform: scale(1.1);\n}\n.loading-popup__title[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 36px;\n  font-weight: 700;\n  color: #FFFFFF;\n  margin: 0 0 24px 0;\n  line-height: 1.25;\n}\n.loading-popup__description[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 19px;\n  font-weight: 400;\n  color: #FFFFFF;\n  line-height: 1.55;\n  margin: 0 0 44px 0;\n  max-width: 560px;\n}\n.loading-popup__link[_ngcontent-%COMP%] {\n  align-self: start;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 22px;\n  font-weight: 500;\n  color: #FFFFFF;\n  text-decoration: none;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.loading-popup__link[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateX(4px);\n}\n.loading-popup__arrow[_ngcontent-%COMP%] {\n  font-size: 26px;\n  line-height: 1;\n  display: inline-block;\n  transition: transform 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_popupFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_popupScaleUp {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n@media (max-width: 640px) {\n  .loading-popup[_ngcontent-%COMP%] {\n    padding: 40px 28px 32px 28px;\n    border-radius: 28px;\n  }\n  .loading-popup__close-btn[_ngcontent-%COMP%] {\n    top: 24px;\n    right: 24px;\n  }\n  .loading-popup__title[_ngcontent-%COMP%] {\n    font-size: 28px;\n    margin-bottom: 16px;\n  }\n  .loading-popup__description[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-bottom: 32px;\n  }\n  .loading-popup__link[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n/*# sourceMappingURL=loading.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Loading, [{
    type: Component,
    args: [{ selector: "app-loading", imports: [Navbar, RouterLink], template: `<div class="loading-page">
    <app-navbar variant="light" />

    <main class="loading">
        <div class="loading__container">
            <div class="loading__spinner">
                <img [src]="currentImage" alt="Loading animation" class="loading__image" />
            </div>
        </div>

        @if (errorMessage()) {
        <div class="loading__error-container" role="alert">
            <span class="loading__error-text">{{ errorMessage() }}</span>
            <div class="loading__error-actions">
                <button type="button" class="loading__retry-btn" (click)="retryGeneration()">
                    Retry
                </button>
                <a routerLink="/preferences" class="loading__back-btn">
                    Back to preferences
                </a>
            </div>
        </div>
        } @else {
        <span class="loading__text">Generating ...</span>
        }
    </main>

    @if (showInsufficientPopup()) {
    <div class="loading-popup-backdrop" (click)="closePopup()" role="presentation">
        <div
            class="loading-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            (click)="$event.stopPropagation()"
            id="insufficient-ingredients-popup"
        >
            <button
                type="button"
                class="loading-popup__close-btn"
                (click)="closePopup()"
                aria-label="Close popup"
                id="btn-close-loading-popup"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <h2 id="popup-title" class="loading-popup__title">Ups! Not quite enough...</h2>

            <p class="loading-popup__description">
                It looks like some ingredient quantities aren't sufficient for your selected servings. Please add or adjust quantities and try again.
            </p>

            <a routerLink="/generate" class="loading-popup__link" id="btn-back-to-ingredients-popup">
                <span>Go back to ingredients</span>
                <span class="loading-popup__arrow">&rarr;</span>
            </a>
        </div>
    </div>
    }
</div>`, styles: ['/* src/app/features/loading/loading.scss */\n.loading-page {\n  min-height: 100vh;\n  background-color: #396039;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n}\n.loading {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.loading__container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  gap: 24px;\n}\n.loading__spinner {\n  width: 253px;\n  height: 309px;\n  border-top-color: var(--color-cream);\n  border-radius: 20px;\n  background-color: #C4D0C4;\n}\n.loading__text {\n  color: #FAF0E6;\n  font-family: "Ubuntu";\n  font-size: 48px;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n}\n.loading__image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding-bottom: 20px;\n}\n.loading__error-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  margin-top: 24px;\n  text-align: center;\n  max-width: 520px;\n  padding: 0 20px;\n}\n.loading__error-text {\n  color: #FAF0E6;\n  font-family: "Ubuntu", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.loading__error-actions {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.loading__retry-btn {\n  background-color: #FAF0E6;\n  color: #396039;\n  font-family: "Ubuntu", sans-serif;\n  font-size: 18px;\n  font-weight: 700;\n  padding: 12px 32px;\n  border-radius: 30px;\n  border: none;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.loading__retry-btn:hover {\n  opacity: 0.95;\n  transform: translateY(-1px);\n}\n.loading__retry-btn:active {\n  transform: translateY(0);\n}\n.loading__back-btn {\n  color: #FAF0E6;\n  font-family: "Ubuntu", sans-serif;\n  font-size: 16px;\n  text-decoration: underline;\n  cursor: pointer;\n  transition: opacity 0.2s ease;\n}\n.loading__back-btn:hover {\n  opacity: 0.8;\n}\n.loading-popup-backdrop {\n  position: fixed;\n  inset: 0;\n  background-color: rgba(0, 0, 0, 0.48);\n  backdrop-filter: blur(5px);\n  -webkit-backdrop-filter: blur(5px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  z-index: 1000;\n  animation: popupFadeIn 0.22s ease forwards;\n}\n.loading-popup {\n  position: relative;\n  background-color: #396039;\n  border-radius: 36px;\n  padding: 56px 64px 48px 64px;\n  max-width: 680px;\n  width: 100%;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);\n  color: #FFFFFF;\n  display: flex;\n  flex-direction: column;\n  animation: popupScaleUp 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n.loading-popup__close-btn {\n  position: absolute;\n  top: 32px;\n  right: 36px;\n  background: transparent;\n  border: none;\n  color: #FFFFFF;\n  cursor: pointer;\n  padding: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.15s ease, opacity 0.15s ease;\n}\n.loading-popup__close-btn:hover {\n  opacity: 0.8;\n  transform: scale(1.1);\n}\n.loading-popup__title {\n  font-family: "Quicksand", sans-serif;\n  font-size: 36px;\n  font-weight: 700;\n  color: #FFFFFF;\n  margin: 0 0 24px 0;\n  line-height: 1.25;\n}\n.loading-popup__description {\n  font-family: "Quicksand", sans-serif;\n  font-size: 19px;\n  font-weight: 400;\n  color: #FFFFFF;\n  line-height: 1.55;\n  margin: 0 0 44px 0;\n  max-width: 560px;\n}\n.loading-popup__link {\n  align-self: start;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 22px;\n  font-weight: 500;\n  color: #FFFFFF;\n  text-decoration: none;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.loading-popup__link:hover {\n  opacity: 0.9;\n  transform: translateX(4px);\n}\n.loading-popup__arrow {\n  font-size: 26px;\n  line-height: 1;\n  display: inline-block;\n  transition: transform 0.2s ease;\n}\n@keyframes popupFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes popupScaleUp {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n@media (max-width: 640px) {\n  .loading-popup {\n    padding: 40px 28px 32px 28px;\n    border-radius: 28px;\n  }\n  .loading-popup__close-btn {\n    top: 24px;\n    right: 24px;\n  }\n  .loading-popup__title {\n    font-size: 28px;\n    margin-bottom: 16px;\n  }\n  .loading-popup__description {\n    font-size: 16px;\n    margin-bottom: 32px;\n  }\n  .loading-popup__link {\n    font-size: 18px;\n  }\n}\n/*# sourceMappingURL=loading.css.map */\n'] }]
  }], null, { onEscape: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Loading, { className: "Loading", filePath: "src/app/features/loading/loading.ts", lineNumber: 21 });
})();
export {
  Loading
};
//# sourceMappingURL=chunk-F3N5MUN5.js.map
