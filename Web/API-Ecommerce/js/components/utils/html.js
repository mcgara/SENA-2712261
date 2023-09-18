import Component from "../lib/index.js";

export const HTMLBasicTags = ClassHTMLElement => class extends Component.Set.ToElement.Mix(ClassHTMLElement) {
  get fromThis() { return true; }
  get fromProp() { return super.fromProp ?? "innerHTML"; }
  get toThis() { return false; }
  get removeThis() { return true; }
}

export class HTMLHead extends HTMLBasicTags() {
  static get tagName() { return "head"; }

  constructor () {
    super();
    this.to = this.ownerDocument.head;
  }
}

export class HTMLBody extends HTMLBasicTags() {
  static get tagName() { return "body"; }

  constructor () {
    super();
    this.to = this.ownerDocument.body;
  }
}

export class HTMLTitle extends HTMLBasicTags(HTMLTitleElement) {
  static get tagName() { return "title" }
  static get tagExtends() { return "title" }

  get fromProp() { return "innerHTML"; }
  get toProp() { return "title"; }

  constructor () {
    super();
    this.to = this.ownerDocument;
  }
}

export class HTMLPage extends Component.Set.RequestToElement {
  static get tagName() { return "page"; }

  get toThis() { return false; }
  get removeThis() { return true; }

  constructor () {
    super();
    this.to = this.ownerDocument.body;
  }
}

export class HTMLPart extends Component.Set.RequestToElement {
  static get tagName() { return "part"; }
}

export default {
  Head: HTMLHead,
  Body: HTMLBody,
  Title: HTMLTitle,
  Page: HTMLPage,
  Part: HTMLPart
}
