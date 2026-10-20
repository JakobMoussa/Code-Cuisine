import {
  Injectable,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-APPJTXDK.js";

// src/app/core/services/recipe-state.service.ts
var RecipeStateService = class _RecipeStateService {
  ingredients = signal([], ...ngDevMode ? [{ debugName: "ingredients" }] : (
    /* istanbul ignore next */
    []
  ));
  preferences = signal({
    portions: 2,
    cookingPersons: 1,
    cookingTime: "quick",
    cuisine: "German",
    diet: "No preferences"
  }, ...ngDevMode ? [{ debugName: "preferences" }] : (
    /* istanbul ignore next */
    []
  ));
  recipes = signal([], ...ngDevMode ? [{ debugName: "recipes" }] : (
    /* istanbul ignore next */
    []
  ));
  generatedPreferences = signal(null, ...ngDevMode ? [{ debugName: "generatedPreferences" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  setPreferences(preferences) {
    this.preferences.update((current) => __spreadValues(__spreadValues({}, current), preferences));
  }
  static \u0275fac = function RecipeStateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipeStateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RecipeStateService, factory: _RecipeStateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipeStateService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  RecipeStateService
};
//# sourceMappingURL=chunk-RZNXE2LB.js.map
