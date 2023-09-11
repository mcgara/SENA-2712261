export const MixComponent = (ClassHTMLElement=HTMLElement) => class extends ClassHTMLElement {
  static get tagName() { return "c-component"; }
  static get extends() { return null; }
  static get observedAttributes() { return []; }
  
  constructor () {
    super();
  }

  connectedCallback() { return; }
  disconnectedCallback() { return; }
  adoptedCallback() { return; }
  attributeChangedCallback(name, oldValue, newValue) { return; }
}

export class Component extends MixComponent() {
  constructor () { super(); }
}
