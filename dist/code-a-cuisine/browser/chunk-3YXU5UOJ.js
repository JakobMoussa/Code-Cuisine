import {
  Navbar
} from "./chunk-VIDJBO73.js";
import {
  RecipeStateService
} from "./chunk-RZNXE2LB.js";
import {
  Component,
  RouterLink,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-APPJTXDK.js";

// src/app/features/preferences/preferences.ts
var _forTrack0 = ($index, $item) => $item.id;
function Preferences_For_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("click", function Preferences_For_46_Template_div_click_0_listener() {
      const time_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTime(time_r2.id));
    });
    \u0275\u0275elementStart(1, "button", 34)(2, "span", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const time_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("selected", ctx_r2.selectedTime() === time_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(time_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(time_r2.subtitle);
  }
}
function Preferences_For_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function Preferences_For_54_Template_button_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCuisine(item_r5));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selectedCuisine() === item_r5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5);
  }
}
function Preferences_For_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function Preferences_For_62_Template_button_click_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectDiet(item_r7));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selectedDiet() === item_r7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7);
  }
}
var Preferences = class _Preferences {
  state = inject(RecipeStateService);
  portions = computed(() => this.state.preferences().portions, ...ngDevMode ? [{ debugName: "portions" }] : (
    /* istanbul ignore next */
    []
  ));
  persons = computed(() => this.state.preferences().cookingPersons, ...ngDevMode ? [{ debugName: "persons" }] : (
    /* istanbul ignore next */
    []
  ));
  cookingTimes = [
    { id: "quick", label: "Quick", subtitle: "ab to 20min" },
    { id: "medium", label: "Medium", subtitle: "25-40min" },
    { id: "complex", label: "Complex", subtitle: "over 45min" }
  ];
  selectedTime = computed(() => this.state.preferences().cookingTime, ...ngDevMode ? [{ debugName: "selectedTime" }] : (
    /* istanbul ignore next */
    []
  ));
  cuisines = [
    "German",
    "Italian",
    "Indian",
    "Japanese",
    "Gourmet",
    "Fusion"
  ];
  selectedCuisine = computed(() => this.state.preferences().cuisine, ...ngDevMode ? [{ debugName: "selectedCuisine" }] : (
    /* istanbul ignore next */
    []
  ));
  dietPreferences = [
    "Vegetarian",
    "Vegan",
    "Keto",
    "No preferences"
  ];
  selectedDiet = computed(() => this.state.preferences().diet, ...ngDevMode ? [{ debugName: "selectedDiet" }] : (
    /* istanbul ignore next */
    []
  ));
  incrementPortions() {
    this.state.setPreferences({ portions: this.portions() + 1 });
  }
  decrementPortions() {
    this.state.setPreferences({ portions: Math.max(1, this.portions() - 1) });
  }
  incrementPersons() {
    this.state.setPreferences({ cookingPersons: this.persons() + 1 });
  }
  decrementPersons() {
    this.state.setPreferences({ cookingPersons: Math.max(1, this.persons() - 1) });
  }
  selectTime(cookingTime) {
    this.state.setPreferences({ cookingTime });
  }
  selectCuisine(cuisine) {
    this.state.setPreferences({ cuisine });
  }
  selectDiet(diet) {
    this.state.setPreferences({ diet });
  }
  static \u0275fac = function Preferences_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Preferences)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Preferences, selectors: [["app-preferences"]], decls: 67, vars: 3, consts: [[1, "preferences-page"], ["variant", "dark"], [1, "preferences__top-nav"], ["routerLink", "/generate", "id", "btn-back-to-ingredients", 1, "preferences__back-btn"], ["src", "/assets/back-arrow.svg", "alt", "Back-Button", 1, "preferences__back-icon"], [1, "preferences"], [1, "preferences__header"], [1, "preferences__title"], [1, "preferences__steppers"], [1, "preferences__stepper-group"], [1, "preferences__stepper-label"], [1, "preferences__stepper-control"], ["type", "button", "aria-label", "Decrease portions", 1, "preferences__stepper-btn", 3, "click"], ["src", "/assets/minus-box.svg", "alt", "Minus", 1, "preferences__stepper-icon"], [1, "preferences__stepper-value"], [1, "preferences__stepper-num"], [1, "preferences__stepper-text"], ["type", "button", "aria-label", "Increase portions", 1, "preferences__stepper-btn", 3, "click"], ["src", "/assets/plus-box.svg", "alt", "Plus", 1, "preferences__stepper-icon"], ["type", "button", "aria-label", "Decrease cooking persons", 1, "preferences__stepper-btn", 3, "click"], ["type", "button", "aria-label", "Increase cooking persons", 1, "preferences__stepper-btn", 3, "click"], [1, "preferences__card"], [1, "preferences__section"], [1, "preferences__section-header"], ["src", "/assets/clock.svg", "alt", "clock", 1, "preferences__section-icon"], [1, "preferences__section-title"], [1, "preferences__pills"], [1, "preferences__time-item"], ["src", "/assets/public.svg", "alt", "public"], ["type", "button", 1, "preferences__pill", 3, "selected"], ["src", "/assets/fork_spoon.svg", "alt", "fork_spoon"], [1, "preferences__action"], ["routerLink", "/loading", "id", "btn-generate-final-recipe", 1, "preferences__submit-btn"], [1, "preferences__time-item", 3, "click"], ["type", "button", 1, "preferences__pill"], [1, "preferences__pill-title"], [1, "preferences__pill-subtitle"], ["type", "button", 1, "preferences__pill", 3, "click"]], template: function Preferences_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-navbar", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "img", 4);
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6, "Ingredients");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "main", 5)(8, "header", 6)(9, "h1", 7);
      \u0275\u0275text(10, "Choose your preferences");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "label", 10);
      \u0275\u0275text(14, "How many portions you need?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 11)(16, "button", 12);
      \u0275\u0275listener("click", function Preferences_Template_button_click_16_listener() {
        return ctx.decrementPortions();
      });
      \u0275\u0275element(17, "img", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 14)(19, "span", 15);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 16);
      \u0275\u0275text(22, "Portions");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "button", 17);
      \u0275\u0275listener("click", function Preferences_Template_button_click_23_listener() {
        return ctx.incrementPortions();
      });
      \u0275\u0275element(24, "img", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "div", 9)(26, "label", 10);
      \u0275\u0275text(27, "How many are cooking?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 11)(29, "button", 19);
      \u0275\u0275listener("click", function Preferences_Template_button_click_29_listener() {
        return ctx.decrementPersons();
      });
      \u0275\u0275element(30, "img", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 14)(32, "span", 15);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 16);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "button", 20);
      \u0275\u0275listener("click", function Preferences_Template_button_click_36_listener() {
        return ctx.incrementPersons();
      });
      \u0275\u0275element(37, "img", 18);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(38, "div", 21)(39, "section", 22)(40, "div", 23);
      \u0275\u0275element(41, "img", 24);
      \u0275\u0275elementStart(42, "h2", 25);
      \u0275\u0275text(43, "Cooking time:");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 26);
      \u0275\u0275repeaterCreate(45, Preferences_For_46_Template, 6, 4, "div", 27, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "section", 22)(48, "div", 23);
      \u0275\u0275element(49, "img", 28);
      \u0275\u0275elementStart(50, "h2", 25);
      \u0275\u0275text(51, "Cuisine");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "div", 26);
      \u0275\u0275repeaterCreate(53, Preferences_For_54_Template, 3, 3, "button", 29, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "section", 22)(56, "div", 23);
      \u0275\u0275element(57, "img", 30);
      \u0275\u0275elementStart(58, "h2", 25);
      \u0275\u0275text(59, "Diet preferences");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "div", 26);
      \u0275\u0275repeaterCreate(61, Preferences_For_62_Template, 3, 3, "button", 29, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(63, "div", 31)(64, "a", 32)(65, "span");
      \u0275\u0275text(66, "Generate Recipe");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(20);
      \u0275\u0275textInterpolate(ctx.portions());
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.persons());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.persons() === 1 ? "Person" : "Persons");
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.cookingTimes);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.cuisines);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.dietPreferences);
    }
  }, dependencies: [Navbar, RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n.preferences-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--color-white);\n}\n.preferences[_ngcontent-%COMP%] {\n  max-width: 880px;\n  margin: 0 auto;\n  padding: 0 var(--space-md) var(--space-3xl);\n}\n.preferences__top-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: var(--space-lg);\n  padding: 0 50px 0 50px;\n}\n.preferences__back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  font-family: var(--font-primary);\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-dark-green);\n  transition: transform var(--transition-fast);\n}\n.preferences__back-btn[_ngcontent-%COMP%]:hover {\n  transform: translateX(-4px);\n}\n.preferences__back-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: auto;\n}\n.preferences__header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: var(--space-2xl);\n  opacity: 0;\n  animation: _ngcontent-%COMP%_fadeSlideUp 0.5s ease forwards;\n}\n.preferences__title[_ngcontent-%COMP%] {\n  font-family: "Quicksand";\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--color-dark-green);\n}\n.preferences__steppers[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: var(--space-3xl);\n  margin-bottom: var(--space-2xl);\n  opacity: 0;\n  animation: _ngcontent-%COMP%_fadeSlideUp 0.5s ease forwards;\n  animation-delay: 0.1s;\n  flex-wrap: wrap;\n}\n.preferences__stepper-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.preferences__stepper-label[_ngcontent-%COMP%] {\n  font-family: var(--font-primary);\n  font-size: 20px;\n  font-weight: 500;\n  color: var(--color-dark-green);\n}\n.preferences__stepper-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.preferences__stepper-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  transition: transform var(--transition-fast), opacity var(--transition-fast);\n}\n.preferences__stepper-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n  transform: scale(1.05);\n}\n.preferences__stepper-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.preferences__stepper-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  display: block;\n}\n.preferences__stepper-value[_ngcontent-%COMP%] {\n  padding: 6px 18px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-primary);\n  font-size: 20px;\n  color: var(--color-dark-green);\n}\n.preferences__stepper-num[_ngcontent-%COMP%] {\n  font-weight: 500;\n  background-color: #DCE5D8;\n  padding: 0px 10px 0px 10px;\n}\n.preferences__stepper-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.preferences__card[_ngcontent-%COMP%] {\n  background-color: #DCE5D8;\n  border-radius: var(--radius-xl);\n  padding: 32px 24px 32px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2xl);\n  margin-bottom: var(--space-2xl);\n  opacity: 0;\n  animation: _ngcontent-%COMP%_fadeSlideUp 0.5s ease forwards;\n  animation-delay: 0.2s;\n}\n.preferences__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.preferences__section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.preferences__section-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.preferences__section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-primary);\n  font-size: 24px;\n  font-weight: 600;\n  color: var(--color-dark-green);\n}\n.preferences__pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.preferences__pill[_ngcontent-%COMP%] {\n  background-color: #FAF0E6;\n  border-radius: 30px;\n  padding: 6px 12px 6px 12px;\n  font-size: 20px;\n  color: var(--color-dark-green);\n  cursor: pointer;\n}\n.preferences__pill[_ngcontent-%COMP%]:hover {\n  background-color: #FAE0C6;\n  transform: translateY(-2px);\n}\n.preferences__pill.selected[_ngcontent-%COMP%] {\n  background-color: rgba(57, 96, 57, 0.2);\n  color: #10310B;\n}\n.preferences__time-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n}\n.preferences__pill-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 500;\n}\n.preferences__pill-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #10310B;\n  opacity: 0.75;\n  text-align: center;\n}\n.preferences__action[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_fadeSlideUp 0.5s ease forwards;\n  animation-delay: 0.3s;\n}\n.preferences__submit-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-sm);\n  font-family: var(--font-primary);\n  font-size: 24px;\n  font-weight: 600;\n  color: #ffffff;\n  padding: 14px 36px;\n  background-color: #396039;\n  transition: background-color var(--transition-base), transform var(--transition-fast);\n}\n.preferences__submit-btn[_ngcontent-%COMP%]:hover {\n  background-color: #055E05;\n  transform: translateY(-2px);\n}\n@keyframes _ngcontent-%COMP%_fadeSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 425px) {\n  .preferences__top-nav[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .preferences__top-nav[_ngcontent-%COMP%] {\n    padding: 0 50px 0 20px;\n  }\n  .preferences__title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    text-align: start;\n  }\n  .preferences__steppers[_ngcontent-%COMP%] {\n    justify-content: start;\n  }\n  .preferences__submit-btn[_ngcontent-%COMP%] {\n    padding: 14px 16px;\n    font-size: 16px;\n  }\n  .preferences__stepper-group[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=preferences.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Preferences, [{
    type: Component,
    args: [{ selector: "app-preferences", imports: [Navbar, RouterLink], template: `<div class="preferences-page">
  <app-navbar variant="dark" />

  <div class="preferences__top-nav">
    <a routerLink="/generate" class="preferences__back-btn" id="btn-back-to-ingredients">
      <img src="/assets/back-arrow.svg" alt="Back-Button" class="preferences__back-icon" />
      <span>Ingredients</span>
    </a>
  </div>

  <main class="preferences">
    <header class="preferences__header">
      <h1 class="preferences__title">Choose your preferences</h1>
    </header>

    <div class="preferences__steppers">
      <div class="preferences__stepper-group">
        <label class="preferences__stepper-label">How many portions you need?</label>
        <div class="preferences__stepper-control">
          <button type="button" class="preferences__stepper-btn" (click)="decrementPortions()"
            aria-label="Decrease portions">
            <img src="/assets/minus-box.svg" alt="Minus" class="preferences__stepper-icon" />
          </button>
          <div class="preferences__stepper-value">
            <span class="preferences__stepper-num">{{ portions() }}</span>
            <span class="preferences__stepper-text">Portions</span>
          </div>
          <button type="button" class="preferences__stepper-btn" (click)="incrementPortions()"
            aria-label="Increase portions">
            <img src="/assets/plus-box.svg" alt="Plus" class="preferences__stepper-icon" />
          </button>
        </div>
      </div>

      <div class="preferences__stepper-group">
        <label class="preferences__stepper-label">How many are cooking?</label>
        <div class="preferences__stepper-control">
          <button type="button" class="preferences__stepper-btn" (click)="decrementPersons()"
            aria-label="Decrease cooking persons">
            <img src="/assets/minus-box.svg" alt="Minus" class="preferences__stepper-icon" />
          </button>
          <div class="preferences__stepper-value">
            <span class="preferences__stepper-num">{{ persons() }}</span>
            <span class="preferences__stepper-text">{{ persons() === 1 ? 'Person' : 'Persons' }}</span>
          </div>
          <button type="button" class="preferences__stepper-btn" (click)="incrementPersons()"
            aria-label="Increase cooking persons">
            <img src="/assets/plus-box.svg" alt="Plus" class="preferences__stepper-icon" />
          </button>
        </div>
      </div>
    </div>

    <div class="preferences__card">
      <section class="preferences__section">
        <div class="preferences__section-header">
          <img src="/assets/clock.svg" alt="clock" class="preferences__section-icon" />
          <h2 class="preferences__section-title">Cooking time:</h2>
        </div>
        <div class="preferences__pills">
          @for (time of cookingTimes; track time.id) {
          <div class="preferences__time-item" (click)="selectTime(time.id)">
            <button type="button" class="preferences__pill" [class.selected]="selectedTime() === time.id">
              <span class="preferences__pill-title">{{ time.label }}</span>
            </button>
            <span class="preferences__pill-subtitle">{{ time.subtitle }}</span>
          </div>
          }
        </div>
      </section>

      <section class="preferences__section">
        <div class="preferences__section-header">
          <img src="/assets/public.svg" alt="public">
          <h2 class="preferences__section-title">Cuisine</h2>
        </div>
        <div class="preferences__pills">
          @for (item of cuisines; track item) {
          <button type="button" class="preferences__pill" [class.selected]="selectedCuisine() === item"
            (click)="selectCuisine(item)">
            <span>{{ item }}</span>
          </button>
          }
        </div>
      </section>

      <section class="preferences__section">
        <div class="preferences__section-header">
          <img src="/assets/fork_spoon.svg" alt="fork_spoon">
          <h2 class="preferences__section-title">Diet preferences</h2>
        </div>
        <div class="preferences__pills">
          @for (item of dietPreferences; track item) {
          <button type="button" class="preferences__pill" [class.selected]="selectedDiet() === item"
            (click)="selectDiet(item)">
            <span>{{ item }}</span>
          </button>
          }
        </div>
      </section>
    </div>

    <div class="preferences__action">
      <a routerLink="/loading" class="preferences__submit-btn" id="btn-generate-final-recipe">
        <span>Generate Recipe</span>
      </a>
    </div>
  </main>
</div>`, styles: ['/* src/app/features/preferences/preferences.scss */\n:host {\n  display: block;\n}\n.preferences-page {\n  min-height: 100vh;\n  background-color: var(--color-white);\n}\n.preferences {\n  max-width: 880px;\n  margin: 0 auto;\n  padding: 0 var(--space-md) var(--space-3xl);\n}\n.preferences__top-nav {\n  display: flex;\n  align-items: center;\n  margin-bottom: var(--space-lg);\n  padding: 0 50px 0 50px;\n}\n.preferences__back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  font-family: var(--font-primary);\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--color-dark-green);\n  transition: transform var(--transition-fast);\n}\n.preferences__back-btn:hover {\n  transform: translateX(-4px);\n}\n.preferences__back-icon {\n  width: 20px;\n  height: auto;\n}\n.preferences__header {\n  text-align: center;\n  margin-bottom: var(--space-2xl);\n  opacity: 0;\n  animation: fadeSlideUp 0.5s ease forwards;\n}\n.preferences__title {\n  font-family: "Quicksand";\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--color-dark-green);\n}\n.preferences__steppers {\n  display: flex;\n  justify-content: center;\n  gap: var(--space-3xl);\n  margin-bottom: var(--space-2xl);\n  opacity: 0;\n  animation: fadeSlideUp 0.5s ease forwards;\n  animation-delay: 0.1s;\n  flex-wrap: wrap;\n}\n.preferences__stepper-group {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.preferences__stepper-label {\n  font-family: var(--font-primary);\n  font-size: 20px;\n  font-weight: 500;\n  color: var(--color-dark-green);\n}\n.preferences__stepper-control {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.preferences__stepper-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  transition: transform var(--transition-fast), opacity var(--transition-fast);\n}\n.preferences__stepper-btn:hover {\n  opacity: 0.8;\n  transform: scale(1.05);\n}\n.preferences__stepper-btn:active {\n  transform: scale(0.95);\n}\n.preferences__stepper-icon {\n  width: 20px;\n  height: 20px;\n  display: block;\n}\n.preferences__stepper-value {\n  padding: 6px 18px;\n  border-radius: var(--radius-sm);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-primary);\n  font-size: 20px;\n  color: var(--color-dark-green);\n}\n.preferences__stepper-num {\n  font-weight: 500;\n  background-color: #DCE5D8;\n  padding: 0px 10px 0px 10px;\n}\n.preferences__stepper-text {\n  font-weight: 500;\n}\n.preferences__card {\n  background-color: #DCE5D8;\n  border-radius: var(--radius-xl);\n  padding: 32px 24px 32px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2xl);\n  margin-bottom: var(--space-2xl);\n  opacity: 0;\n  animation: fadeSlideUp 0.5s ease forwards;\n  animation-delay: 0.2s;\n}\n.preferences__section {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.preferences__section-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.preferences__section-icon {\n  width: 24px;\n  height: 24px;\n}\n.preferences__section-title {\n  font-family: var(--font-primary);\n  font-size: 24px;\n  font-weight: 600;\n  color: var(--color-dark-green);\n}\n.preferences__pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.preferences__pill {\n  background-color: #FAF0E6;\n  border-radius: 30px;\n  padding: 6px 12px 6px 12px;\n  font-size: 20px;\n  color: var(--color-dark-green);\n  cursor: pointer;\n}\n.preferences__pill:hover {\n  background-color: #FAE0C6;\n  transform: translateY(-2px);\n}\n.preferences__pill.selected {\n  background-color: rgba(57, 96, 57, 0.2);\n  color: #10310B;\n}\n.preferences__time-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n}\n.preferences__pill-title {\n  font-size: 20px;\n  font-weight: 500;\n}\n.preferences__pill-subtitle {\n  font-size: 14px;\n  font-weight: 500;\n  color: #10310B;\n  opacity: 0.75;\n  text-align: center;\n}\n.preferences__action {\n  display: flex;\n  justify-content: center;\n  opacity: 0;\n  animation: fadeSlideUp 0.5s ease forwards;\n  animation-delay: 0.3s;\n}\n.preferences__submit-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-sm);\n  font-family: var(--font-primary);\n  font-size: 24px;\n  font-weight: 600;\n  color: #ffffff;\n  padding: 14px 36px;\n  background-color: #396039;\n  transition: background-color var(--transition-base), transform var(--transition-fast);\n}\n.preferences__submit-btn:hover {\n  background-color: #055E05;\n  transform: translateY(-2px);\n}\n@keyframes fadeSlideUp {\n  from {\n    opacity: 0;\n    transform: translateY(16px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 425px) {\n  .preferences__top-nav span {\n    display: none;\n  }\n  .preferences__top-nav {\n    padding: 0 50px 0 20px;\n  }\n  .preferences__title {\n    font-size: 24px;\n    text-align: start;\n  }\n  .preferences__steppers {\n    justify-content: start;\n  }\n  .preferences__submit-btn {\n    padding: 14px 16px;\n    font-size: 16px;\n  }\n  .preferences__stepper-group {\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=preferences.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Preferences, { className: "Preferences", filePath: "src/app/features/preferences/preferences.ts", lineNumber: 18 });
})();
export {
  Preferences
};
//# sourceMappingURL=chunk-3YXU5UOJ.js.map
