import { GetComponentToHTML } from "./get";
import { Component } from "./component.js"

export class SetToHead extends GetComponentToHTML {
  static get tagName() { return "c-set-head"; }
  static get toTag() { return "head"; }
  constructor () { super(); }
}

export class SetToBody extends GetComponentToHTML {
  static get tagName() { return "c-set-body"; }
  constructor () { super(); }
}

export class SetPage extends GetComponentToHTML {
  static get tagName() { return "c-set-page"; }
  constructor () { super(); }
}

export class SetTitle extends Component {
  static get tagName() { return "c-set-title"; }
  constructor () { super(); }

  build() {
    document.title = this.innerHTML;
    this.remove();
  }
}

