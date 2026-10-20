import {
  Component,
  Input,
  RouterLink,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵsanitizeUrl
} from "./chunk-APPJTXDK.js";

// src/app/shared/navbar/navbar.ts
var Navbar = class _Navbar {
  variant = input("dark", ...ngDevMode ? [{ debugName: "variant" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function Navbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Navbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Navbar, selectors: [["app-navbar"]], inputs: { variant: [1, "variant"] }, decls: 3, vars: 3, consts: [[1, "navbar"], ["routerLink", "/", "id", "nav-logo", 1, "navbar__logo"], ["alt", "Code \xE0 Cuisine Logo", 1, "navbar__logo-img", 3, "src"]], template: function Navbar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0)(1, "a", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("navbar--light", ctx.variant() === "light");
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.variant() === "light" ? "/assets/logo.svg" : "/assets/logo-green.svg", \u0275\u0275sanitizeUrl);
    }
  }, dependencies: [RouterLink], styles: ["\n.navbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-lg) var(--space-2xl);\n  position: relative;\n  z-index: 10;\n}\n.navbar__logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n  transition: opacity var(--transition-fast);\n}\n.navbar__logo[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.navbar__logo-img[_ngcontent-%COMP%] {\n  height: 52px;\n  width: auto;\n}\n@media (max-width: 1000px) {\n  .navbar[_ngcontent-%COMP%] {\n    padding: 40px;\n  }\n}\n@media (max-width: 770px) {\n  .navbar[_ngcontent-%COMP%] {\n    padding: 28px;\n  }\n}\n@media (max-width: 680px) {\n  .navbar[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n}\n@media (max-width: 425px) {\n  .navbar__logo-img[_ngcontent-%COMP%] {\n    height: 32px;\n  }\n}\n/*# sourceMappingURL=navbar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Navbar, [{
    type: Component,
    args: [{ selector: "app-navbar", imports: [RouterLink], template: `<nav class="navbar" [class.navbar--light]="variant() === 'light'">
  <a routerLink="/" class="navbar__logo" id="nav-logo">
    <img
      [src]="variant() === 'light' ? '/assets/logo.svg' : '/assets/logo-green.svg'"
      alt="Code \xE0 Cuisine Logo"
      class="navbar__logo-img"
    />
  </a>
</nav>
`, styles: ["/* src/app/shared/navbar/navbar.scss */\n.navbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-lg) var(--space-2xl);\n  position: relative;\n  z-index: 10;\n}\n.navbar__logo {\n  display: flex;\n  align-items: center;\n  gap: var(--space-sm);\n  transition: opacity var(--transition-fast);\n}\n.navbar__logo:hover {\n  opacity: 0.8;\n}\n.navbar__logo-img {\n  height: 52px;\n  width: auto;\n}\n@media (max-width: 1000px) {\n  .navbar {\n    padding: 40px;\n  }\n}\n@media (max-width: 770px) {\n  .navbar {\n    padding: 28px;\n  }\n}\n@media (max-width: 680px) {\n  .navbar {\n    padding: 20px;\n  }\n}\n@media (max-width: 425px) {\n  .navbar__logo-img {\n    height: 32px;\n  }\n}\n/*# sourceMappingURL=navbar.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Navbar, { className: "Navbar", filePath: "src/app/shared/navbar/navbar.ts", lineNumber: 10 });
})();

export {
  Navbar
};
//# sourceMappingURL=chunk-VIDJBO73.js.map
