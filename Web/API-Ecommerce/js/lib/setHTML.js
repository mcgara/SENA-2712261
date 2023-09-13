import { GetComponentToHTML } from "./getComponent.js";
import { Component } from "./component.js"

export class SetToHead extends GetComponentToHTML {
  static get tagName() { return "c-set-head"; }
  static get toTag() { return "head"; }
}

export class SetToBody extends GetComponentToHTML {
  static get tagName() { return "c-set-body"; }
}

export class SetPage extends SetToBody {
  static get tagName() { return "c-set-page"; }
}

export class SetTitle extends Component {
  static get tagName() { return "c-set-title"; }

  build() {
    document.title = this.innerHTML;
    this.remove();
  }
}

