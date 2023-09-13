import { Component } from "./component.js";

export const MixGetComponent = ClassHTMLElement => class extends Component.Mix(ClassHTMLElement) {
  static get tagName() { return "c-get-component"; }
  static presetObservedAttributes() {
    this.setObservedAttributes.add("url");
    this.setObservedAttributes.add("method");
    this.setObservedAttributes.add("async");
    this.setObservedAttributes.add("username");
    this.setObservedAttributes.add("password");
    this.setObservedAttributes.add("insert-to");
    this.setObservedAttributes.add("no-remove");
  }
  static cache = new Map([["", new XMLHttpRequest()]]);
  static root = "./";

  constructor () { super(); }

  get url() { return this.constructor.root + this.getAttribute("url"); }
  set url(value) { this.setAttribute("url", value); }
  get method() { return (this.getAttribute("method") ?? "GET").toUpperCase(); }
  set method(value) { this.setAttribute("method", value); }
  get async() { return !!this.getAttribute("async"); }
  set async(value) { this.setAttribute("async", value); }
  get username() { return this.getAttribute("username"); }
  set username(value) { this.setAttribute("username", value); }
  get password() { return this.getAttribute("password"); }
  set password(value) { this.setAttribute("password", value); }
  get insertTo() { return (this.getAttribute("insert-to") ?? "afterbegin").toLowerCase(); }
  set insertTo(value) { this.setAttribute("insert-to", value); }
  get noRemove() { return this.getAttribute("no-remove") !== null; }
  set noRemove(value) { this.setAttribute("no-remove", value); }
  get dataFromInner() { return this.getAttribute("data-from-inner") !== null; }
  set dataFromInner(value) { this.setAttribute("data-from-inner", value); }

  request = new XMLHttpRequest();
  
  presetBuild() {
    this.request = new XMLHttpRequest();
  }

  requestIsReady() {
    const isDone = this.request.readyState === XMLHttpRequest.DONE;
    const status = this.request.status;
    return isDone && (status === 0 || (status >= 200 && status < 400))
  }

  requestHandle() {}

  build() {
    
    this.request.open(this.method, this.url, this.async, this.username, this.password);
    this.request.onreadystatechange = () => {
      if (!this.requestIsReady()) return;
      this.requestHandle();
    }
    this.request.send();
  }
}

export class GetComponent extends MixGetComponent() {} 

export class GetComponentToHTML extends GetComponent {
  static get tagName() { return "c-get-component-html"; }
  static get toTag() { return "body"; }

  requestHandle() {
    const tag = GetComponentToHTML.toTag;
    const text = this.request.responseText;
    if (this.insertTo.toLowerCase() === "inner") document[tag].innerHTML = text;
    else if (this.insertTo.toLowerCase() === "outer") document[tag].outerHTML = text;
    else try { document[tag]?.insertAdjacentHTML(this.insertTo, text); } catch {}
    if (!this.noRemove) this.remove();
  }
}
