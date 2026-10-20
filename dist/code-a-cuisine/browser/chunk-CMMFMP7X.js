import {
  Navbar
} from "./chunk-VIDJBO73.js";
import {
  RecipeService
} from "./chunk-YUTAVKYH.js";
import "./chunk-RZNXE2LB.js";
import {
  Component,
  Router,
  RouterLink,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-APPJTXDK.js";

// src/app/features/results/results.ts
var _c0 = (a0) => ["/recipe", a0];
var _forTrack0 = ($index, $item) => $item.id;
function Results_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tag_r1);
  }
}
function Results_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 16)(1, "div", 20)(2, "div", 21);
    \u0275\u0275element(3, "img", 22);
    \u0275\u0275elementStart(4, "span", 23);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 25);
    \u0275\u0275element(9, "img", 26);
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 27)(13, "a", 28);
    \u0275\u0275text(14, "View");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const recipe_r2 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(recipe_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(recipe_r2.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Cooking time: ", recipe_r2.cookingTime);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c0, recipe_r2.id));
  }
}
var Results = class _Results {
  router = inject(Router);
  recipeService = inject(RecipeService);
  recipes = this.recipeService.resultsCards;
  tags = this.recipeService.resultTags;
  ngOnInit() {
    if (!this.recipes().length) {
      void this.router.navigate(["/generate"], { replaceUrl: true });
    }
  }
  static \u0275fac = function Results_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Results)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Results, selectors: [["app-results"]], decls: 27, vars: 0, consts: [[1, "results-page"], ["variant", "light"], [1, "results"], [1, "results__container"], [1, "results__hero"], [1, "results__hero-content"], [1, "results__title"], [1, "results__title-desktop"], [1, "results__title-mobile"], [1, "results__subtitle"], [1, "results__subtitle-break"], [1, "results__tags"], [1, "results__tag"], [1, "results__hero-image-wrapper"], ["src", "/assets/finish.png", "alt", "Finished dish", 1, "results__hero-image"], [1, "results__cards"], [1, "results__card"], [1, "results__footer"], ["routerLink", "/generate", 1, "results__generate-link"], ["src", "/assets/arrow.svg", "alt", "Arrow", 1, "results__arrow-icon"], [1, "results__card-top"], [1, "results__card-header"], ["src", "/assets/icon.svg", "alt", "Cloche", 1, "results__cloche-icon"], [1, "results__card-label"], [1, "results__card-title"], [1, "results__card-time"], ["src", "/assets/clock.svg", "alt", "Clock", 1, "results__time-icon"], [1, "results__card-bottom"], [1, "results__view-btn", 3, "routerLink"]], template: function Results_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-navbar", 1);
      \u0275\u0275elementStart(2, "main", 2)(3, "div", 3)(4, "section", 4)(5, "div", 5)(6, "h1", 6)(7, "span", 7);
      \u0275\u0275text(8, "The recipe results");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "span", 8);
      \u0275\u0275text(10, "Generated recipes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 9);
      \u0275\u0275text(12, " We took what you have and let our AI do the thinking.");
      \u0275\u0275element(13, "br", 10);
      \u0275\u0275text(14, " Here are 3 easy recipes you can make right now! ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 11);
      \u0275\u0275repeaterCreate(16, Results_For_17_Template, 2, 1, "span", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 13);
      \u0275\u0275element(19, "img", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "section", 15);
      \u0275\u0275repeaterCreate(21, Results_For_22_Template, 15, 6, "article", 16, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "footer", 17)(24, "a", 18);
      \u0275\u0275text(25, " Generate new recipe ");
      \u0275\u0275element(26, "img", 19);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275repeater(ctx.tags());
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.recipes());
    }
  }, dependencies: [Navbar, RouterLink], styles: ['\n.results-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--color-background-green, #396039);\n  display: flex;\n  flex-direction: column;\n}\n.results[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  padding: 24px 50px 48px 50px;\n  margin: 68px 0;\n}\n@media (max-width: 768px) {\n  .results[_ngcontent-%COMP%] {\n    margin: 36px 0;\n    padding: 20px 30px 40px 30px;\n  }\n}\n@media (max-width: 480px) {\n  .results[_ngcontent-%COMP%] {\n    margin: 24px 0;\n    padding: 16px 30px 36px 30px;\n    font-size: 32px;\n  }\n}\n.results__container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1340px;\n  display: flex;\n  flex-direction: column;\n  gap: 85px;\n}\n@media (max-width: 992px) {\n  .results__container[_ngcontent-%COMP%] {\n    gap: 56px;\n  }\n}\n@media (max-width: 480px) {\n  .results__container[_ngcontent-%COMP%] {\n    gap: 40px;\n  }\n}\n.results__hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 574px;\n  gap: 40px;\n  align-items: center;\n}\n@media (max-width: 1200px) {\n  .results__hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 460px;\n    gap: 32px;\n  }\n}\n@media (max-width: 992px) {\n  .results__hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 28px;\n  }\n}\n.results__hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.results__title[_ngcontent-%COMP%] {\n  font-family: "Ubuntu";\n  font-size: 54px;\n  font-weight: 700;\n  color: #FAF0E6;\n  margin-bottom: 16px;\n  line-height: 1.15;\n}\n@media (max-width: 992px) {\n  .results__title[_ngcontent-%COMP%] {\n    font-size: 42px;\n  }\n}\n@media (max-width: 768px) {\n  .results__title[_ngcontent-%COMP%] {\n    font-size: 34px;\n  }\n}\n@media (max-width: 480px) {\n  .results__title[_ngcontent-%COMP%] {\n    font-size: 28px;\n    margin-bottom: 12px;\n  }\n}\n.results__title-desktop[_ngcontent-%COMP%] {\n  display: inline;\n}\n.results__title-mobile[_ngcontent-%COMP%] {\n  display: none;\n}\n.results__subtitle[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 500;\n  color: #E2EBE2;\n  line-height: 1.5;\n  margin-bottom: 24px;\n}\n@media (max-width: 992px) {\n  .results__subtitle[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (max-width: 480px) {\n  .results__subtitle[_ngcontent-%COMP%] {\n    font-size: 18px;\n    margin-bottom: 18px;\n  }\n}\n@media (max-width: 600px) {\n  .results__subtitle-break[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.results__tags[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n@media (max-width: 480px) {\n  .results__tags[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n.results__tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 12px;\n  border-radius: var(--radius-pill, 999px);\n  background-color: #FAF0E6;\n  color: #1E5515;\n  font-family: "Quicksand";\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 480px) {\n  .results__tag[_ngcontent-%COMP%] {\n    font-size: 14px;\n    padding: 4px 10px;\n  }\n}\n.results__hero-image-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 220px;\n  border-radius: 20px;\n  overflow: hidden;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n@media (max-width: 480px) {\n  .results__hero-image-wrapper[_ngcontent-%COMP%] {\n    height: 180px;\n    border-radius: 16px;\n  }\n}\n.results__hero-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.results__cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .results__cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n}\n@media (max-width: 700px) {\n  .results__cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n.results__card[_ngcontent-%COMP%] {\n  background-color: #D6E0D6;\n  border-radius: 24px;\n  padding: 28px 24px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 338px;\n  min-width: 0;\n  width: 100%;\n  box-sizing: border-box;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n  transition: transform var(--transition-base, 250ms ease), box-shadow var(--transition-base, 250ms ease);\n}\n@media (max-width: 480px) {\n  .results__card[_ngcontent-%COMP%] {\n    padding: 22px 18px;\n    min-height: 280px;\n    border-radius: 18px;\n  }\n}\n.results__card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  background-color: rgba(215, 223, 215, 0.8980392157);\n}\n.results__card-top[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.results__card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #2D4C2D;\n}\n.results__cloche-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 40px;\n  height: 28px;\n}\n@media (max-width: 480px) {\n  .results__cloche-icon[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 22px;\n  }\n}\n.results__card-label[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 600;\n  color: #2D4C2D;\n}\n.results__card-title[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 32px;\n  font-weight: 600;\n  color: #10310B;\n  line-height: 1.25;\n}\n@media (max-width: 768px) {\n  .results__card-title[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n}\n.results__card-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #396039;\n  font-family: var(--font-primary, "Quicksand"), sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n}\n.results__time-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.results__card-bottom[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  display: flex;\n}\n.results__view-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #FAF0E6;\n  color: #008000;\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 700;\n  padding: 10px 32px;\n  text-decoration: none;\n  border-radius: var(--radius-sm, 6px);\n  transition: background-color var(--transition-fast, 150ms ease), transform var(--transition-fast, 150ms ease);\n}\n@media (max-width: 480px) {\n  .results__view-btn[_ngcontent-%COMP%] {\n    font-size: 18px;\n    padding: 8px 24px;\n  }\n}\n.results__view-btn[_ngcontent-%COMP%]:hover {\n  background-color: #FAE0C6;\n  transform: scale(1.03);\n}\n.results__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n@media (max-width: 600px) {\n  .results__footer[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n.results__generate-link[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 20px;\n  font-weight: 600;\n  color: #FAF0E6;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  padding: 8px 20px;\n  gap: 6px;\n  transition: opacity var(--transition-fast, 150ms ease), transform var(--transition-fast, 150ms ease);\n}\n@media (max-width: 480px) {\n  .results__generate-link[_ngcontent-%COMP%] {\n    font-size: 16px;\n    padding: 8px 12px;\n  }\n}\n.results__generate-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n  transform: translateX(4px);\n  background-color: rgba(57, 96, 57, 0.1019607843);\n}\n.results__arrow-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  margin-left: 10px;\n}\n@media (max-width: 425px) {\n  .results[_ngcontent-%COMP%]   .results[_ngcontent-%COMP%] {\n    padding: 16px 30px 36px 30px !important;\n  }\n  .results__hero[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .results__hero-content[_ngcontent-%COMP%] {\n    display: contents;\n  }\n  .results__title[_ngcontent-%COMP%] {\n    order: 1;\n    margin-bottom: 0;\n    font-size: 32px;\n  }\n  .results__title-desktop[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .results__title-mobile[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .results__hero-image-wrapper[_ngcontent-%COMP%] {\n    order: 2;\n    height: 180px;\n    margin: 4px 0 8px 0;\n  }\n  .results__subtitle[_ngcontent-%COMP%] {\n    order: 3;\n    margin-bottom: 0;\n  }\n  .results__tags[_ngcontent-%COMP%] {\n    order: 4;\n  }\n}\n/*# sourceMappingURL=results.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Results, [{
    type: Component,
    args: [{ selector: "app-results", imports: [Navbar, RouterLink], template: `<div class="results-page">
    <app-navbar variant="light" />

    <main class="results">
        <div class="results__container">

            <section class="results__hero">
                <div class="results__hero-content">
                    <h1 class="results__title">
                        <span class="results__title-desktop">The recipe results</span>
                        <span class="results__title-mobile">Generated recipes</span>
                    </h1>
                    <p class="results__subtitle">
                        We took what you have and let our AI do the thinking.<br class="results__subtitle-break" />
                        Here are 3 easy recipes you can make right now!
                    </p>
                    <div class="results__tags">
                        @for (tag of tags(); track tag) {
                        <span class="results__tag">{{ tag }}</span>
                        }
                    </div>
                </div>

                <div class="results__hero-image-wrapper">
                    <img src="/assets/finish.png" alt="Finished dish" class="results__hero-image" />
                </div>
            </section>

            <section class="results__cards">
                @for (recipe of recipes(); track recipe.id) {
                <article class="results__card">
                    <div class="results__card-top">
                        <div class="results__card-header">
                            <img class="results__cloche-icon" src="/assets/icon.svg" alt="Cloche">
                            <span class="results__card-label">{{ recipe.label }}</span>
                        </div>

                        <h2 class="results__card-title">{{ recipe.title }}</h2>

                        <div class="results__card-time">
                            <img src="/assets/clock.svg" alt="Clock" class="results__time-icon" />
                            <span>Cooking time: {{ recipe.cookingTime }}</span>
                        </div>
                    </div>

                    <div class="results__card-bottom">
                        <a [routerLink]="['/recipe', recipe.id]" class="results__view-btn">View</a>
                    </div>
                </article>
                }
            </section>

            <footer class="results__footer">
                <a routerLink="/generate" class="results__generate-link">
                    Generate new recipe
                    <img src="/assets/arrow.svg" class="results__arrow-icon" alt="Arrow">
                </a>
            </footer>

        </div>
    </main>
</div>`, styles: ['/* src/app/features/results/results.scss */\n.results-page {\n  min-height: 100vh;\n  background-color: var(--color-background-green, #396039);\n  display: flex;\n  flex-direction: column;\n}\n.results {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  padding: 24px 50px 48px 50px;\n  margin: 68px 0;\n}\n@media (max-width: 768px) {\n  .results {\n    margin: 36px 0;\n    padding: 20px 30px 40px 30px;\n  }\n}\n@media (max-width: 480px) {\n  .results {\n    margin: 24px 0;\n    padding: 16px 30px 36px 30px;\n    font-size: 32px;\n  }\n}\n.results__container {\n  width: 100%;\n  max-width: 1340px;\n  display: flex;\n  flex-direction: column;\n  gap: 85px;\n}\n@media (max-width: 992px) {\n  .results__container {\n    gap: 56px;\n  }\n}\n@media (max-width: 480px) {\n  .results__container {\n    gap: 40px;\n  }\n}\n.results__hero {\n  display: grid;\n  grid-template-columns: 1fr 574px;\n  gap: 40px;\n  align-items: center;\n}\n@media (max-width: 1200px) {\n  .results__hero {\n    grid-template-columns: 1fr 460px;\n    gap: 32px;\n  }\n}\n@media (max-width: 992px) {\n  .results__hero {\n    grid-template-columns: 1fr;\n    gap: 28px;\n  }\n}\n.results__hero-content {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n.results__title {\n  font-family: "Ubuntu";\n  font-size: 54px;\n  font-weight: 700;\n  color: #FAF0E6;\n  margin-bottom: 16px;\n  line-height: 1.15;\n}\n@media (max-width: 992px) {\n  .results__title {\n    font-size: 42px;\n  }\n}\n@media (max-width: 768px) {\n  .results__title {\n    font-size: 34px;\n  }\n}\n@media (max-width: 480px) {\n  .results__title {\n    font-size: 28px;\n    margin-bottom: 12px;\n  }\n}\n.results__title-desktop {\n  display: inline;\n}\n.results__title-mobile {\n  display: none;\n}\n.results__subtitle {\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 500;\n  color: #E2EBE2;\n  line-height: 1.5;\n  margin-bottom: 24px;\n}\n@media (max-width: 992px) {\n  .results__subtitle {\n    font-size: 20px;\n  }\n}\n@media (max-width: 480px) {\n  .results__subtitle {\n    font-size: 18px;\n    margin-bottom: 18px;\n  }\n}\n@media (max-width: 600px) {\n  .results__subtitle-break {\n    display: none;\n  }\n}\n.results__tags {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n@media (max-width: 480px) {\n  .results__tags {\n    gap: 8px;\n  }\n}\n.results__tag {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 12px;\n  border-radius: var(--radius-pill, 999px);\n  background-color: #FAF0E6;\n  color: #1E5515;\n  font-family: "Quicksand";\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 480px) {\n  .results__tag {\n    font-size: 14px;\n    padding: 4px 10px;\n  }\n}\n.results__hero-image-wrapper {\n  width: 100%;\n  height: 220px;\n  border-radius: 20px;\n  overflow: hidden;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n@media (max-width: 480px) {\n  .results__hero-image-wrapper {\n    height: 180px;\n    border-radius: 16px;\n  }\n}\n.results__hero-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.results__cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n@media (max-width: 1024px) {\n  .results__cards {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n}\n@media (max-width: 700px) {\n  .results__cards {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n.results__card {\n  background-color: #D6E0D6;\n  border-radius: 24px;\n  padding: 28px 24px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 338px;\n  min-width: 0;\n  width: 100%;\n  box-sizing: border-box;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n  transition: transform var(--transition-base, 250ms ease), box-shadow var(--transition-base, 250ms ease);\n}\n@media (max-width: 480px) {\n  .results__card {\n    padding: 22px 18px;\n    min-height: 280px;\n    border-radius: 18px;\n  }\n}\n.results__card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  background-color: rgba(215, 223, 215, 0.8980392157);\n}\n.results__card-top {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.results__card-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #2D4C2D;\n}\n.results__cloche-icon {\n  flex-shrink: 0;\n  width: 40px;\n  height: 28px;\n}\n@media (max-width: 480px) {\n  .results__cloche-icon {\n    width: 32px;\n    height: 22px;\n  }\n}\n.results__card-label {\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 600;\n  color: #2D4C2D;\n}\n.results__card-title {\n  font-family: "Quicksand";\n  font-size: 32px;\n  font-weight: 600;\n  color: #10310B;\n  line-height: 1.25;\n}\n@media (max-width: 768px) {\n  .results__card-title {\n    font-size: 26px;\n  }\n}\n.results__card-time {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #396039;\n  font-family: var(--font-primary, "Quicksand"), sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n}\n.results__time-icon {\n  width: 18px;\n  height: 18px;\n}\n.results__card-bottom {\n  margin-top: 24px;\n  display: flex;\n}\n.results__view-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #FAF0E6;\n  color: #008000;\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 700;\n  padding: 10px 32px;\n  text-decoration: none;\n  border-radius: var(--radius-sm, 6px);\n  transition: background-color var(--transition-fast, 150ms ease), transform var(--transition-fast, 150ms ease);\n}\n@media (max-width: 480px) {\n  .results__view-btn {\n    font-size: 18px;\n    padding: 8px 24px;\n  }\n}\n.results__view-btn:hover {\n  background-color: #FAE0C6;\n  transform: scale(1.03);\n}\n.results__footer {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n@media (max-width: 600px) {\n  .results__footer {\n    justify-content: center;\n  }\n}\n.results__generate-link {\n  font-family: "Quicksand";\n  font-size: 20px;\n  font-weight: 600;\n  color: #FAF0E6;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  padding: 8px 20px;\n  gap: 6px;\n  transition: opacity var(--transition-fast, 150ms ease), transform var(--transition-fast, 150ms ease);\n}\n@media (max-width: 480px) {\n  .results__generate-link {\n    font-size: 16px;\n    padding: 8px 12px;\n  }\n}\n.results__generate-link:hover {\n  opacity: 0.85;\n  transform: translateX(4px);\n  background-color: rgba(57, 96, 57, 0.1019607843);\n}\n.results__arrow-icon {\n  width: 24px;\n  margin-left: 10px;\n}\n@media (max-width: 425px) {\n  .results .results {\n    padding: 16px 30px 36px 30px !important;\n  }\n  .results__hero {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 16px;\n  }\n  .results__hero-content {\n    display: contents;\n  }\n  .results__title {\n    order: 1;\n    margin-bottom: 0;\n    font-size: 32px;\n  }\n  .results__title-desktop {\n    display: none;\n  }\n  .results__title-mobile {\n    display: inline;\n  }\n  .results__hero-image-wrapper {\n    order: 2;\n    height: 180px;\n    margin: 4px 0 8px 0;\n  }\n  .results__subtitle {\n    order: 3;\n    margin-bottom: 0;\n  }\n  .results__tags {\n    order: 4;\n  }\n}\n/*# sourceMappingURL=results.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Results, { className: "Results", filePath: "src/app/features/results/results.ts", lineNumber: 14 });
})();
export {
  Results
};
//# sourceMappingURL=chunk-CMMFMP7X.js.map
