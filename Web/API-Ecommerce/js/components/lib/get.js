import Component from "./abstract.js";

/** @type {Get.MixFrom} */
export const MixGetFrom = ClassHTMLElement => 
// @ts-ignore
class From extends ClassHTMLElement {
  static mix = MixGetFrom;
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add("from-this");
    this.attributes.add("from-query");
    this.attributes.add("from-prop");
  }

  get fromThis() { return this.getAttribute("from-this"); }
  get fromQuery() { return this.getAttribute("from-query"); }
  set fromQuery(value) { this.setAttribute("from-query", value); }
  get fromProp() { return this.getAttribute("from-prop"); }
  set fromProp(value) { this.setAttribute("from-prop", value); }

  /** @type {HTMLElement | null} */
  from;
  /** @type {string | null} */
  data;

  constructor () {
    super();
    this.data = null;
    this.from = null;
  }
}

/** @type {Get.MixFromElement} */
export const MixGetFromElement = ClassHTMLElement =>
class FromElement extends ClassHTMLElement {
  static Mix = MixGetFromElement;

  build() {
    if (this.noBuild) return;
    if (this.fromThis) this.from = this;
    if (this.from === null) this.from = this.querySelector(this.fromQuery);
    this.data = this.from?.[this.fromProp] ?? null;
  }
}

/** @type {Get.MixFromRequest} */
export const MixGetFromRequest = ClassHTMLElement =>
// @ts-ignore
class FromRequest extends ClassHTMLElement {
  static mix = MixGetFromRequest;
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add("url");
    this.attributes.add("method");
    this.attributes.add("sync");
    this.attributes.add("username");
    this.attributes.add("password");
  }
  /** @type {Map<string, XMLHttpRequest>} */
  static cache = new Map();

  /** @type {string} */
  data;
  from;

  constructor () {
    super();
    this.from = new XMLHttpRequest();
    this.data = null;
  }

  get url() { return this.getAttribute("url"); }
  set url(value) { this.setAttribute("url", value); }
  get method() { return (this.getAttribute("method") ?? "GET").toUpperCase(); }
  set method(value) { this.setAttribute("method", value); }
  get sync() { return this.getAttribute("sync"); }
  set sync(value) { this.setAttribute("sync", value); }
  get username() { return this.getAttribute("username"); }
  set username(value) { this.setAttribute("username", value); }
  get password() { return this.getAttribute("password"); }
  set password(value) { this.setAttribute("password", value); }

  fromIsReady() {
    const isDone = this.from.readyState === XMLHttpRequest.DONE;
    const status = this.from.status;
    return isDone && (status === 0 || (status >= 200 && status < 400))
  }

  fromOnChanged() {
    if (!this.fromIsReady()) return;
    this.data = this.from.responseText;
    this.build();
  }

  fromRefresh() {
    if (FromRequest.cache.has(this.url)) {
      this.from = FromRequest.cache.get(this.url);
      this.fromOnChanged();
    } else {
      this.from.open(this.method, this.url, this.hasAttribute("sync"), this.username, this.password);
      FromRequest.cache.set(this.url, this.from);
      this.from.onreadystatechange = () => this.fromOnChanged();
      this.from.send();
    }
  }
}

export class GetFrom extends MixGetFrom(Component) {}
export class GetFromElement extends MixGetFromElement(GetFrom) {
  constructor() {
    super()
  }
}
export class GetFromRequest extends MixGetFromRequest(Component) {
  constructor() {
    super()
    this.from
  }
}

export default {
  From: GetFrom,
  FromElement: GetFromElement,
  FromRequest: GetFromRequest
}
