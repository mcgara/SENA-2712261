import Component from '../Component/index.js';

// TODO: Component will insert data in a position specific 

export class HTMLHead extends Component {
  static get tagName() { return 'head'; }
  static get render() { return null; }
  removeOnConnected = true;

  build() {
    this.ownerDocument.head.innerHTML += this.innerHTML;
  }
}

export class HTMLBody extends Component {
  static get tagName() { return 'body'; }
  static get render() { return null; }
  removeOnConnected = true;

  build() {
    this.ownerDocument.body.insertAdjacentHTML('beforeend', this.innerHTML);
  }
}

export class HTMLTitle extends Component {
  static get tagName() { return 'title'; }
  static get render() { return null; }
  removeOnConnected = true;

  build() {
    this.ownerDocument.title = this.innerHTML;
  }
}

export default {
  Head: HTMLHead,
  Body: HTMLBody,
  Title: HTMLTitle
}
