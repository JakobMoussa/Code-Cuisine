import {
  Component,
  RouterLink,
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
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-APPJTXDK.js";

// src/app/features/cookbook/cookbook.ts
var _c0 = (a0) => ["/recipe", a0];
var _c1 = (a0) => ["/cuisine", a0];
var _forTrack0 = ($index, $item) => $item.id;
function Cookbook_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 18)(1, "div", 25)(2, "div", 26);
    \u0275\u0275element(3, "img", 27);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 28);
    \u0275\u0275element(7, "img", 29);
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "h3", 30);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const recipe_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c0, recipe_r1.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Cooking time: ", recipe_r1.cookingTime);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(recipe_r1.likes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(recipe_r1.title);
  }
}
function Cookbook_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 21)(1, "h2", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33);
    \u0275\u0275element(6, "img", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cuisine_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", cuisine_r2.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cuisine_r2.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", cuisine_r2.image, \u0275\u0275sanitizeUrl)("alt", cuisine_r2.name)("routerLink", \u0275\u0275pureFunction1(5, _c1, cuisine_r2.id.toLowerCase()));
  }
}
var Cookbook = class _Cookbook {
  mostLikedRecipes = [
    {
      id: "1",
      title: "Pasta with spinach and cherry tomatoes",
      cookingTime: "20min",
      likes: 66
    },
    {
      id: "2",
      title: "Low Carb Vegan No-Bake Paleo Bars",
      cookingTime: "35min",
      likes: 57
    },
    {
      id: "3",
      title: "Schnitzel with Warm Potato Salad",
      cookingTime: "45min",
      likes: 42
    },
    {
      id: "4",
      title: "Gourmet Truffle Mushroom Risotto",
      cookingTime: "30min",
      likes: 89
    }
  ];
  cuisines = [
    {
      id: "italian",
      name: "Italian cuisine",
      emoji: "\u{1F90C}",
      image: "/assets/1.recipe.png"
    },
    {
      id: "german",
      name: "German cuisine",
      emoji: "\u{1F968}",
      image: "/assets/2.recipe.png"
    },
    {
      id: "japanese",
      name: "Japanese cuisine",
      emoji: "\u{1F962}",
      image: "/assets/3.recipe.png"
    },
    {
      id: "gourmet",
      name: "Gourmet cuisine",
      emoji: "\u{1F377}",
      image: "/assets/4.recipe.png"
    },
    {
      id: "indian",
      name: "Indian cuisine",
      emoji: "\u{1F371}",
      image: "/assets/5.recipe.png"
    },
    {
      id: "fusion",
      name: "Fusion cuisine",
      emoji: "\u{1F371}",
      image: "/assets/6.recipe.png"
    }
  ];
  static \u0275fac = function Cookbook_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Cookbook)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Cookbook, selectors: [["app-cookbook"]], decls: 33, vars: 0, consts: [[1, "cookbook-page"], [1, "cookbook-header"], ["routerLink", "/", "id", "cookbook-logo", 1, "cookbook-header__logo-link"], ["src", "/assets/logo-green.svg", "alt", "Code \xE0 Cuisine Logo", 1, "cookbook-header__logo"], ["routerLink", "/", "id", "cookbook-back-btn", 1, "cookbook-header__back-btn"], [1, "cookbook-header__back-arrow"], ["src", "/assets/back-arrow.svg", "alt", "arrow", 1, "back-arrow"], [1, "cookbook-header__back-text"], [1, "cookbook-main"], ["id", "cookbook-hero-section", 1, "cookbook-hero"], [1, "cookbook-hero__left"], [1, "cookbook-hero__title"], [1, "cookbook-hero__description"], [1, "cookbook-hero__right"], [1, "cookbook-hero__recipes-header"], [1, "cookbook-hero__recipes-title"], ["src", "/assets/heart.svg", 1, "cookbook-hero__heart-icon"], ["id", "cookbook-cards-scroll", 1, "cookbook-hero__cards-scroll"], [1, "recipe-card", 2, "cursor", "pointer", 3, "routerLink"], ["id", "cookbook-cuisines-section", 1, "cookbook-cuisines"], [1, "cookbook-cuisines__grid"], [1, "cuisine-card"], [1, "footer__section"], [1, "footer__text"], ["src", "/assets/back-arrow.svg", "alt", "Back Arrow", 1, "footer__back-arrow"], [1, "recipe-card__meta"], [1, "recipe-card__time"], ["src", "/assets/schedule.svg", "alt", "Clock", 1, "recipe-card__time-icon"], [1, "recipe-card__badge"], ["src", "/assets/smallheart.svg", "alt", "Heart", 1, "recipe-card__heart-icon"], [1, "recipe-card__title"], [1, "cuisine-card__title"], [1, "cuisine-card__emoji"], [1, "cuisine-card__image-wrapper"], [1, "cuisine-card__image", 2, "cursor", "pointer", 3, "src", "alt", "routerLink"]], template: function Cookbook_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 4)(5, "span", 5);
      \u0275\u0275element(6, "img", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 7);
      \u0275\u0275text(8, "Back");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "main", 8)(10, "section", 9)(11, "div", 10)(12, "h1", 11);
      \u0275\u0275text(13, "Cookbook");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p", 12);
      \u0275\u0275text(15, " From quick bites to gourmet delights, explore them all in our ultimate cookbook and get inspired for your next culinary adventure. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 13)(17, "div", 14)(18, "h2", 15);
      \u0275\u0275text(19, "Most liked recipes");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "img", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 17);
      \u0275\u0275repeaterCreate(22, Cookbook_For_23_Template, 12, 6, "article", 18, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "section", 19)(25, "div", 20);
      \u0275\u0275repeaterCreate(26, Cookbook_For_27_Template, 7, 7, "article", 21, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "footer")(29, "div", 22)(30, "span", 23);
      \u0275\u0275text(31, "Generate new recipie");
      \u0275\u0275elementEnd();
      \u0275\u0275element(32, "img", 24);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275repeater(ctx.mostLikedRecipes);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.cuisines);
    }
  }, dependencies: [RouterLink], styles: ['\n.cookbook-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--color-white, #ffffff);\n  padding: 32px 48px 64px 48px;\n  max-width: 1440px;\n  margin: 0 auto;\n}\n.cookbook-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 28px;\n}\n.cookbook-header__logo-link[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n.cookbook-header__logo[_ngcontent-%COMP%] {\n  height: 44px;\n  width: auto;\n}\n.cookbook-header__back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: #1E5515;\n  font-size: 16px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.cookbook-header__back-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateX(-3px);\n}\n.cookbook-header__back-arrow[_ngcontent-%COMP%] {\n  width: 20px;\n  line-height: 1;\n}\n.cookbook-hero[_ngcontent-%COMP%] {\n  background-color: #f4f7f3;\n  border-radius: 28px;\n  padding: 40px 25px;\n  display: grid;\n  grid-template-columns: 1fr 1.9fr;\n  align-items: center;\n  margin-bottom: 48px;\n}\n@media (max-width: 1024px) {\n  .cookbook-hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 32px 24px;\n    gap: 32px;\n  }\n}\n.cookbook-hero__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.cookbook-hero__title[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 64px;\n  font-weight: 700;\n  color: #1E5515;\n  line-height: 1.1;\n  margin-bottom: 20px;\n}\n.cookbook-hero__description[_ngcontent-%COMP%] {\n  font-size: 24px;\n  line-height: 1.1;\n  color: #10310B;\n  max-width: 440px;\n  font-weight: 500;\n}\n.cookbook-hero__right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.cookbook-hero__recipes-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.cookbook-hero__recipes-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1E5515;\n}\n.cookbook-hero__heart-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 26px;\n}\n.cookbook-hero__cards-scroll[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: thin;\n  scrollbar-color: #ccd7c8 transparent;\n}\n.cookbook-hero__cards-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 6px;\n}\n.cookbook-hero__cards-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.cookbook-hero__cards-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #ccd7c8;\n  border-radius: 999px;\n}\n.recipe-card[_ngcontent-%COMP%] {\n  flex: 0 0 370px;\n  scroll-snap-align: start;\n  background-color: #e3ece1;\n  border-radius: 18px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 130px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.recipe-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);\n}\n.recipe-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.recipe-card__time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 16px;\n  color: #4a6348;\n  font-weight: 500;\n}\n.recipe-card__time-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  opacity: 0.8;\n}\n.recipe-card__badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: #10310B;\n  background-color: rgba(57, 96, 57, 0.3019607843);\n  font-size: 16px;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 999px;\n}\n.recipe-card__heart-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 14px;\n}\n.recipe-card__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-dark-green, #10310b);\n  line-height: 1.35;\n  margin: 0;\n}\n.cookbook-cuisines__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n}\n@media (max-width: 1024px) {\n  .cookbook-cuisines__grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .cookbook-cuisines__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.cuisine-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.cuisine-card__title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-dark-green, #10310b);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n.cuisine-card__emoji[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.cuisine-card__image-wrapper[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n.cuisine-card__image[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.cuisine-card__image[_ngcontent-%COMP%]:hover {\n  transform: scale(1.03);\n}\n.footer__section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  margin-top: 50px;\n  gap: 8px;\n  margin-right: 40px;\n}\n.footer__text[_ngcontent-%COMP%] {\n  font-size: 20px;\n  cursor: pointer;\n}\n.footer__back-arrow[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  cursor: pointer;\n}\n.footer__back-arrow[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateX(-10px);\n  transform: rotate(180deg);\n}\n/*# sourceMappingURL=cookbook.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Cookbook, [{
    type: Component,
    args: [{ selector: "app-cookbook", imports: [RouterLink], template: `<div class="cookbook-page">
    <header class="cookbook-header">
        <a routerLink="/" class="cookbook-header__logo-link" id="cookbook-logo">
            <img src="/assets/logo-green.svg" alt="Code \xE0 Cuisine Logo" class="cookbook-header__logo" />
        </a>
        <a routerLink="/" class="cookbook-header__back-btn" id="cookbook-back-btn">
            <span class="cookbook-header__back-arrow"><img class="back-arrow" src="/assets/back-arrow.svg"
                    alt="arrow"></span>
            <span class="cookbook-header__back-text">Back</span>
        </a>
    </header>

    <main class="cookbook-main">
        <section class="cookbook-hero" id="cookbook-hero-section">
            <div class="cookbook-hero__left">
                <h1 class="cookbook-hero__title">Cookbook</h1>
                <p class="cookbook-hero__description">
                    From quick bites to gourmet delights, explore them all in our ultimate
                    cookbook and get inspired for your next culinary adventure.
                </p>
            </div>

            <div class="cookbook-hero__right">
                <div class="cookbook-hero__recipes-header">
                    <h2 class="cookbook-hero__recipes-title">Most liked recipes</h2>
                    <img class="cookbook-hero__heart-icon" src="/assets/heart.svg">
                </div>

                <div class="cookbook-hero__cards-scroll" id="cookbook-cards-scroll">
                    @for (recipe of mostLikedRecipes; track recipe.id) {
                    <article class="recipe-card" [routerLink]="['/recipe', recipe.id]" style="cursor: pointer;">
                        <div class="recipe-card__meta">
                            <div class="recipe-card__time">
                                <img src="/assets/schedule.svg" alt="Clock" class="recipe-card__time-icon" />
                                <span>Cooking time: {{ recipe.cookingTime }}</span>
                            </div>
                            <div class="recipe-card__badge">
                                <img class="recipe-card__heart-icon" src="/assets/smallheart.svg" alt="Heart">
                                <span>{{ recipe.likes }}</span>
                            </div>
                        </div>
                        <h3 class="recipe-card__title">{{ recipe.title }}</h3>
                    </article>
                    }
                </div>
            </div>
        </section>

        <section class="cookbook-cuisines" id="cookbook-cuisines-section">
            <div class="cookbook-cuisines__grid">
                @for (cuisine of cuisines; track cuisine.id) {
                <article class="cuisine-card">
                    <h2 class="cuisine-card__title">
                        {{ cuisine.name }}
                        <span class="cuisine-card__emoji">{{ cuisine.emoji }}</span>
                    </h2>
                    <div class="cuisine-card__image-wrapper">
                        <img [src]="cuisine.image" [alt]="cuisine.name" class="cuisine-card__image"
                            [routerLink]="['/cuisine', cuisine.id.toLowerCase()]"
                            style="cursor: pointer;" />
                    </div>
                </article>
                }
            </div>
        </section>
        <footer>
            <div class="footer__section">
                <span class="footer__text">Generate new recipie</span>
                <img class="footer__back-arrow" src="/assets/back-arrow.svg" alt="Back Arrow">
            </div>
        </footer>
    </main>
</div>`, styles: ['/* src/app/features/cookbook/cookbook.scss */\n.cookbook-page {\n  min-height: 100vh;\n  background-color: var(--color-white, #ffffff);\n  padding: 32px 48px 64px 48px;\n  max-width: 1440px;\n  margin: 0 auto;\n}\n.cookbook-header {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 28px;\n}\n.cookbook-header__logo-link {\n  display: inline-block;\n}\n.cookbook-header__logo {\n  height: 44px;\n  width: auto;\n}\n.cookbook-header__back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: #1E5515;\n  font-size: 16px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.cookbook-header__back-btn:hover {\n  opacity: 0.9;\n  transform: translateX(-3px);\n}\n.cookbook-header__back-arrow {\n  width: 20px;\n  line-height: 1;\n}\n.cookbook-hero {\n  background-color: #f4f7f3;\n  border-radius: 28px;\n  padding: 40px 25px;\n  display: grid;\n  grid-template-columns: 1fr 1.9fr;\n  align-items: center;\n  margin-bottom: 48px;\n}\n@media (max-width: 1024px) {\n  .cookbook-hero {\n    grid-template-columns: 1fr;\n    padding: 32px 24px;\n    gap: 32px;\n  }\n}\n.cookbook-hero__left {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.cookbook-hero__title {\n  font-family: "Quicksand";\n  font-size: 64px;\n  font-weight: 700;\n  color: #1E5515;\n  line-height: 1.1;\n  margin-bottom: 20px;\n}\n.cookbook-hero__description {\n  font-size: 24px;\n  line-height: 1.1;\n  color: #10310B;\n  max-width: 440px;\n  font-weight: 500;\n}\n.cookbook-hero__right {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.cookbook-hero__recipes-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.cookbook-hero__recipes-title {\n  font-size: 24px;\n  font-weight: 600;\n  color: #1E5515;\n}\n.cookbook-hero__heart-icon {\n  width: 28px;\n  height: 26px;\n}\n.cookbook-hero__cards-scroll {\n  display: flex;\n  gap: 16px;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: thin;\n  scrollbar-color: #ccd7c8 transparent;\n}\n.cookbook-hero__cards-scroll::-webkit-scrollbar {\n  height: 6px;\n}\n.cookbook-hero__cards-scroll::-webkit-scrollbar-track {\n  background: transparent;\n}\n.cookbook-hero__cards-scroll::-webkit-scrollbar-thumb {\n  background: #ccd7c8;\n  border-radius: 999px;\n}\n.recipe-card {\n  flex: 0 0 370px;\n  scroll-snap-align: start;\n  background-color: #e3ece1;\n  border-radius: 18px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  min-height: 130px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.recipe-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);\n}\n.recipe-card__meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.recipe-card__time {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 16px;\n  color: #4a6348;\n  font-weight: 500;\n}\n.recipe-card__time-icon {\n  width: 16px;\n  height: 16px;\n  opacity: 0.8;\n}\n.recipe-card__badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: #10310B;\n  background-color: rgba(57, 96, 57, 0.3019607843);\n  font-size: 16px;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 999px;\n}\n.recipe-card__heart-icon {\n  width: 16px;\n  height: 14px;\n}\n.recipe-card__title {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--color-dark-green, #10310b);\n  line-height: 1.35;\n  margin: 0;\n}\n.cookbook-cuisines__grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n}\n@media (max-width: 1024px) {\n  .cookbook-cuisines__grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .cookbook-cuisines__grid {\n    grid-template-columns: 1fr;\n  }\n}\n.cuisine-card {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.cuisine-card__title {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--color-dark-green, #10310b);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n.cuisine-card__emoji {\n  font-size: 22px;\n}\n.cuisine-card__image-wrapper {\n  overflow: hidden;\n}\n.cuisine-card__image {\n  width: 400px;\n  height: 400px;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.cuisine-card__image:hover {\n  transform: scale(1.03);\n}\n.footer__section {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  margin-top: 50px;\n  gap: 8px;\n  margin-right: 40px;\n}\n.footer__text {\n  font-size: 20px;\n  cursor: pointer;\n}\n.footer__back-arrow {\n  transform: rotate(180deg);\n  cursor: pointer;\n}\n.footer__back-arrow:hover {\n  opacity: 0.9;\n  transform: translateX(-10px);\n  transform: rotate(180deg);\n}\n/*# sourceMappingURL=cookbook.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Cookbook, { className: "Cookbook", filePath: "src/app/features/cookbook/cookbook.ts", lineNumber: 24 });
})();
export {
  Cookbook
};
//# sourceMappingURL=chunk-QTBK5LUR.js.map
