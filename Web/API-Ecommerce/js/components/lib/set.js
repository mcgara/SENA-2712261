import { Component } from "./abstract.js";
import Get from "./get.js";

/** @type {ComponentSet.MixTo} */
export const MixSetTo = ClassHTMLElement =>
// @ts-ignore
class extends ClassHTMLElement {
  static mix = MixSetTo;
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add("to-this");
    this.attributes.add("to-query");
    this.attributes.add("to-prop");
    this.attributes.add("insert-to");
    this.attributes.add("remove-this");
  }

  get toThis() { return this.hasAttribute("to-this"); }
  get toQuery() { return this.getAttribute("to-query"); }
  set toQuery(value) { this.setAttribute("to-query", value); }
  get toProp() { return this.getAttribute("to-prop"); }
  set toProp(value) { this.setAttribute("to-prop", value); }
  get insertTo() { return this.getAttribute("insert-to") ?? "beforeend"; }
  set insertTo(value) { this.setAttribute("insert-to", value); }
  get removeThis() { return this.getAttribute("remove-this"); }
  set removeThis(value) { this.setAttribute("remove-this", value); }

  /** @type {HTMLElement | null} */
  to;
  /** @type {string | null} */
  data;

  constructor () {
    super();
    this.data = this.data ?? null
    this.to = this
  }

  build() {
    super.build();
    if (!this.noBuild || this.data === null) return;
    if (!this.toThis) this.to = null;
    if (this.to === null) this.to = this.querySelector(this.toQuery);
    if (this.to === null) return;

    if (this.insertTo === null) this.insertTo = "inner";
    if (this.toProp) this.to[this.toProp] = this.data;
    else if (this.insertTo === "inner") this.to.innerHTML = this.data;
    else if (this.insertTo === "outer") this.to.outerHTML = this.data;
    // @ts-ignore // insertTo as InsertPosition or implement TypeGuard
    else this.to.insertAdjacentHTML(this.insertTo, this.data);
    if (!this.toThis && this.removeThis) this.remove();
  }
}

/** @type {ComponentSet.MixToElement} */
export const MixSetToElement = ClassHTMLElement =>
class extends ClassHTMLElement {
  static mix = MixSetToElement;

  connectedCallback() {
    super.connectedCallback();
    this.build();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (!this.isRunConnectedCallback) return;
    this.build();
  }
}

/** @type {ComponentSet.MixRequestToElement} */
export const MixSetRequestToElement = ClassHTMLElement =>
class extends ClassHTMLElement {
  static mix = MixSetRequestToElement;

  connectedCallback() {
    super.connectedCallback();
    if (this.toBuild) this.fromRefresh();
  }
  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (!this.isRunConnectedCallback) return;
    this.fromRefresh();
  }
}

export class SetTo extends MixSetTo(Component) {}
export class SetToElement extends MixSetToElement(SetTo) {}
class B extends Get.FromRequest.mix(HTMLImageElement) {
  constructor () {
    super()
    this.fr
  }
}
export class SetRequestToElement extends MixSetRequestToElement(MixSetTo()) {
  constructor () {
    super()
    this.src
    this.from
  }
}

export default {
  To: SetTo,
  ToElement: SetToElement,
  RequestToElement: SetRequestToElement
}
