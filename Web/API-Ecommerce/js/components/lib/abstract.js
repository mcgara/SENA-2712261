/** @type {import("./abstract").MixComponent} */
export const MixComponent = ClassHTMLElement =>
// @ts-ignore // Bug: ts(2545)
class extends ClassHTMLElement {
  static mix = MixComponent;
  static get tagName() { return undefined; }
  static get tagPrefix() { return "c"; }
  static get tagExtends() { return undefined; }

  static attributes = new Set(["build", "no-build"]);
  static get observedAttributes() { return Array.from(this.attributes); }
  static presetAttributes() {}

  static define(
    registry=window.customElements,
    prefix=this.tagPrefix,
    name=this.tagName,
    tagExtends=this.tagExtends
  ) {
    let error = "parameter registry must be type CustomElementRegistry";
    if (registry instanceof CustomElementRegistry) error = "";
    if (!prefix) error = "tag prefix not assigned";
    if (!name) error = "no named tag to component";
    if (error) throw TypeError(error);
    name = String(prefix + "-" + name).toLowerCase();
    this.presetAttributes();
    registry.define(name, this, { extends: tagExtends });
  }

  constructor () { super(); }
  
  get toBuild() { return this.getAttribute("build"); }
  set toBuild(value) { this.setAttribute("build", value); }
  get noBuild() { return this.getAttribute("no-build"); }
  set noBuild(value) { this.setAttribute("no-build", value); }
  
  isRunConnectedCallback = false;

  build() {}
  connectedCallback() {
    this.isRunConnectedCallback = true;
  }
  attributeChangedCallback(_name, _oldValue, _newValue) {}
  disconnectedCallback() {}
  adoptedCallback() {}
}

export class Component extends MixComponent(HTMLElement) {}
export default Component;
