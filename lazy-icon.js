/**
 * LazyIcon is a custom element that loads an SVG icon lazily.
 *
 * It uses IntersectionObserver to load the icon only when it is in the viewport.
 * If the browser doesn't support the IntersectionObserver api, icon is loaded immediately.
 * The icon is specified by the "code" attribute.
 *
 * Configuration can be provided globally via `window.lazyIconConfig` or defaults to:
 * ```javascript
 * window.lazyIconConfig = {
 *   spriteUrl: "/public/images/icons"
 * };
 * ```
 *
 * Usage:
 * ```html
 * <lazy-icon code="icon-name"></lazy-icon>
 * ```
 */
class LazyIcon extends HTMLElement {
  /** Reference to the intersection observer. */
  #observer = null;

  /** Configuration for the icon sprite path. */
  #config = Object.freeze(
    Object.assign(
      { spriteUrl: "/public/images/icons" },
      window.lazyIconConfig || {},
    ),
  );

  constructor() {
    super();
    this.code = this.getAttribute("code");
    this.innerHTML = `<svg viewBox="0 0 24 24"></svg>`;
    this.svg = this.querySelector("svg");
  }

  /** Observes the code attribute that specifies the icon to load. */
  static observedAttributes = ["code"];

  /** Called when an observed attribute changes. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "code" && oldValue !== newValue) {
      this.code = newValue;
      this.#unobserve();
      this.#createUse();
    }
  }

  /** Creates the `<use>` element with the SVG icon. */
  #createUse = () => {
    const href = `${this.#config.spriteUrl}/${this.code}.svg#icon`;
    const use = `<use href="${href}"></use>`;
    this.svg.innerHTML = use;
  };

  /** Observes the SVG element to load the icon when it is in the viewport. */
  #observe = () => {
    if (!this.svg) return;
    const isCompatible = "IntersectionObserver" in window;
    if (!isCompatible) {
      return this.#createUse();
    }
    const callback = ([entry]) => {
      if (entry.isIntersecting) {
        this.#createUse();
        this.#unobserve();
      }
    };
    this.#observer = new IntersectionObserver(callback, { rootMargin: "24px" });
    this.#observer.observe(this.svg);
  };

  /** Stops SVG element observation. */
  #unobserve = () => {
    if (!this.#observer) return;
    this.#observer.disconnect();
    this.#observer = null;
  };

  /** Called when the element is added to the DOM. */
  connectedCallback() {
    this.#observe();
  }

  /** Called when the element is removed from the DOM. */
  disconnectedCallback() {
    this.#unobserve();
  }
}

window.customElements.define("lazy-icon", LazyIcon);
