import {
  RecipeStateService
} from "./chunk-RZNXE2LB.js";
import {
  HttpClient,
  HttpErrorResponse,
  Injectable,
  TimeoutError,
  __spreadValues,
  catchError,
  computed,
  defer,
  finalize,
  inject,
  map,
  setClassMetadata,
  tap,
  throwError,
  timeout,
  ɵɵdefineInjectable
} from "./chunk-APPJTXDK.js";

// src/environments/environment.ts
var environment = {
  production: false,
  n8nWebhookUrl: "/api/n8n/generate-recipes"
};

// src/app/core/services/recipe-generator.service.ts
var RecipeGeneratorService = class _RecipeGeneratorService {
  http = inject(HttpClient);
  invalidResponse = "The recipe service returned incomplete recipes. Please try again.";
  generateRecipes(data) {
    return defer(() => {
      this.validateRequest(data);
      return this.http.post(environment.n8nWebhookUrl, data);
    }).pipe(timeout(18e4), map((response) => {
      const recipes = this.record(response)["recipes"];
      if (!Array.isArray(recipes) || recipes.length !== 3) {
        throw new Error("Expected exactly 3 recipes. Please try again.");
      }
      return recipes.map((recipe, index) => this.normalizeRecipe(recipe, index, data));
    }));
  }
  validateRequest(data) {
    if (!data.ingredients.length || data.ingredients.some((ingredient) => !ingredient.name.trim() || !ingredient.unit.trim() || !Number.isFinite(ingredient.amount) || ingredient.amount <= 0)) {
      throw new Error("Please add ingredients with a name and a positive amount before generating recipes.");
    }
    const preferences = data.preferences;
    if (!Number.isInteger(preferences.portions) || preferences.portions < 1 || !Number.isInteger(preferences.cookingPersons) || preferences.cookingPersons < 1 || !preferences.cookingTime.trim() || !preferences.cuisine.trim() || !preferences.diet.trim()) {
      throw new Error("Please check your portions, cooking persons, and preferences before generating recipes.");
    }
  }
  normalizeRecipe(raw, index, request) {
    const item = this.record(raw);
    const yourIngredients = this.normalizeIngredients(item["yourIngredients"]);
    const extraIngredients = this.normalizeIngredients(item["extraIngredients"] ?? []);
    const steps = this.normalizeSteps(item["steps"]);
    if (yourIngredients.length + extraIngredients.length === 0 || steps.length === 0) {
      throw new Error(this.invalidResponse);
    }
    const nutrition = item["nutrition"] == null ? {} : this.record(item["nutrition"]);
    const cookingPersons = item["cookingPersons"] ?? request.preferences.cookingPersons;
    if (typeof cookingPersons !== "number" || !Number.isInteger(cookingPersons) || cookingPersons < 1) {
      throw new Error(this.invalidResponse);
    }
    const tags = item["tags"] ?? [];
    if (!Array.isArray(tags))
      throw new Error(this.invalidResponse);
    return {
      id: `generated-${index + 1}`,
      label: `Recipe ${index + 1}`,
      title: this.requiredText(item["title"]),
      cookingTime: this.requiredText(item["cookingTime"]),
      cookingPersons,
      tags: [...new Set(tags.map((tag) => this.requiredText(tag)))],
      likes: 0,
      nutrition: {
        calories: this.nutritionValue(nutrition["calories"]),
        protein: this.nutritionValue(nutrition["protein"]),
        fat: this.nutritionValue(nutrition["fat"]),
        carbs: this.nutritionValue(nutrition["carbs"])
      },
      yourIngredients,
      extraIngredients,
      steps
    };
  }
  normalizeIngredients(raw) {
    if (!Array.isArray(raw))
      throw new Error(this.invalidResponse);
    return raw.map((ingredient) => {
      const item = this.record(ingredient);
      const amount = item["amount"];
      if (typeof amount !== "string" && !(typeof amount === "number" && Number.isFinite(amount))) {
        throw new Error(this.invalidResponse);
      }
      return {
        name: this.requiredText(item["name"]),
        amount: this.requiredText(`${amount}${item["unit"] ? " " + this.requiredText(item["unit"]) : ""}`)
      };
    });
  }
  normalizeSteps(raw) {
    if (!Array.isArray(raw))
      throw new Error(this.invalidResponse);
    return raw.map((step, index) => {
      const item = this.record(step);
      return {
        number: index + 1,
        title: this.requiredText(item["title"]),
        description: this.requiredText(item["description"]),
        chef: item["chef"] == null ? "Chef 1" : this.requiredText(item["chef"])
      };
    });
  }
  record(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error(this.invalidResponse);
    }
    return value;
  }
  requiredText(value) {
    if (typeof value !== "string" || !value.trim())
      throw new Error(this.invalidResponse);
    return value.trim();
  }
  nutritionValue(value) {
    return typeof value === "string" && value.trim() ? value.trim() : typeof value === "number" && Number.isFinite(value) ? String(value) : "\u2014";
  }
  static \u0275fac = function RecipeGeneratorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipeGeneratorService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RecipeGeneratorService, factory: _RecipeGeneratorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipeGeneratorService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/services/recipe.service.ts
