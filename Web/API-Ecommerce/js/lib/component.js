export const MixComponent = (ClassHTMLElement=HTMLElement) => class extends ClassHTMLElement {
  static Mix = MixComponent;
  static setObservedAttributes = new Set(["build"]);
  static get observedAttributes() { return Array.from(this.setObservedAttributes); }
  static get tagName() { return "c-component"; }
  static get tagExtends() { return undefined; }

  build() {}

  #presetBuild() {
    const build = this.build;
    if (typeof build !== "function") throw TypeError("build most be function type.");
    this.build = () => {
      const noBuild = this.getAttribute("no-build");
      if (noBuild !== null) return;
      build();
    }
  }

  constructor () {
    super();
    this.#presetBuild();
    if (this.getAttribute("build") !== "no-build") this.build();
  }

  connectedCallback() {}
  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {}

  static presetObservedAttributes() {}

  static presetAttributeChangedCallback() {
    const attributeChangedCallback = this.prototype.attributeChangedCallback;
    this.prototype.attributeChangedCallback = (name, oldValue, newValue) => {
      attributeChangedCallback(name, oldValue, newValue);
      this.prototype.build();
    }
  }

  static presetDefine() {}

  static define(registry=window.customElements, name=this.tagName, tagExtends=this.tagExtends) {
    this.presetDefine();
    this.presetObservedAttributes();
    this.presetAttributeChangedCallback();
    registry.define(name, this, { extends: tagExtends });
  }
}


export class Component extends MixComponent() { constructor () { super(); } }
