export const MixComponent = (ClassHTMLElement=HTMLElement) => class extends ClassHTMLElement {
  static Mix = MixComponent;
  static setObservedAttributes = new Set(["build", "no-build"]);
  static get observedAttributes() { return Array.from(this.setObservedAttributes); }
  static get tagName() { return "c-component"; }
  static get tagExtends() { return undefined; }

  get toBuild() { return this.getAttribute("build") !== "no-build"; }
  set toBuild(value) { this.setAttribute("build", value); }
  get noBuild() { return this.getAttribute("no-build") !== null; }
  set noBuild(value) { this.setAttribute("no-build", value); }

  presetBuild() {}
  build() {}

  constructor () {
    super();
    this.presetBuild();
    if (this.noBuild) return;
    if (this.toBuild) this.build();
  }

  connectedCallback() {}
  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {}

  static presetObservedAttributes() {}

  static presetDefine() {}

  static define(registry=window.customElements, name=this.tagName, tagExtends=this.tagExtends) {
    this.presetDefine();
    this.presetObservedAttributes();
    registry.define(name, this, { extends: tagExtends });
  }
}

export class Component extends MixComponent() {}