var RecipeService = class _RecipeService {
  state = inject(RecipeStateService);
  generator = inject(RecipeGeneratorService);
  ingredients = this.state.ingredients;
  preferences = this.state.preferences;
  generatedRecipes = this.state.recipes;
  isLoading = this.state.loading;
  errorMessage = this.state.error;
  defaultRecipes = [
    {
      id: "1",
      label: "Recipe 1",
      title: "Pasta with spinach and cherry tomatoes",
      cookingTime: "20min",
      cookingPersons: 2,
      tags: ["Vegetarian", "Quick"],
      likes: 66,
      nutrition: {
        calories: "630 kcal",
        protein: "18g",
        fat: "24g",
        carbs: "58g"
      },
      yourIngredients: [
        { amount: "80g", name: "Pasta noodles" },
        { amount: "100g", name: "Baby spinach" },
        { amount: "150g", name: "Cherry tomatoes" },
        { amount: "1 piece", name: "Egg" }
      ],
      extraIngredients: [
        { amount: "40g", name: "Parmesan cheese" },
        { amount: "30ml", name: "Olive oil" },
        { amount: "Herbs", name: "(dry basil, oregano, garlic)" }
      ],
      steps: [
        {
          number: 1,
          title: "Cook the pasta",
          chef: "Chef 1",
          description: "Cook your noodles in boiling, salted water, until the pasta is al dente. Drain the pasta and reserve some of the pasta water."
        },
        {
          number: 2,
          title: "Make the sauce",
          chef: "Chef 2",
          description: "While the pasta is cooking, heat olive oil in a pan over medium heat. Add the garlic, and saut\xE9 until it starts to turn golden. Add the tomatoes, oregano, salt, and pepper, and cook for 3-4 minutes."
        },
        {
          number: 3,
          title: "Finish the pasta",
          chef: "Chef 1",
          description: "Add the noodles to the sauce, then add pasta water until the sauce is the right consistency. Simmer for 1 minute, then add the spinach, basil, chili flakes, and parmesan."
        },
        {
          number: 4,
          title: "Make the sauce",
          chef: "Chef 2",
          description: "Lower the heat to low, stir until mixed, and remove from the heat. Season to taste, top with parmesan cheese, and enjoy."
        }
      ]
    },
    {
      id: "2",
      label: "Recipe 2",
      title: "Creamy garlic shrimp pasta",
      cookingTime: "22min",
      cookingPersons: 2,
      tags: ["Seafood", "Quick"],
      likes: 57,
      nutrition: {
        calories: "580 kcal",
        protein: "32g",
        fat: "28g",
        carbs: "46g"
      },
      yourIngredients: [
        { amount: "300g", name: "Raw peeled shrimp" },
        { amount: "250g", name: "Penne noodles" },
        { amount: "3 cloves", name: "Garlic" },
        { amount: "150ml", name: "Heavy cream" }
      ],
      extraIngredients: [
        { amount: "50g", name: "Parmesan cheese" },
        { amount: "2 tbsp", name: "Butter" },
        { amount: "Fresh", name: "Parsley & lemon juice" }
      ],
      steps: [
        {
          number: 1,
          title: "Cook pasta & sear shrimp",
          chef: "Chef 1",
          description: "Cook pasta in boiling salted water. Melt butter in a skillet over high heat, season shrimp and sear for 2 mins per side."
        },
        {
          number: 2,
          title: "Prepare cream sauce",
          chef: "Chef 2",
          description: "Saute garlic for 1 minute. Pour in heavy cream, bring to simmer, and melt in Parmesan cheese until smooth."
        },
        {
          number: 3,
          title: "Combine and serve",
          chef: "Chef 1",
          description: "Toss pasta and shrimp into the sauce. Garnish with parsley and fresh lemon juice."
        }
      ]
    },
    {
      id: "3",
      label: "Recipe 3",
      title: "Pasta alla Trapanese (Sicilian Tomato Pesto)",
      cookingTime: "20min",
      cookingPersons: 4,
      tags: ["Vegetarian", "Italian"],
      likes: 84,
      nutrition: {
        calories: "510 kcal",
        protein: "14g",
        fat: "22g",
        carbs: "62g"
      },
      yourIngredients: [
        { amount: "350g", name: "Rigatoni pasta" },
        { amount: "300g", name: "Cherry tomatoes" },
        { amount: "50g", name: "Blanched almonds" },
        { amount: "1 bunch", name: "Fresh basil" }
      ],
      extraIngredients: [
        { amount: "4 tbsp", name: "Olive oil" },
        { amount: "50g", name: "Pecorino Romano" },
        { amount: "1 clove", name: "Garlic" }
      ],
      steps: [
        {
          number: 1,
          title: "Blend raw pesto",
          chef: "Chef 1",
          description: "Pulse almonds, garlic, basil, cherry tomatoes, and olive oil in a food processor until a textured pesto forms."
        },
        {
          number: 2,
          title: "Cook pasta and toss",
          chef: "Chef 2",
          description: "Boil pasta al dente. Drain, toss with fresh Trapanese pesto, and serve topped with Pecorino Romano."
        }
      ]
    }
  ];
  recipes = computed(() => this.generatedRecipes().length ? this.generatedRecipes() : this.defaultRecipes, ...ngDevMode ? [{ debugName: "recipes" }] : (
    /* istanbul ignore next */
    []
  ));
  resultsCards = computed(() => {
    return this.generatedRecipes().map((r, index) => ({
      id: r.id,
      label: r.label || `Recipe ${index + 1}`,
      title: r.title,
      cookingTime: r.cookingTime
    }));
  }, ...ngDevMode ? [{ debugName: "resultsCards" }] : (
    /* istanbul ignore next */
    []
  ));
  resultTags = computed(() => {
    const prefs = this.state.generatedPreferences() ?? this.preferences();
    const tags = [];
    if (prefs.cuisine)
      tags.push(prefs.cuisine);
    if (prefs.cookingTime) {
      const timeLabel = prefs.cookingTime === "quick" ? "Quick" : prefs.cookingTime === "medium" ? "Medium" : prefs.cookingTime === "complex" ? "Complex" : prefs.cookingTime;
      tags.push(timeLabel);
    }
    if (prefs.diet && prefs.diet !== "No preferences") {
      tags.push(prefs.diet);
    }
    return tags.length > 0 ? tags : ["Italian", "Quick"];
  }, ...ngDevMode ? [{ debugName: "resultTags" }] : (
    /* istanbul ignore next */
    []
  ));
  setPreferences(pref) {
    this.preferences.update((current) => __spreadValues(__spreadValues({}, current), pref));
  }
  setIngredients(list) {
    this.ingredients.set(list);
  }
  addIngredient(item) {
    this.ingredients.update((list) => [...list, item]);
  }
  removeIngredient(index) {
    this.ingredients.update((list) => list.filter((_, i) => i !== index));
  }
  getRecipeById(id) {
    return this.generatedRecipes().find((recipe) => recipe.id === id) ?? this.defaultRecipes.find((recipe) => recipe.id === id);
  }
  getAllRecipes() {
    return this.recipes();
  }
  generateRecipes() {
    return defer(() => {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.generatedRecipes.set([]);
      this.state.generatedPreferences.set(null);
      const request = {
        ingredients: this.ingredients().map((ingredient) => __spreadValues({}, ingredient)),
        preferences: __spreadValues({}, this.preferences())
      };
      return this.generator.generateRecipes(request).pipe(tap((recipes) => {
        this.generatedRecipes.set(recipes);
        this.state.generatedPreferences.set(request.preferences);
      }));
    }).pipe(catchError((error) => {
      let message = "Could not generate recipes. Please try again.";
      if (error instanceof TimeoutError) {
        message = "Recipe generation took too long. Please try again.";
      } else if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          message = typeof error.error === "string" && error.error.includes("Cannot POST") ? "Recipe requests are not being forwarded. Please restart the app server and try again." : "The recipe workflow could not be reached. Please check that it is active and its webhook address is correct.";
        } else {
          message = error.status === 0 || error.status >= 500 ? "The recipe service is unavailable. Please try again shortly." : "The recipe request failed. Please try again.";
        }
      } else if (error instanceof Error) {
        message = error.message;
      }
      this.errorMessage.set(message);
      return throwError(() => new Error(message));
    }), finalize(() => this.isLoading.set(false)));
  }
  static \u0275fac = function RecipeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecipeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RecipeService, factory: _RecipeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RecipeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  RecipeService
};
//# sourceMappingURL=chunk-YUTAVKYH.js.map
