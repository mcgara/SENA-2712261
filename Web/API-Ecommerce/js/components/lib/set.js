import { Component } from "./abstract.js";
import Get from "./get.js";

/** @type {ComponentSet.MixTo} */
export const MixSetTo = ClassHTMLElement =>
// @ts-ignore
class extends ClassHTMLElement {
  static Mix = MixSetTo;
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

  to;
  data;

  constructor () {
    super();
    if (typeof super.data === "undefined") this.data = null;
    else this.data = super.data;
    this.to = this;
  }

  build() {
    super.build();
    if (this.noBuild || this.data === null) return;

    if (!this.toThis) this.to = null;
    if (this.to === null) this.to = this.querySelector(this.toQuery);
    if (this.to === null) return;

    if (this.toProp) this.to[this.toProp] = this.data;
    else if (this.insertTo === "inner") this.to.innerHTML = this.data;
    else if (this.insertTo === "outer") this.to.outerHTML = this.data;
    else this.to.insertAdjacentHTML(this.insertTo, this.data);
    if (!this.toThis && this.removeThis) this.remove();
  }
}

export const MixSetToElement = (ClassHTMLElement=HTMLElement) =>
class extends MixSetTo(Get.FromElement.mix(ClassHTMLElement)) {
  static Mix = MixSetToElement;

  connectedCallback() {
    super.connectedCallback();
    this.build();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isRunConnectedCallback) return;
    this.build();
  }
}

export const MixSetRequestToElement = (ClassHTMLElement=HTMLElement) =>
class extends MixSetTo(Get.FromRequest.mix(ClassHTMLElement)) {
  static Mix = MixSetRequestToElement;

  get toThis() { return !this.hasAttribute("to-query"); }
  get insertTo() { return this.getAttribute("insert-to") ?? "inner"; }

  connectedCallback() {
    super.connectedCallback();
    if (this.toBuild) this.requestRefresh();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isRunConnectedCallback) return;
    this.requestRefresh();
  }
}

export class SetTo extends MixSetTo() {}
export class SetToElement extends MixSetToElement() {}
export class SetRequestToElement extends MixSetRequestToElement() {}

export default {
  To: SetTo,
  ToElement: SetToElement,
  RequestToElement: SetRequestToElement
}
