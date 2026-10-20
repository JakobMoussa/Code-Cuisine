import {
  RecipeService
} from "./chunk-YUTAVKYH.js";
import "./chunk-RZNXE2LB.js";
import {
  ActivatedRoute,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Observable,
  Router,
  RouterLink,
  assertInInjectionContext,
  inject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-APPJTXDK.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
/**
 * @license Angular v21.2.23
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    ngDevMode && assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}

// src/app/features/recipes/recipe-detail/recipe-detail.ts
var _forTrack0 = ($index, $item) => $item.number;
function RecipeDetail_Conditional_9_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275element(1, "img", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const chef_r2 = ctx.$implicit;
    \u0275\u0275classProp("chef-1", chef_r2 === 1)("chef-2", chef_r2 !== 1);
    \u0275\u0275advance();
    \u0275\u0275property("src", chef_r2 === 1 ? "/assets/koch.svg" : "/assets/cook.svg", \u0275\u0275sanitizeUrl)("alt", "Chef " + chef_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Chef ", chef_r2, " ");
  }
}
function RecipeDetail_Conditional_9_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tag_r3);
  }
}
function RecipeDetail_Conditional_9_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 40)(1, "span", 59);
    \u0275\u0275text(2, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r5.amount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.name);
  }
}
function RecipeDetail_Conditional_9_For_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 40)(1, "span", 59);
    \u0275\u0275text(2, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r6.amount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.name);
  }
}
function RecipeDetail_Conditional_9_For_82_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 65);
  }
  if (rf & 2) {
    const step_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("alt", step_r7.chef);
  }
}
function RecipeDetail_Conditional_9_For_82_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 66);
  }
  if (rf & 2) {
    const step_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("alt", step_r7.chef);
  }
}
function RecipeDetail_Conditional_9_For_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 62)(2, "h3", 63)(3, "span", 64);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 57);
    \u0275\u0275conditionalCreate(7, RecipeDetail_Conditional_9_For_82_Conditional_7_Template, 1, 1, "img", 65)(8, RecipeDetail_Conditional_9_For_82_Conditional_8_Template, 1, 1, "img", 66);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 67);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", step_r7.number, ".");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r7.title, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("chef-1", step_r7.chef === "Chef 1")("chef-2", step_r7.chef !== "Chef 1");
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r7.chef === "Chef 1" ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", step_r7.chef, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r7.description);
  }
}
function RecipeDetail_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 7)(1, "div", 8)(2, "div", 9)(3, "div", 10)(4, "div", 11);
    \u0275\u0275element(5, "img", 12);
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h1", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 14)(11, "span", 15);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, RecipeDetail_Conditional_9_For_14_Template, 3, 7, "span", 16, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 17)(16, "div", 18);
    \u0275\u0275repeaterCreate(17, RecipeDetail_Conditional_9_For_18_Template, 2, 1, "span", 19, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(19, "button", 20);
    \u0275\u0275listener("click", function RecipeDetail_Conditional_9_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleFavorite());
    });
    \u0275\u0275element(20, "img", 21);
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 22)(24, "h3", 23);
    \u0275\u0275text(25, "Nutritional information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 24)(27, "div", 25)(28, "span", 26);
    \u0275\u0275text(29, "Energie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 27);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 25)(33, "span", 26);
    \u0275\u0275text(34, "Protein");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 27);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 25)(38, "span", 26);
    \u0275\u0275text(39, "Fat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 27);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 25)(43, "span", 26);
    \u0275\u0275text(44, "Carbs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 27);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(47, "section", 28)(48, "div", 29)(49, "div", 30)(50, "picture");
    \u0275\u0275element(51, "source", 31)(52, "img", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "h2", 33);
    \u0275\u0275text(54, "Ingredients");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "button", 34);
    \u0275\u0275listener("click", function RecipeDetail_Conditional_9_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleIngredients());
    });
    \u0275\u0275elementStart(56, "span");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275element(58, "img", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 36)(60, "div", 37)(61, "h3", 38);
    \u0275\u0275text(62, "Your ingredients");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "ul", 39);
    \u0275\u0275repeaterCreate(64, RecipeDetail_Conditional_9_For_65_Template, 7, 2, "li", 40, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 37)(67, "h3", 38);
    \u0275\u0275text(68, "Extra ingredients");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "ul", 39);
    \u0275\u0275repeaterCreate(70, RecipeDetail_Conditional_9_For_71_Template, 7, 2, "li", 40, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(72, "section", 28)(73, "div", 29)(74, "div", 30)(75, "picture");
    \u0275\u0275element(76, "source", 41)(77, "img", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "h2", 33);
    \u0275\u0275text(79, "Directions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(80, "div", 43);
    \u0275\u0275repeaterCreate(81, RecipeDetail_Conditional_9_For_82_Template, 12, 9, "div", 44, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 45)(84, "div", 46)(85, "span", 47);
    \u0275\u0275text(86, "Just finished this meal?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "span", 48);
    \u0275\u0275text(88, "Give it a heart, so that the others know this is delicious.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "button", 49);
    \u0275\u0275listener("click", function RecipeDetail_Conditional_9_Template_button_click_89_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleFavorite());
    });
    \u0275\u0275element(90, "img", 50);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(91, "div", 51)(92, "span", 52);
    \u0275\u0275text(93, "Find inspiration for your next culinary adventure!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "a", 53);
    \u0275\u0275text(95, "Cookbook");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "footer", 54)(97, "a", 55);
    \u0275\u0275text(98, " Generate new recipie ");
    \u0275\u0275element(99, "img", 56);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Coocking time: ", ctx_r3.recipe.cookingTime);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.recipe.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Coocking person: ", ctx_r3.recipe.cookingPersons);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.chefs);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.recipe.tags);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r3.isFavorite ? "/assets/green-heart.svg" : "/assets/heart.svg", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.recipe.likes);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.recipe.nutrition.calories);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.recipe.nutrition.protein);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.recipe.nutrition.fat);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.recipe.nutrition.carbs);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r3.showIngredients ? "Hide ingredients" : "Show ingredients");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-open", ctx_r3.showIngredients);
    \u0275\u0275advance();
    \u0275\u0275classProp("is-collapsed", !ctx_r3.showIngredients);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.recipe.yourIngredients);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.recipe.extraIngredients);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r3.recipe.steps);
    \u0275\u0275advance(9);
    \u0275\u0275property("src", ctx_r3.isFavorite ? "/assets/green-heart.svg" : "/assets/heart.svg", \u0275\u0275sanitizeUrl);
  }
}
var RecipeDetail = class _RecipeDetail {
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  recipeService = inject(RecipeService);
  recipe;
  chefs = [];
  isFavorite = false;
  showIngredients = false;
  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get("id") || "1";
      this.recipe = this.recipeService.getRecipeById(id);
      this.chefs = Array.from({ length: this.recipe?.cookingPersons ?? 0 }, (_, index) => index + 1);
      this.isFavorite = false;
      this.showIngredients = false;
      this.cdr.markForCheck();
      if (!this.recipe)
        void this.router.navigate(["/generate"], { replaceUrl: true });
    });
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.recipe) {
      if (this.isFavorite) {
        this.recipe.likes++;
      } else {
        this.recipe.likes--;
      }
    }
  }
  toggleIngredients() {
    this.showIngredients = !this.showIngredients;
  }
  static \u0275fac = function RecipeDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipeDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RecipeDetail, selectors: [["app-recipe-detail"]], decls: 10, vars: 1, consts: [[1, "recipe-detail-page"], [1, "recipe-detail__navbar"], [1, "recipe-detail__header-container"], ["routerLink", "/", 1, "recipe-detail__logo-link"], ["src", "/assets/logo-green.svg", "alt", "Code \xE0 Cuisine Logo", 1, "recipe-detail__logo"], ["routerLink", "/results", 1, "recipe-detail__back-link"], ["src", "/assets/back-arrow.svg", "alt", "Back", 1, "recipe-detail__back-icon"], [1, "recipe-detail"], [1, "recipe-detail__outer-card"], [1, "recipe-detail__hero-card"], [1, "recipe-detail__hero-left"], [1, "recipe-detail__time-row"], ["src", "/assets/clock.svg", "alt", "Clock", 1, "recipe-detail__clock-icon"], [1, "recipe-detail__title"], [1, "recipe-detail__person-row"], [1, "recipe-detail__person-label"], [1, "recipe-detail__chef-pill", 3, "chef-1", "chef-2"], [1, "recipe-detail__hero-right"], [1, "recipe-detail__tags"], [1, "recipe-detail__tag"], ["type", "button", 1, "recipe-detail__like-btn", 3, "click"], ["alt", "Heart", 1, "recipe-detail__like-icon", 3, "src"], [1, "recipe-detail__nutrition"], [1, "recipe-detail__nutrition-title"], [1, "recipe-detail__nutrition-grid"], [1, "recipe-detail__nutrition-col"], [1, "recipe-detail__nutrition-label"], [1, "recipe-detail__nutrition-value"], [1, "recipe-detail__section"], [1, "recipe-detail__section-banner"], [1, "recipe-detail__banner-deco", "deco-right"], ["media", "(max-width: 499px)", "srcset", "/assets/ingredients-mob.svg"], ["src", "/assets/Hero Directions.png", "alt", "Ingredients deco", 1, "deco-right"], [1, "recipe-detail__section-title"], ["type", "button", 1, "recipe-detail__toggle-ingredients-btn", 3, "click"], ["src", "/assets/arrow_drop_down.svg", "alt", "", 1, "recipe-detail__toggle-arrow"], [1, "recipe-detail__ingredients-grid"], [1, "recipe-detail__ingredients-col"], [1, "recipe-detail__group-title"], [1, "recipe-detail__list"], [1, "recipe-detail__list-item"], ["media", "(max-width: 499px)", "srcset", "/assets/directions-mob.svg"], ["src", "/assets/Hero Ingredients.png", "alt", "Directions deco", 1, "deco-right"], [1, "recipe-detail__steps-grid"], [1, "recipe-detail__step-card"], [1, "recipe-detail__finish-prompt"], [1, "recipe-detail__finish-text"], [1, "recipe-detail__finish-title"], [1, "recipe-detail__finish-sub"], ["type", "button", 1, "recipe-detail__heart-action-btn", 3, "click"], ["alt", "Heart", 1, "recipe-detail__large-heart", 3, "src"], [1, "recipe-detail__cookbook-promo"], [1, "recipe-detail__promo-text"], ["routerLink", "/cookbook", 1, "recipe-detail__promo-btn"], [1, "recipe-detail__footer"], ["routerLink", "/generate", 1, "recipe-detail__generate-link"], ["src", "/assets/back-arrow.svg", "alt", "Arrow", 1, "recipe-detail__arrow-icon"], [1, "recipe-detail__chef-pill"], [1, "recipe-detail__chef-icon", 3, "src", "alt"], [1, "recipe-detail__bullet"], [1, "recipe-detail__amount"], [1, "recipe-detail__name"], [1, "recipe-detail__step-header"], [1, "recipe-detail__step-title"], [1, "recipe-detail__step-number"], ["src", "/assets/koch.svg", 1, "recipe-detail__chef-icon", 3, "alt"], ["src", "/assets/cook.svg", 1, "recipe-detail__chef-icon", 3, "alt"], [1, "recipe-detail__step-desc"]], template: function RecipeDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "a", 5);
      \u0275\u0275element(6, "img", 6);
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Recipe results");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(9, RecipeDetail_Conditional_9_Template, 100, 15, "main", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.recipe ? 9 : -1);
    }
  }, dependencies: [RouterLink], styles: ['\n.recipe-detail-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: #FFFFFF;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 48px;\n}\n.recipe-detail__navbar[_ngcontent-%COMP%] {\n  padding: 32px 64px 50px 64px;\n}\n.recipe-detail__header-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  width: 100%;\n  display: flex;\n  align-items: start;\n  flex-direction: column;\n  gap: 24px;\n}\n.recipe-detail__logo-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n.recipe-detail__logo[_ngcontent-%COMP%] {\n  height: 36px;\n}\n.recipe-detail__back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: #1E5515;\n  text-decoration: none;\n  transition: transform 150ms ease;\n}\n.recipe-detail__back-link[_ngcontent-%COMP%]:hover {\n  transform: translateX(-4px);\n}\n.recipe-detail__back-icon[_ngcontent-%COMP%] {\n  width: 20px;\n}\n.recipe-detail[_ngcontent-%COMP%] {\n  max-width: 1248px;\n  width: 100%;\n  margin: 0 auto;\n  padding: 0 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 36px;\n}\n.recipe-detail__outer-card[_ngcontent-%COMP%] {\n  background-color: #FAF5F0;\n  border: 3px solid #FAF0E6;\n  border-radius: 28px;\n  padding: 36px 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.recipe-detail__hero-card[_ngcontent-%COMP%] {\n  background-color: #F3E7DC;\n  border-radius: 20px;\n  padding: 28px 36px;\n  display: grid;\n  grid-template-columns: 1fr 340px;\n  gap: 40px;\n  align-items: center;\n}\n@media (max-width: 900px) {\n  .recipe-detail__hero-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.recipe-detail__hero-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.recipe-detail__time-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 600;\n  color: #396039;\n}\n.recipe-detail__clock-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.recipe-detail__title[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 38px;\n  font-weight: 700;\n  color: #1E5515;\n  line-height: 1.15;\n  margin: 4px 0 8px 0;\n}\n.recipe-detail__person-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #1E5515;\n  flex-wrap: wrap;\n}\n.recipe-detail__chef-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 2px 4px;\n  border-radius: 6px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  color: #10310B;\n}\n.recipe-detail__chef-pill.chef-1[_ngcontent-%COMP%] {\n  background-color: #D7DFD7;\n}\n.recipe-detail__chef-pill.chef-2[_ngcontent-%COMP%] {\n  background-color: #FFD9B3;\n}\n.recipe-detail__chef-icon[_ngcontent-%COMP%] {\n  width: 25px;\n  height: 25px;\n}\n.recipe-detail__hero-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  align-items: start;\n}\n@media (max-width: 900px) {\n  .recipe-detail__hero-right[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n}\n.recipe-detail__tags[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.recipe-detail__tag[_ngcontent-%COMP%] {\n  background-color: #E4D8CC;\n  color: #10310B;\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 600;\n  padding: 6px 16px;\n  border-radius: 999px;\n}\n.recipe-detail__like-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background-color: #E4D8CC;\n  border: 1px solid #D8C8BA;\n  padding: 5px 14px;\n  border-radius: 999px;\n  cursor: pointer;\n  font-family: "Quicksand", sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: #10310B;\n  transition: transform 150ms ease;\n}\n.recipe-detail__like-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.04);\n}\n.recipe-detail__like-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.recipe-detail__nutrition[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.recipe-detail__nutrition-title[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  color: #555;\n  margin-bottom: 8px;\n}\n.recipe-detail__nutrition-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  text-align: left;\n}\n.recipe-detail__nutrition-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.recipe-detail__nutrition-label[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 22px;\n  font-weight: 700;\n  color: #10310B;\n}\n.recipe-detail__nutrition-value[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #333;\n}\n.recipe-detail__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 28px;\n}\n.recipe-detail__section-banner[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.recipe-detail__banner-deco[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.recipe-detail__banner-deco[_ngcontent-%COMP%]   picture[_ngcontent-%COMP%] {\n  display: contents;\n}\n.recipe-detail__banner-deco[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 48px;\n  width: auto;\n  object-fit: contain;\n}\n.recipe-detail__banner-deco[_ngcontent-%COMP%]   img.deco-right[_ngcontent-%COMP%] {\n  width: 1152px;\n  height: 148px;\n  max-width: 100%;\n  object-fit: contain;\n}\n.recipe-detail__section-title[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-family: "Quicksand", sans-serif;\n  font-size: 32px;\n  font-weight: 600;\n  color: #1E5515;\n  margin: 0;\n  z-index: 2;\n  text-align: center;\n  pointer-events: none;\n}\n.recipe-detail__toggle-ingredients-btn[_ngcontent-%COMP%] {\n  display: none;\n}\n.recipe-detail__ingredients-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  padding: 0 180px;\n}\n@media (max-width: 768px) {\n  .recipe-detail__ingredients-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.recipe-detail__group-title[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  color: #008000;\n  margin-bottom: 16px;\n}\n.recipe-detail__list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.recipe-detail__list-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #10310B;\n}\n.recipe-detail__bullet[_ngcontent-%COMP%] {\n  color: #10310B;\n  font-weight: 700;\n}\n.recipe-detail__amount[_ngcontent-%COMP%] {\n  min-width: 60px;\n  font-weight: 700;\n  color: #10310B;\n}\n.recipe-detail__name[_ngcontent-%COMP%] {\n  color: #333;\n}\n.recipe-detail__steps-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 28px;\n  padding: 0 100px;\n}\n@media (max-width: 768px) {\n  .recipe-detail__steps-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.recipe-detail__step-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.recipe-detail__step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.recipe-detail__step-title[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 500;\n  color: #10310B;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.recipe-detail__step-number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #FAF0E6;\n  border-radius: 50%;\n  min-width: 36px;\n  min-height: 36px;\n}\n.recipe-detail__step-desc[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  color: #444;\n  line-height: 1.55;\n}\n.recipe-detail__finish-prompt[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n  font-family: "Quicksand";\n  font-size: 20px;\n  font-weight: 900;\n  color: #10310B;\n  flex-wrap: wrap;\n}\n.recipe-detail__finish-text[_ngcontent-%COMP%] {\n  display: contents;\n}\n.recipe-detail__finish-title[_ngcontent-%COMP%] {\n  font-weight: 900;\n}\n.recipe-detail__finish-sub[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #555;\n  font-size: 16px;\n}\n.recipe-detail__heart-action-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  transition: transform 150ms ease;\n}\n.recipe-detail__heart-action-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.15);\n}\n.recipe-detail__large-heart[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.recipe-detail__cookbook-promo[_ngcontent-%COMP%] {\n  background-color: #D6E0D6;\n  border-radius: 16px;\n  padding: 24px 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 50px;\n}\n@media (max-width: 600px) {\n  .recipe-detail__cookbook-promo[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n}\n.recipe-detail__promo-text[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  color: #10310B;\n}\n.recipe-detail__promo-btn[_ngcontent-%COMP%] {\n  background-color: #396039;\n  color: #FFFFFF;\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  padding: 12px 36px;\n  text-decoration: none;\n  transition: background-color 150ms ease, transform 150ms ease;\n}\n.recipe-detail__promo-btn[_ngcontent-%COMP%]:hover {\n  background-color: #2D4C2D;\n  transform: translateY(-2px);\n}\n.recipe-detail__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.recipe-detail__generate-link[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #396039;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: transform 150ms ease, opacity 150ms ease;\n}\n.recipe-detail__generate-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n  transform: translateX(4px);\n}\n.recipe-detail__arrow-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  rotate: 180deg;\n}\n@media (max-width: 980px) {\n  .recipe-detail__ingredients-grid[_ngcontent-%COMP%] {\n    padding: 0 100px;\n  }\n  .recipe-detail__step-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .recipe-detail__steps-grid[_ngcontent-%COMP%] {\n    gap: 20px;\n    padding: 0px 0px;\n  }\n  .recipe-detail__outer-card[_ngcontent-%COMP%] {\n    padding: 36px 20px;\n  }\n  .recipe-detail[_ngcontent-%COMP%] {\n    padding: 0 15px;\n  }\n}\n@media (max-width: 425px) {\n  .recipe-detail__navbar[_ngcontent-%COMP%] {\n    padding: 20px 0px 50px 25px;\n  }\n  .recipe-detail__navbar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .recipe-detail__ingredients-grid[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .recipe-detail__step-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .recipe-detail__hero-card[_ngcontent-%COMP%] {\n    padding: 20px 20px;\n  }\n  .recipe-detail__outer-card[_ngcontent-%COMP%] {\n    padding: 10px 8px;\n  }\n  .recipe-detail__title[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .recipe-detail__nutrition-label[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .recipe-detail__nutrition-value[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .recipe-detail__tags[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .recipe-detail__nutrition[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .recipe-detail__list[_ngcontent-%COMP%] {\n    padding-left: 20px;\n  }\n  .recipe-detail__section-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .recipe-detail__generate-link[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .recipe-detail-page[_ngcontent-%COMP%] {\n    padding-bottom: 0;\n  }\n  .recipe-detail__banner-deco[_ngcontent-%COMP%]   img.deco-right[_ngcontent-%COMP%] {\n    height: 90px;\n    width: auto;\n    max-width: 100%;\n  }\n  .recipe-detail__section-title[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 499px) {\n  .recipe-detail__banner-deco[_ngcontent-%COMP%]   img.deco-right[_ngcontent-%COMP%] {\n    height: 90px;\n    width: auto;\n    max-width: 100%;\n  }\n  .recipe-detail__ingredients-grid[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .recipe-detail__toggle-ingredients-btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    align-self: center;\n    border-radius: 999px;\n    padding: 8px 18px;\n    font-family: "Quicksand", sans-serif;\n    font-size: 15px;\n    font-weight: 700;\n    color: #10310B;\n    cursor: pointer;\n    transition: background-color 150ms ease, transform 150ms ease;\n  }\n  .recipe-detail__toggle-ingredients-btn[_ngcontent-%COMP%]:hover {\n    border: 1px solid rgba(57, 96, 57, 0.5019607843);\n  }\n  .recipe-detail__toggle-ingredients-btn[_ngcontent-%COMP%]:active {\n    transform: scale(0.97);\n  }\n  .recipe-detail__toggle-arrow[_ngcontent-%COMP%] {\n    width: 14px;\n    height: 8px;\n    border-radius: 50%;\n    transform: rotate(180deg);\n    transition: transform 0.2s ease;\n  }\n  .recipe-detail__toggle-arrow.is-open[_ngcontent-%COMP%] {\n    transform: rotate(0deg);\n  }\n  .recipe-detail__ingredients-grid.is-collapsed[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .recipe-detail__finish-prompt[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    border-radius: 20px;\n    padding: 20px;\n    margin-top: 24px;\n    gap: 16px;\n    background-color: transparent;\n  }\n  .recipe-detail__finish-text[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    text-align: left;\n    flex: 1;\n  }\n  .recipe-detail__finish-title[_ngcontent-%COMP%] {\n    font-family: "Quicksand", sans-serif;\n    font-size: 20px;\n    font-weight: 700;\n    color: #10310B;\n    line-height: 1.25;\n  }\n  .recipe-detail__finish-sub[_ngcontent-%COMP%] {\n    font-family: "Quicksand", sans-serif;\n    font-size: 15px;\n    font-weight: 500;\n    color: #10310B;\n    line-height: 1.35;\n  }\n  .recipe-detail__heart-action-btn[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n  }\n  .recipe-detail__large-heart[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n  }\n  .recipe-detail__cookbook-promo[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #D6E0D6;\n    border-radius: 20px;\n    padding: 16px 20px;\n    margin-top: 20px;\n    gap: 16px;\n    text-align: left;\n  }\n  .recipe-detail__promo-text[_ngcontent-%COMP%] {\n    font-family: "Quicksand", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    color: #10310B;\n    line-height: 1.3;\n    max-width: 62%;\n    margin: 0;\n  }\n  .recipe-detail__promo-btn[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n    background-color: #396039;\n    color: #FFFFFF;\n    font-family: "Quicksand", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    padding: 12px 20px;\n    text-decoration: none;\n    text-align: center;\n    white-space: nowrap;\n  }\n  .recipe-detail__generate-link[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 375px) {\n  .recipe-detail__nutrition-grid[_ngcontent-%COMP%] {\n    gap: 0;\n    align-items: center;\n  }\n}\n/*# sourceMappingURL=recipe-detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipeDetail, [{
    type: Component,
    args: [{ selector: "app-recipe-detail", standalone: true, imports: [RouterLink], template: `<div class="recipe-detail-page">
  <header class="recipe-detail__navbar">
    <div class="recipe-detail__header-container">
      <a routerLink="/" class="recipe-detail__logo-link">
        <img src="/assets/logo-green.svg" alt="Code \xE0 Cuisine Logo" class="recipe-detail__logo" />
      </a>
      <a routerLink="/results" class="recipe-detail__back-link">
        <img src="/assets/back-arrow.svg" alt="Back" class="recipe-detail__back-icon" />
        <span>Recipe results</span>
      </a>
    </div>
  </header>

  @if (recipe) {
  <main class="recipe-detail">
    <div class="recipe-detail__outer-card">

      <div class="recipe-detail__hero-card">
        <div class="recipe-detail__hero-left">
          <div class="recipe-detail__time-row">
            <img src="/assets/clock.svg" alt="Clock" class="recipe-detail__clock-icon" />
            <span>Coocking time: {{ recipe.cookingTime }}</span>
          </div>

          <h1 class="recipe-detail__title">{{ recipe.title }}</h1>

          <div class="recipe-detail__person-row">
            <span class="recipe-detail__person-label">Coocking person: {{ recipe.cookingPersons }}</span>
            @for (chef of chefs; track chef) {
            <span class="recipe-detail__chef-pill" [class.chef-1]="chef === 1" [class.chef-2]="chef !== 1">
              <img [src]="chef === 1 ? '/assets/koch.svg' : '/assets/cook.svg'" [alt]="'Chef ' + chef"
                class="recipe-detail__chef-icon" />
              Chef {{ chef }}
            </span>
            }
          </div>
        </div>

        <div class="recipe-detail__hero-right">
          <div class="recipe-detail__tags">
            @for (tag of recipe.tags; track tag) {
            <span class="recipe-detail__tag">{{ tag }}</span>
            }
            <button type="button" class="recipe-detail__like-btn" (click)="toggleFavorite()">
              <img [src]="isFavorite ? '/assets/green-heart.svg' : '/assets/heart.svg'" alt="Heart"
                class="recipe-detail__like-icon" />
              <span>{{ recipe.likes }}</span>
            </button>
          </div>

          <div class="recipe-detail__nutrition">
            <h3 class="recipe-detail__nutrition-title">Nutritional information</h3>
            <div class="recipe-detail__nutrition-grid">
              <div class="recipe-detail__nutrition-col">
                <span class="recipe-detail__nutrition-label">Energie</span>
                <span class="recipe-detail__nutrition-value">{{ recipe.nutrition.calories }}</span>
              </div>
              <div class="recipe-detail__nutrition-col">
                <span class="recipe-detail__nutrition-label">Protein</span>
                <span class="recipe-detail__nutrition-value">{{ recipe.nutrition.protein }}</span>
              </div>
              <div class="recipe-detail__nutrition-col">
                <span class="recipe-detail__nutrition-label">Fat</span>
                <span class="recipe-detail__nutrition-value">{{ recipe.nutrition.fat }}</span>
              </div>
              <div class="recipe-detail__nutrition-col">
                <span class="recipe-detail__nutrition-label">Carbs</span>
                <span class="recipe-detail__nutrition-value">{{ recipe.nutrition.carbs }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="recipe-detail__section">
        <div class="recipe-detail__section-banner">
          <div class="recipe-detail__banner-deco deco-right">
            <picture>
              <source media="(max-width: 499px)" srcset="/assets/ingredients-mob.svg" />
              <img src="/assets/Hero Directions.png" alt="Ingredients deco" class="deco-right" />
            </picture>
            <h2 class="recipe-detail__section-title">Ingredients</h2>
          </div>
        </div>

        <button type="button" class="recipe-detail__toggle-ingredients-btn" (click)="toggleIngredients()">
          <span>{{ showIngredients ? 'Hide ingredients' : 'Show ingredients' }}</span>
          <img src="/assets/arrow_drop_down.svg" alt="" class="recipe-detail__toggle-arrow"
            [class.is-open]="showIngredients" />
        </button>

        <div class="recipe-detail__ingredients-grid" [class.is-collapsed]="!showIngredients">
          <div class="recipe-detail__ingredients-col">
            <h3 class="recipe-detail__group-title">Your ingredients</h3>
            <ul class="recipe-detail__list">
              @for (item of recipe.yourIngredients; track $index) {
              <li class="recipe-detail__list-item">
                <span class="recipe-detail__bullet">\u2022</span>
                <span class="recipe-detail__amount">{{ item.amount }}</span>
                <span class="recipe-detail__name">{{ item.name }}</span>
              </li>
              }
            </ul>
          </div>

          <div class="recipe-detail__ingredients-col">
            <h3 class="recipe-detail__group-title">Extra ingredients</h3>
            <ul class="recipe-detail__list">
              @for (item of recipe.extraIngredients; track $index) {
              <li class="recipe-detail__list-item">
                <span class="recipe-detail__bullet">\u2022</span>
                <span class="recipe-detail__amount">{{ item.amount }}</span>
                <span class="recipe-detail__name">{{ item.name }}</span>
              </li>
              }
            </ul>
          </div>
        </div>
      </section>

      <section class="recipe-detail__section">
        <div class="recipe-detail__section-banner">
          <div class="recipe-detail__banner-deco deco-right">
            <picture>
              <source media="(max-width: 499px)" srcset="/assets/directions-mob.svg" />
              <img src="/assets/Hero Ingredients.png" alt="Directions deco" class="deco-right" />
            </picture>
            <h2 class="recipe-detail__section-title">Directions</h2>
          </div>
        </div>

        <div class="recipe-detail__steps-grid">
          @for (step of recipe.steps; track step.number) {
          <div class="recipe-detail__step-card">
            <div class="recipe-detail__step-header">
              <h3 class="recipe-detail__step-title">
                <span class="recipe-detail__step-number">{{ step.number }}.</span>
                {{ step.title }}
              </h3>
              <span class="recipe-detail__chef-pill" [class.chef-1]="step.chef === 'Chef 1'"
                [class.chef-2]="step.chef !== 'Chef 1'">
                @if (step.chef === 'Chef 1') {
                <img src="/assets/koch.svg" [alt]="step.chef" class="recipe-detail__chef-icon" />
                } @else {
                <img src="/assets/cook.svg" [alt]="step.chef" class="recipe-detail__chef-icon" />
                }
                {{ step.chef }}
              </span>
            </div>
            <p class="recipe-detail__step-desc">{{ step.description }}</p>
          </div>
          }
        </div>
      </section>

      <div class="recipe-detail__finish-prompt">
        <div class="recipe-detail__finish-text">
          <span class="recipe-detail__finish-title">Just finished this meal?</span>
          <span class="recipe-detail__finish-sub">Give it a heart, so that the others know this is delicious.</span>
        </div>
        <button type="button" class="recipe-detail__heart-action-btn" (click)="toggleFavorite()">
          <img [src]="isFavorite ? '/assets/green-heart.svg' : '/assets/heart.svg'" alt="Heart"
            class="recipe-detail__large-heart" />
        </button>
      </div>

    </div>

    <div class="recipe-detail__cookbook-promo">
      <span class="recipe-detail__promo-text">Find inspiration for your next culinary adventure!</span>
      <a routerLink="/cookbook" class="recipe-detail__promo-btn">Cookbook</a>
    </div>

    <footer class="recipe-detail__footer">
      <a routerLink="/generate" class="recipe-detail__generate-link">
        Generate new recipie
        <img src="/assets/back-arrow.svg" alt="Arrow" class="recipe-detail__arrow-icon" />
      </a>
    </footer>

  </main>
  }
</div>`, styles: ['/* src/app/features/recipes/recipe-detail/recipe-detail.scss */\n.recipe-detail-page {\n  min-height: 100vh;\n  background-color: #FFFFFF;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 48px;\n}\n.recipe-detail__navbar {\n  padding: 32px 64px 50px 64px;\n}\n.recipe-detail__header-container {\n  max-width: 1200px;\n  width: 100%;\n  display: flex;\n  align-items: start;\n  flex-direction: column;\n  gap: 24px;\n}\n.recipe-detail__logo-link {\n  display: inline-flex;\n  align-items: center;\n}\n.recipe-detail__logo {\n  height: 36px;\n}\n.recipe-detail__back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: #1E5515;\n  text-decoration: none;\n  transition: transform 150ms ease;\n}\n.recipe-detail__back-link:hover {\n  transform: translateX(-4px);\n}\n.recipe-detail__back-icon {\n  width: 20px;\n}\n.recipe-detail {\n  max-width: 1248px;\n  width: 100%;\n  margin: 0 auto;\n  padding: 0 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 36px;\n}\n.recipe-detail__outer-card {\n  background-color: #FAF5F0;\n  border: 3px solid #FAF0E6;\n  border-radius: 28px;\n  padding: 36px 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.recipe-detail__hero-card {\n  background-color: #F3E7DC;\n  border-radius: 20px;\n  padding: 28px 36px;\n  display: grid;\n  grid-template-columns: 1fr 340px;\n  gap: 40px;\n  align-items: center;\n}\n@media (max-width: 900px) {\n  .recipe-detail__hero-card {\n    grid-template-columns: 1fr;\n  }\n}\n.recipe-detail__hero-left {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.recipe-detail__time-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 600;\n  color: #396039;\n}\n.recipe-detail__clock-icon {\n  width: 20px;\n  height: 20px;\n}\n.recipe-detail__title {\n  font-family: "Quicksand";\n  font-size: 38px;\n  font-weight: 700;\n  color: #1E5515;\n  line-height: 1.15;\n  margin: 4px 0 8px 0;\n}\n.recipe-detail__person-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #1E5515;\n  flex-wrap: wrap;\n}\n.recipe-detail__chef-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 2px 4px;\n  border-radius: 6px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  color: #10310B;\n}\n.recipe-detail__chef-pill.chef-1 {\n  background-color: #D7DFD7;\n}\n.recipe-detail__chef-pill.chef-2 {\n  background-color: #FFD9B3;\n}\n.recipe-detail__chef-icon {\n  width: 25px;\n  height: 25px;\n}\n.recipe-detail__hero-right {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  align-items: start;\n}\n@media (max-width: 900px) {\n  .recipe-detail__hero-right {\n    align-items: flex-start;\n  }\n}\n.recipe-detail__tags {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.recipe-detail__tag {\n  background-color: #E4D8CC;\n  color: #10310B;\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 600;\n  padding: 6px 16px;\n  border-radius: 999px;\n}\n.recipe-detail__like-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background-color: #E4D8CC;\n  border: 1px solid #D8C8BA;\n  padding: 5px 14px;\n  border-radius: 999px;\n  cursor: pointer;\n  font-family: "Quicksand", sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: #10310B;\n  transition: transform 150ms ease;\n}\n.recipe-detail__like-btn:hover {\n  transform: scale(1.04);\n}\n.recipe-detail__like-icon {\n  width: 16px;\n  height: 16px;\n}\n.recipe-detail__nutrition {\n  width: 100%;\n}\n.recipe-detail__nutrition-title {\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  color: #555;\n  margin-bottom: 8px;\n}\n.recipe-detail__nutrition-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  text-align: left;\n}\n.recipe-detail__nutrition-col {\n  display: flex;\n  flex-direction: column;\n}\n.recipe-detail__nutrition-label {\n  font-family: "Quicksand", sans-serif;\n  font-size: 22px;\n  font-weight: 700;\n  color: #10310B;\n}\n.recipe-detail__nutrition-value {\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #333;\n}\n.recipe-detail__section {\n  display: flex;\n  flex-direction: column;\n  gap: 28px;\n}\n.recipe-detail__section-banner {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.recipe-detail__banner-deco {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.recipe-detail__banner-deco picture {\n  display: contents;\n}\n.recipe-detail__banner-deco img {\n  height: 48px;\n  width: auto;\n  object-fit: contain;\n}\n.recipe-detail__banner-deco img.deco-right {\n  width: 1152px;\n  height: 148px;\n  max-width: 100%;\n  object-fit: contain;\n}\n.recipe-detail__section-title {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-family: "Quicksand", sans-serif;\n  font-size: 32px;\n  font-weight: 600;\n  color: #1E5515;\n  margin: 0;\n  z-index: 2;\n  text-align: center;\n  pointer-events: none;\n}\n.recipe-detail__toggle-ingredients-btn {\n  display: none;\n}\n.recipe-detail__ingredients-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  padding: 0 180px;\n}\n@media (max-width: 768px) {\n  .recipe-detail__ingredients-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.recipe-detail__group-title {\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  color: #008000;\n  margin-bottom: 16px;\n}\n.recipe-detail__list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.recipe-detail__list-item {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #10310B;\n}\n.recipe-detail__bullet {\n  color: #10310B;\n  font-weight: 700;\n}\n.recipe-detail__amount {\n  min-width: 60px;\n  font-weight: 700;\n  color: #10310B;\n}\n.recipe-detail__name {\n  color: #333;\n}\n.recipe-detail__steps-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 28px;\n  padding: 0 100px;\n}\n@media (max-width: 768px) {\n  .recipe-detail__steps-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.recipe-detail__step-card {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.recipe-detail__step-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.recipe-detail__step-title {\n  font-family: "Quicksand";\n  font-size: 24px;\n  font-weight: 500;\n  color: #10310B;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.recipe-detail__step-number {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #FAF0E6;\n  border-radius: 50%;\n  min-width: 36px;\n  min-height: 36px;\n}\n.recipe-detail__step-desc {\n  font-family: "Quicksand", sans-serif;\n  font-size: 18px;\n  font-weight: 500;\n  color: #444;\n  line-height: 1.55;\n}\n.recipe-detail__finish-prompt {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n  font-family: "Quicksand";\n  font-size: 20px;\n  font-weight: 900;\n  color: #10310B;\n  flex-wrap: wrap;\n}\n.recipe-detail__finish-text {\n  display: contents;\n}\n.recipe-detail__finish-title {\n  font-weight: 900;\n}\n.recipe-detail__finish-sub {\n  font-weight: 500;\n  color: #555;\n  font-size: 16px;\n}\n.recipe-detail__heart-action-btn {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  transition: transform 150ms ease;\n}\n.recipe-detail__heart-action-btn:hover {\n  transform: scale(1.15);\n}\n.recipe-detail__large-heart {\n  width: 24px;\n  height: 24px;\n}\n.recipe-detail__cookbook-promo {\n  background-color: #D6E0D6;\n  border-radius: 16px;\n  padding: 24px 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 50px;\n}\n@media (max-width: 600px) {\n  .recipe-detail__cookbook-promo {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n}\n.recipe-detail__promo-text {\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  color: #10310B;\n}\n.recipe-detail__promo-btn {\n  background-color: #396039;\n  color: #FFFFFF;\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  padding: 12px 36px;\n  text-decoration: none;\n  transition: background-color 150ms ease, transform 150ms ease;\n}\n.recipe-detail__promo-btn:hover {\n  background-color: #2D4C2D;\n  transform: translateY(-2px);\n}\n.recipe-detail__footer {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.recipe-detail__generate-link {\n  font-family: "Quicksand", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  color: #396039;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: transform 150ms ease, opacity 150ms ease;\n}\n.recipe-detail__generate-link:hover {\n  opacity: 0.85;\n  transform: translateX(4px);\n}\n.recipe-detail__arrow-icon {\n  width: 24px;\n  rotate: 180deg;\n}\n@media (max-width: 980px) {\n  .recipe-detail__ingredients-grid {\n    padding: 0 100px;\n  }\n  .recipe-detail__step-title {\n    font-size: 20px;\n  }\n  .recipe-detail__steps-grid {\n    gap: 20px;\n    padding: 0px 0px;\n  }\n  .recipe-detail__outer-card {\n    padding: 36px 20px;\n  }\n  .recipe-detail {\n    padding: 0 15px;\n  }\n}\n@media (max-width: 425px) {\n  .recipe-detail__navbar {\n    padding: 20px 0px 50px 25px;\n  }\n  .recipe-detail__navbar span {\n    display: none;\n  }\n  .recipe-detail__ingredients-grid {\n    padding: 0;\n  }\n  .recipe-detail__step-title {\n    font-size: 18px;\n  }\n  .recipe-detail__hero-card {\n    padding: 20px 20px;\n  }\n  .recipe-detail__outer-card {\n    padding: 10px 8px;\n  }\n  .recipe-detail__title {\n    font-size: 24px;\n  }\n  .recipe-detail__nutrition-label {\n    font-size: 18px;\n  }\n  .recipe-detail__nutrition-value {\n    font-size: 18px;\n  }\n  .recipe-detail__tags {\n    order: 2;\n  }\n  .recipe-detail__nutrition {\n    order: 1;\n  }\n  .recipe-detail__list {\n    padding-left: 20px;\n  }\n  .recipe-detail__section-title {\n    font-size: 24px;\n  }\n  .recipe-detail__generate-link {\n    display: none;\n  }\n  .recipe-detail-page {\n    padding-bottom: 0;\n  }\n  .recipe-detail__banner-deco img.deco-right {\n    height: 90px;\n    width: auto;\n    max-width: 100%;\n  }\n  .recipe-detail__section-title {\n    display: none;\n  }\n}\n@media (max-width: 499px) {\n  .recipe-detail__banner-deco img.deco-right {\n    height: 90px;\n    width: auto;\n    max-width: 100%;\n  }\n  .recipe-detail__ingredients-grid {\n    padding: 0;\n  }\n  .recipe-detail__toggle-ingredients-btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    align-self: center;\n    border-radius: 999px;\n    padding: 8px 18px;\n    font-family: "Quicksand", sans-serif;\n    font-size: 15px;\n    font-weight: 700;\n    color: #10310B;\n    cursor: pointer;\n    transition: background-color 150ms ease, transform 150ms ease;\n  }\n  .recipe-detail__toggle-ingredients-btn:hover {\n    border: 1px solid rgba(57, 96, 57, 0.5019607843);\n  }\n  .recipe-detail__toggle-ingredients-btn:active {\n    transform: scale(0.97);\n  }\n  .recipe-detail__toggle-arrow {\n    width: 14px;\n    height: 8px;\n    border-radius: 50%;\n    transform: rotate(180deg);\n    transition: transform 0.2s ease;\n  }\n  .recipe-detail__toggle-arrow.is-open {\n    transform: rotate(0deg);\n  }\n  .recipe-detail__ingredients-grid.is-collapsed {\n    display: none;\n  }\n  .recipe-detail__finish-prompt {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    border-radius: 20px;\n    padding: 20px;\n    margin-top: 24px;\n    gap: 16px;\n    background-color: transparent;\n  }\n  .recipe-detail__finish-text {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    text-align: left;\n    flex: 1;\n  }\n  .recipe-detail__finish-title {\n    font-family: "Quicksand", sans-serif;\n    font-size: 20px;\n    font-weight: 700;\n    color: #10310B;\n    line-height: 1.25;\n  }\n  .recipe-detail__finish-sub {\n    font-family: "Quicksand", sans-serif;\n    font-size: 15px;\n    font-weight: 500;\n    color: #10310B;\n    line-height: 1.35;\n  }\n  .recipe-detail__heart-action-btn {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n  }\n  .recipe-detail__large-heart {\n    width: 36px;\n    height: 36px;\n  }\n  .recipe-detail__cookbook-promo {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #D6E0D6;\n    border-radius: 20px;\n    padding: 16px 20px;\n    margin-top: 20px;\n    gap: 16px;\n    text-align: left;\n  }\n  .recipe-detail__promo-text {\n    font-family: "Quicksand", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    color: #10310B;\n    line-height: 1.3;\n    max-width: 62%;\n    margin: 0;\n  }\n  .recipe-detail__promo-btn {\n    flex-shrink: 0;\n    background-color: #396039;\n    color: #FFFFFF;\n    font-family: "Quicksand", sans-serif;\n    font-size: 16px;\n    font-weight: 600;\n    padding: 12px 20px;\n    text-decoration: none;\n    text-align: center;\n    white-space: nowrap;\n  }\n  .recipe-detail__generate-link {\n    display: none;\n  }\n}\n@media (max-width: 375px) {\n  .recipe-detail__nutrition-grid {\n    gap: 0;\n    align-items: center;\n  }\n}\n/*# sourceMappingURL=recipe-detail.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RecipeDetail, { className: "RecipeDetail", filePath: "src/app/features/recipes/recipe-detail/recipe-detail.ts", lineNumber: 13 });
})();
export {
  RecipeDetail
};
//# sourceMappingURL=chunk-7D6XD4BL.js.map
