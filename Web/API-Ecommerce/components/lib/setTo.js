import { Component } from "./abstract.js";
import GetFrom from "./getFrom.js";

/** @type {import("./setTo").MixSetTo} */
export const MixSetTo = ClassComponent =>
class SetTo extends ClassComponent {
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
  get removeThis() { return this.hasAttribute("remove-this"); }

  /** @type {Element | HTMLElement | null} */
  to;
  /** @type {string | null} */
  data;

  constructor (...args) {
    super(...args);
    this.data = this.data ?? null;
  }

  build() {
    console.log("putass", super.build)
    // console.log("hello asdf Start", this.tagName, this.data)
    if (this.noBuild || this.data === null) return;
    if (this.toThis) this.to = this;
    if (this.to === null) this.to = this.querySelector(this.toQuery);
    if (this.to === null) return;
    
    if (this.insertTo === null) this.insertTo = "inner";
    if (this.toProp) this.to[this.toProp] = this.data;
    else if (this.insertTo === "inner") this.to.innerHTML = this.data;
    else if (this.insertTo === "outer") this.to.outerHTML = this.data;
    // @ts-ignore // insertTo as InsertPosition or implement TypeGuard isInsertPosition
    else this.to.insertAdjacentHTML(this.insertTo, this.data);
    if (!this.toThis && this.removeThis) this.remove();
    // console.log("hello asdf End", this.tagName)
  }
}

/** @type {import("./setTo").MixSetToElement} */
export const MixSetToElement = ClassComponent =>
class SetToElement extends ClassComponent {
  static mix = MixSetToElement;

  connectedCallback() {
    super.connectedCallback();
    // console.log("world asdf End", this.tagName, this.data)
    this.build();
    // console.log("world2 asdf End", this.tagName, this.data)
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (!this.isRunConnectedCallback) return;
    this.build();
  }
}

/** @type {import("./setTo").MixSetRequestTo} */
export const MixSetRequestTo = ClassComponent =>
class SetRequestTo extends ClassComponent {
  static mix = MixSetRequestTo;

  connectedCallback() {
    super.connectedCallback();
    if (this.canBuild) this.fromRefresh();
  }
  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (!this.isRunConnectedCallback) return;
    this.fromRefresh();
  }
}

export class SetTo extends MixSetTo(Component) {}
export class SetToElement extends MixSetToElement(SetTo.mix(Component)) {}
export class SetRequestTo extends MixSetRequestTo(SetTo.mix(GetFrom.Request)) {}

export default {
  Abstract: SetTo,
  Element: SetToElement,
  RequestTo: SetRequestTo
}
