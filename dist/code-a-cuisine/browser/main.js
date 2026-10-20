import {
  Component,
  RouterOutlet,
  bootstrapApplication,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  signal,
  withFetch,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-APPJTXDK.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-F3HJGPQ3.js").then((m) => m.Dashboard)
  },
  {
    path: "generate",
    loadComponent: () => import("./chunk-BC3OJAST.js").then((m) => m.Ingredients)
  },
  {
    path: "preferences",
    loadComponent: () => import("./chunk-3YXU5UOJ.js").then((m) => m.Preferences)
  },
  {
    path: "cookbook",
    loadComponent: () => import("./chunk-QTBK5LUR.js").then((m) => m.Cookbook)
  },
  {
    path: "loading",
    loadComponent: () => import("./chunk-F3N5MUN5.js").then((m) => m.Loading)
  },
  {
    path: "results",
    loadComponent: () => import("./chunk-CMMFMP7X.js").then((m) => m.Results)
  },
  {
    path: "recipe/:id",
    loadComponent: () => import("./chunk-7D6XD4BL.js").then((m) => m.RecipeDetail)
  },
  {
    path: "cuisine/italian",
    loadComponent: () => import("./chunk-TJC7WDXF.js").then((m) => m.ItalianCuisine)
  },
  {
    path: "italian-cuisine",
    loadComponent: () => import("./chunk-TJC7WDXF.js").then((m) => m.ItalianCuisine)
  },
  {
    path: "cuisine/german",
    loadComponent: () => import("./chunk-Q2G3TJ7S.js").then((m) => m.GermanCuisine)
  },
  {
    path: "german-cuisine",
    loadComponent: () => import("./chunk-Q2G3TJ7S.js").then((m) => m.GermanCuisine)
  },
  {
    path: "cuisine/japanese",
    loadComponent: () => import("./chunk-I5UH7IGG.js").then((m) => m.JapaneseCuisine)
  },
  {
    path: "japanese-cuisine",
    loadComponent: () => import("./chunk-I5UH7IGG.js").then((m) => m.JapaneseCuisine)
  },
  {
    path: "cuisine/indian",
    loadComponent: () => import("./chunk-ZJ5WFACJ.js").then((m) => m.IndianCuisine)
  },
  {
    path: "indian-cuisine",
    loadComponent: () => import("./chunk-ZJ5WFACJ.js").then((m) => m.IndianCuisine)
  },
  {
    path: "cuisine/gourmet",
    loadComponent: () => import("./chunk-NAKDSAG4.js").then((m) => m.GourmetCuisine)
  },
  {
    path: "gourmet-cuisine",
    loadComponent: () => import("./chunk-NAKDSAG4.js").then((m) => m.GourmetCuisine)
  },
  {
    path: "cuisine/fusion",
    loadComponent: () => import("./chunk-LV674XPZ.js").then((m) => m.FusionCuisine)
  },
  {
    path: "fusion-cuisine",
    loadComponent: () => import("./chunk-LV674XPZ.js").then((m) => m.FusionCuisine)
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};

// src/app/app.ts
var App = class _App {
  title = signal("code-a-cuisine", ...ngDevMode ? [{ debugName: "title" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "<router-outlet />\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
