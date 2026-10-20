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
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-APPJTXDK.js";

// src/app/features/indian-cuisine/indian-cuisine.ts
var _c0 = (a0) => ["/recipe", a0];
var _forTrack0 = ($index, $item) => $item.number;
function IndianCuisine_For_20_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tag_r1);
  }
}
function IndianCuisine_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 16)(1, "div", 23)(2, "div", 24);
    \u0275\u0275element(3, "img", 25);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 26)(7, "span", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h2", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 29);
    \u0275\u0275repeaterCreate(12, IndianCuisine_For_20_For_13_Template, 2, 1, "span", 30, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(14, "span", 31);
    \u0275\u0275element(15, "img", 32);
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const recipe_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c0, recipe_r2.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Cooking time: ", recipe_r2.cookingTime);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", recipe_r2.number, ".");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(recipe_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(recipe_r2.tags);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(recipe_r2.likes);
  }
}
var IndianCuisine = class _IndianCuisine {
  recipes = [
    {
      id: "1",
      number: 1,
      title: "Butter Chicken",
      cookingTime: "40min",
      tags: ["Classic"],
      likes: 95
    },
    {
      id: "2",
      number: 2,
      title: "Chicken Tikka Masala",
      cookingTime: "45min",
      tags: ["Classic"],
      likes: 92
    },
    {
      id: "3",
      number: 3,
      title: "Palak Paneer",
      cookingTime: "35min",
      tags: ["Vegetarian", "Quick"],
      likes: 78
    },
    {
      id: "4",
      number: 4,
      title: "Chana Masala",
      cookingTime: "30min",
      tags: ["Vegetarian", "Quick"],
      likes: 71
    },
    {
      id: "5",
      number: 5,
      title: "Biryani",
      cookingTime: "60min",
      tags: ["Traditional"],
      likes: 98
    },
    {
      id: "6",
      number: 6,
      title: "Dal Tadka",
      cookingTime: "25min",
      tags: ["Vegetarian", "Quick"],
      likes: 69
    },
    {
      id: "7",
      number: 7,
      title: "Samosas",
      cookingTime: "45min",
      tags: ["Vegetarian"],
      likes: 83
    },
    {
      id: "8",
      number: 8,
      title: "Naan Bread with Garlic",
      cookingTime: "20min",
      tags: ["Vegetarian", "Quick"],
      likes: 88
    },
    {
      id: "9",
      number: 9,
      title: "Aloo Gobi",
      cookingTime: "30min",
      tags: ["Vegetarian", "Quick"],
      likes: 62
    },
    {
      id: "10",
      number: 10,
      title: "Rogan Josh",
      cookingTime: "75min",
      tags: ["Traditional"],
      likes: 76
    },
    {
      id: "11",
      number: 11,
      title: "Malai Kofta",
      cookingTime: "50min",
      tags: ["Vegetarian"],
      likes: 74
    },
    {
      id: "12",
      number: 12,
      title: "Vegetable Korma",
      cookingTime: "35min",
      tags: ["Vegetarian", "Quick"],
      likes: 67
    },
    {
      id: "13",
      number: 13,
      title: "Paneer Butter Masala",
      cookingTime: "35min",
      tags: ["Vegetarian", "Quick"],
      likes: 84
    },
    {
      id: "14",
      number: 14,
      title: "Chicken Vindaloo",
      cookingTime: "50min",
      tags: ["Spicy"],
      likes: 73
    }
  ];
  static \u0275fac = function IndianCuisine_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IndianCuisine)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _IndianCuisine, selectors: [["app-indian-cuisine"]], decls: 36, vars: 0, consts: [[1, "indian-page"], [1, "indian-header"], [1, "indian-header__left"], ["routerLink", "/", "id", "indian-logo", 1, "indian-header__logo-link"], ["src", "/assets/logo-green.svg", "alt", "Code \xE0 Cuisine Logo", 1, "indian-header__logo"], ["routerLink", "/cookbook", "id", "indian-back-btn", 1, "indian-header__back-btn"], [1, "indian-header__back-arrow"], ["src", "/assets/back-arrow.svg", "alt", "arrow", 1, "back-arrow"], [1, "indian-header__back-text"], [1, "indian-header__right"], ["routerLink", "/generate", "id", "indian-generate-btn", 1, "indian-header__generate-btn"], [1, "indian-main"], ["id", "indian-banner-section", 1, "indian-banner"], ["src", "/assets/Indian-food.png", "alt", "Indian food banner", 1, "indian-banner__image"], [1, "indian-banner__title"], ["id", "indian-recipes-section", 1, "indian-recipes"], [1, "recipe-row", 3, "routerLink"], ["aria-label", "Recipes pagination", 1, "indian-pagination"], [1, "indian-pagination__arrow", "indian-pagination__arrow--disabled"], [1, "indian-pagination__item", "indian-pagination__item--active"], [1, "indian-pagination__item"], [1, "indian-pagination__ellipsis"], [1, "indian-pagination__arrow"], [1, "recipe-row__left"], [1, "recipe-row__time"], ["src", "/assets/schedule.svg", "alt", "Clock", 1, "recipe-row__time-icon"], [1, "recipe-row__title-group"], [1, "recipe-row__number"], [1, "recipe-row__title"], [1, "recipe-row__right"], [1, "recipe-row__tag"], [1, "recipe-row__likes"], ["src", "/assets/smallheart.svg", "alt", "Heart", 1, "recipe-row__heart-icon"]], template: function IndianCuisine_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "a", 5)(6, "span", 6);
      \u0275\u0275element(7, "img", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 8);
      \u0275\u0275text(9, "Cookbook");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "div", 9)(11, "a", 10);
      \u0275\u0275text(12, " Generate a recipe ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "main", 11)(14, "section", 12);
      \u0275\u0275element(15, "img", 13);
      \u0275\u0275elementStart(16, "h1", 14);
      \u0275\u0275text(17, "Indian cuisine");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "section", 15);
      \u0275\u0275repeaterCreate(19, IndianCuisine_For_20_Template, 18, 7, "article", 16, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "nav", 17)(22, "span", 18);
      \u0275\u0275text(23, "<");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 19);
      \u0275\u0275text(25, "1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 20);
      \u0275\u0275text(27, "2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 20);
      \u0275\u0275text(29, "3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 21);
      \u0275\u0275text(31, "...");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span", 20);
      \u0275\u0275text(33, "8");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 22);
      \u0275\u0275text(35, ">");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275repeater(ctx.recipes);
    }
  }, dependencies: [RouterLink], styles: ['\n.indian-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--color-white, #ffffff);\n  padding: 32px 48px 64px 48px;\n  max-width: 1440px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .indian-page[_ngcontent-%COMP%] {\n    padding: 20px 20px 40px 20px;\n  }\n}\n.indian-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 32px;\n}\n.indian-header__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n}\n.indian-header__logo-link[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n.indian-header__logo[_ngcontent-%COMP%] {\n  height: 44px;\n  width: auto;\n}\n.indian-header__back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: #1e5515;\n  font-size: 16px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.indian-header__back-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n  transform: translateX(-3px);\n}\n.indian-header__back-arrow[_ngcontent-%COMP%] {\n  width: 20px;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n}\n.indian-header__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: end;\n}\n.indian-header__generate-btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  background-color: #355633;\n  color: #FAF0E6;\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  padding: 14px 28px;\n  margin-right: 110px;\n  margin-bottom: 30px;\n  text-decoration: none;\n  transition:\n    background-color 0.2s ease,\n    transform 0.15s ease,\n    box-shadow 0.2s ease;\n}\n.indian-header__generate-btn[_ngcontent-%COMP%]:hover {\n  background-color: #055E05;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(53, 86, 51, 0.25);\n}\n.indian-banner[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  margin-bottom: 48px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.indian-banner__image[_ngcontent-%COMP%] {\n  width: 1145px;\n  max-height: 144px;\n  object-fit: contain;\n  display: block;\n}\n.indian-banner__title[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-family: "Quicksand", sans-serif;\n  font-size: 40px;\n  font-weight: 700;\n  color: #1e5515;\n  text-align: center;\n  margin: 0;\n  white-space: nowrap;\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .indian-banner__title[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n}\n@media (max-width: 480px) {\n  .indian-banner__title[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n}\n.indian-recipes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  max-width: 1000px;\n  margin: 0 auto 56px auto;\n}\n.recipe-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding: 10px 16px;\n  border-radius: 12px;\n  transition: background-color 0.2s ease, transform 0.15s ease;\n  cursor: pointer;\n}\n.recipe-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(250, 240, 230, 0.6980392157);\n  transform: translateX(3px);\n}\n@media (max-width: 640px) {\n  .recipe-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n}\n.recipe-row__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.recipe-row__time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #738a71;\n  font-size: 16px;\n  font-weight: 500;\n  margin-left: 35px;\n}\n.recipe-row__time-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  opacity: 0.8;\n}\n.recipe-row__title-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.recipe-row__number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: #efe9dc;\n  color: #1e5515;\n  font-size: 15px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.recipe-row__title[_ngcontent-%COMP%] {\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e5515;\n  margin: 0;\n  line-height: 1.3;\n}\n@media (max-width: 640px) {\n  .recipe-row__title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n.recipe-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.recipe-row__tag[_ngcontent-%COMP%] {\n  background-color: #d7e1d6;\n  color: #10310b;\n  font-size: 18px;\n  font-weight: 500;\n  padding: 6px 18px;\n  border-radius: 999px;\n  line-height: 1;\n}\n.recipe-row__likes[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background-color: #d7e1d6;\n  color: #10310b;\n  font-size: 15px;\n  font-weight: 600;\n  padding: 6px 14px;\n  border-radius: 999px;\n  line-height: 1;\n}\n.recipe-row__heart-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 14px;\n}\n.indian-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  color: #4a6348;\n  font-size: 16px;\n  font-weight: 600;\n  font-family: "Quicksand", sans-serif;\n  margin-top: 32px;\n}\n.indian-pagination__item[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.indian-pagination__item[_ngcontent-%COMP%]:hover {\n  color: #1e5515;\n}\n.indian-pagination__item--active[_ngcontent-%COMP%] {\n  color: #1e5515;\n  font-weight: 700;\n}\n.indian-pagination__ellipsis[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\n.indian-pagination__arrow[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  font-weight: 700;\n  transition: color 0.2s ease;\n}\n.indian-pagination__arrow[_ngcontent-%COMP%]:hover:not(.indian-pagination__arrow--disabled) {\n  color: #1e5515;\n}\n.indian-pagination__arrow--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: default;\n}\n/*# sourceMappingURL=indian-cuisine.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IndianCuisine, [{
    type: Component,
    args: [{ selector: "app-indian-cuisine", standalone: true, imports: [RouterLink], template: `<div class="indian-page">
    <header class="indian-header">
        <div class="indian-header__left">
            <a routerLink="/" class="indian-header__logo-link" id="indian-logo">
                <img src="/assets/logo-green.svg" alt="Code \xE0 Cuisine Logo" class="indian-header__logo" />
            </a>
            <a routerLink="/cookbook" class="indian-header__back-btn" id="indian-back-btn">
                <span class="indian-header__back-arrow">
                    <img class="back-arrow" src="/assets/back-arrow.svg" alt="arrow">
                </span>
                <span class="indian-header__back-text">Cookbook</span>
            </a>
        </div>
    </header>
    <div class="indian-header__right">
        <a routerLink="/generate" class="indian-header__generate-btn" id="indian-generate-btn">
            Generate a recipe
        </a>
    </div>

    <main class="indian-main">
        <section class="indian-banner" id="indian-banner-section">
            <img src="/assets/Indian-food.png" alt="Indian food banner" class="indian-banner__image" />
            <h1 class="indian-banner__title">Indian cuisine</h1>
        </section>

        <section class="indian-recipes" id="indian-recipes-section">
            @for (recipe of recipes; track recipe.number) {
            <article class="recipe-row" [routerLink]="['/recipe', recipe.id]">
                <div class="recipe-row__left">
                    <div class="recipe-row__time">
                        <img src="/assets/schedule.svg" alt="Clock" class="recipe-row__time-icon" />
                        <span>Cooking time: {{ recipe.cookingTime }}</span>
                    </div>
                    <div class="recipe-row__title-group">
                        <span class="recipe-row__number">{{ recipe.number }}.</span>
                        <h2 class="recipe-row__title">{{ recipe.title }}</h2>
                    </div>
                </div>

                <div class="recipe-row__right">
                    @for (tag of recipe.tags; track tag) {
                    <span class="recipe-row__tag">{{ tag }}</span>
                    }
                    <span class="recipe-row__likes">
                        <img src="/assets/smallheart.svg" alt="Heart" class="recipe-row__heart-icon" />
                        <span>{{ recipe.likes }}</span>
                    </span>
                </div>
            </article>
            }
        </section>

        <nav class="indian-pagination" aria-label="Recipes pagination">
            <span class="indian-pagination__arrow indian-pagination__arrow--disabled">&lt;</span>
            <span class="indian-pagination__item indian-pagination__item--active">1</span>
            <span class="indian-pagination__item">2</span>
            <span class="indian-pagination__item">3</span>
            <span class="indian-pagination__ellipsis">...</span>
            <span class="indian-pagination__item">8</span>
            <span class="indian-pagination__arrow">&gt;</span>
        </nav>
    </main>
</div>
`, styles: ['/* src/app/features/indian-cuisine/indian-cuisine.scss */\n.indian-page {\n  min-height: 100vh;\n  background-color: var(--color-white, #ffffff);\n  padding: 32px 48px 64px 48px;\n  max-width: 1440px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .indian-page {\n    padding: 20px 20px 40px 20px;\n  }\n}\n.indian-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 32px;\n}\n.indian-header__left {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n}\n.indian-header__logo-link {\n  display: inline-block;\n}\n.indian-header__logo {\n  height: 44px;\n  width: auto;\n}\n.indian-header__back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: #1e5515;\n  font-size: 16px;\n  font-weight: 500;\n  text-decoration: none;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.indian-header__back-btn:hover {\n  opacity: 0.85;\n  transform: translateX(-3px);\n}\n.indian-header__back-arrow {\n  width: 20px;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n}\n.indian-header__right {\n  display: flex;\n  align-items: center;\n  justify-content: end;\n}\n.indian-header__generate-btn {\n  display: inline-block;\n  background-color: #355633;\n  color: #FAF0E6;\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  padding: 14px 28px;\n  margin-right: 110px;\n  margin-bottom: 30px;\n  text-decoration: none;\n  transition:\n    background-color 0.2s ease,\n    transform 0.15s ease,\n    box-shadow 0.2s ease;\n}\n.indian-header__generate-btn:hover {\n  background-color: #055E05;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(53, 86, 51, 0.25);\n}\n.indian-banner {\n  position: relative;\n  width: 100%;\n  margin-bottom: 48px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.indian-banner__image {\n  width: 1145px;\n  max-height: 144px;\n  object-fit: contain;\n  display: block;\n}\n.indian-banner__title {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-family: "Quicksand", sans-serif;\n  font-size: 40px;\n  font-weight: 700;\n  color: #1e5515;\n  text-align: center;\n  margin: 0;\n  white-space: nowrap;\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .indian-banner__title {\n    font-size: 28px;\n  }\n}\n@media (max-width: 480px) {\n  .indian-banner__title {\n    font-size: 22px;\n  }\n}\n.indian-recipes {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  max-width: 1000px;\n  margin: 0 auto 56px auto;\n}\n.recipe-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding: 10px 16px;\n  border-radius: 12px;\n  transition: background-color 0.2s ease, transform 0.15s ease;\n  cursor: pointer;\n}\n.recipe-row:hover {\n  background-color: rgba(250, 240, 230, 0.6980392157);\n  transform: translateX(3px);\n}\n@media (max-width: 640px) {\n  .recipe-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n}\n.recipe-row__left {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.recipe-row__time {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: #738a71;\n  font-size: 16px;\n  font-weight: 500;\n  margin-left: 35px;\n}\n.recipe-row__time-icon {\n  width: 16px;\n  height: 16px;\n  opacity: 0.8;\n}\n.recipe-row__title-group {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.recipe-row__number {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: #efe9dc;\n  color: #1e5515;\n  font-size: 15px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.recipe-row__title {\n  font-family: "Quicksand", sans-serif;\n  font-size: 24px;\n  font-weight: 600;\n  color: #1e5515;\n  margin: 0;\n  line-height: 1.3;\n}\n@media (max-width: 640px) {\n  .recipe-row__title {\n    font-size: 18px;\n  }\n}\n.recipe-row__right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.recipe-row__tag {\n  background-color: #d7e1d6;\n  color: #10310b;\n  font-size: 18px;\n  font-weight: 500;\n  padding: 6px 18px;\n  border-radius: 999px;\n  line-height: 1;\n}\n.recipe-row__likes {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background-color: #d7e1d6;\n  color: #10310b;\n  font-size: 15px;\n  font-weight: 600;\n  padding: 6px 14px;\n  border-radius: 999px;\n  line-height: 1;\n}\n.recipe-row__heart-icon {\n  width: 16px;\n  height: 14px;\n}\n.indian-pagination {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  color: #4a6348;\n  font-size: 16px;\n  font-weight: 600;\n  font-family: "Quicksand", sans-serif;\n  margin-top: 32px;\n}\n.indian-pagination__item {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.2s ease;\n}\n.indian-pagination__item:hover {\n  color: #1e5515;\n}\n.indian-pagination__item--active {\n  color: #1e5515;\n  font-weight: 700;\n}\n.indian-pagination__ellipsis {\n  -webkit-user-select: none;\n  user-select: none;\n}\n.indian-pagination__arrow {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  font-weight: 700;\n  transition: color 0.2s ease;\n}\n.indian-pagination__arrow:hover:not(.indian-pagination__arrow--disabled) {\n  color: #1e5515;\n}\n.indian-pagination__arrow--disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n/*# sourceMappingURL=indian-cuisine.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(IndianCuisine, { className: "IndianCuisine", filePath: "src/app/features/indian-cuisine/indian-cuisine.ts", lineNumber: 20 });
})();
export {
  IndianCuisine
};
//# sourceMappingURL=chunk-ZJ5WFACJ.js.map
