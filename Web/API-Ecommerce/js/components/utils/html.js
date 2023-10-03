import { FromElementToElement, FromRequestToElement } from "./fromTo.js";

/**
 * @template {typeof HTMLElement} T
 * @param {T} ClassHTMLElement
 * @return {ReturnType<typeof FromElementToElement<T>>}
 */
export const HTMLMainTags = ClassHTMLElement =>
class MainTag extends FromElementToElement(ClassHTMLElement) {
  get fromThis() { return true; }
  get fromProp() { return this.getAttribute("from-prop") ?? "innerHTML"; }
  get toThis() { return false; }
  get removeThis() { return true; }
}

export class HTMLHead extends HTMLMainTags(HTMLElement) {
  static get tagName() { return "head"; }

  constructor () {
    super();
    this.to = this.ownerDocument.head;
  }
}

export class HTMLBody extends HTMLMainTags(HTMLElement) {
  static get tagName() { return "body"; }

  constructor () {
    super();
    this.to = this.ownerDocument.body;
  }
}

export class HTMLTitle extends HTMLMainTags(HTMLTitleElement) {
  static get tagName() { return "title" }
  static get tagExtends() { return "title" }

  get fromProp() { return "innerHTML"; }
  get toProp() { return "title"; }

  constructor () {
    super();
    this.to = this.ownerDocument;
  }
}

export class HTMLPage extends FromRequestToElement(HTMLElement) {
  static get tagName() { return "page"; }

  get insertTo() { return "outer"; }
  get canBuild() { return true; }

  constructor () {
    super();
    this.to = this.ownerDocument.body;
  }
}

export class HTMLPart extends FromRequestToElement(HTMLElement) {
  static get tagName() { return "part"; }
  get toThis() { return true; }
  get canBuild() { return true; }
}

export default {
  Head: HTMLHead,
  Body: HTMLBody,
  Title: HTMLTitle,
  Page: HTMLPage,
  Part: HTMLPart
}
