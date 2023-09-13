import { Component } from "./component.js";

export class Get extends Component {
  static get tagName() { return "c-get"; }
  static presetObservedAttributes() {
    this.setObservedAttributes.add("url");
    this.setObservedAttributes.add("method");
    this.setObservedAttributes.add("async");
    this.setObservedAttributes.add("username");
    this.setObservedAttributes.add("password");
  }
  static cache = new Map([["", new XMLHttpRequest()]]);
  static root = "./";

  get url() { return Get.root + this.getAttribute("url"); }
  set url(value) { this.setAttribute("url", value); }
  get method() { return (this.getAttribute("method") ?? "GET").toUpperCase(); }
  set method(value) { this.setAttribute("method", value); }
  get async() { return !!this.getAttribute("async"); }
  set async(value) { this.setAttribute("async", value); }
  get username() { return this.getAttribute("username"); }
  set username(value) { this.setAttribute("username", value); }
  get password() { return this.getAttribute("password"); }
  set password(value) { this.setAttribute("password", value); }

  request;
  setRequest() {
    if (Get.cache.has(this.url)) this.request = Get.cache.get(this.url);
    if (this.request === undefined) this.request = new XMLHttpRequest();
  }
  requestIsReady() {
    const isDone = this.request.readyState === XMLHttpRequest.DONE;
    const status = this.request.status;
    return isDone && (status === 0 || (status >= 200 && status < 400))
  }
  requestHandle() {}
  
  constructor () {
    super();
    if (Get.cache.has(this.url)) this.request = Get.cache.get(this.url);
    if (this.request === undefined) this.request = new XMLHttpRequest();
  }

  build() {
    this.setRequest();
    if (!this.requestIsReady()) {
      this.request.open(this.method, this.url, this.async, this.username, this.password);
    }
    this.request.onreadystatechange = this.requestHandle;
    this.request.send();
  }
}

export class GetComponent extends Get {
  static get tagName() { return "c-get-component"; }
  constructor () { super(); }

  requestHandle() {
    this.innerHTML = this.request.responseText;
  }
}

export class GetComponentToHTML extends GetComponent {
  static get tagName() { return "c-get-component-to"; }
  static presetObservedAttributes() {
    this.setObservedAttributes.add("insert-to");
  }
  static get toTag() { return "body"; }

  get insertTo() { return this.getAttribute("insert-to") ?? "beforeend"; }
  set insertTo(value) { this.setAttribute("insert-to", value); }
  
  constructor () { super(); }

  requestHandle() {
    const tag = GetComponentToHTML.toTag;
    const text = this.request.responseText;
    if (this.insertTo.toLowerCase() === "inner") document[tag].innerHTML = text;
    else try { document[tag]?.insertAdjacentHTML(this.insertTo, text); } catch {}
  }
}
