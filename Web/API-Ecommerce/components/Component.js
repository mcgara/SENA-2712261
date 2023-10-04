/** @type {Map<string, Render>} */
const cacheRender = new Map();
const domParser = new DOMParser();

const isCollectionToLoop = (element, collection) =>
  element instanceof Element &&
  collection instanceof Array &&
  collection.length > 0

export class Render {
  static getRender(component) {
    if (typeof component === 'object') component = component?.source;
    if (typeof component !== 'string') throw TypeError('paramenter "component" must be type string');
    if (!cacheRender.has(component)) new Render(component);
    return cacheRender.get(component);
  }

  static getElements(text) {
    const collection = domParser.parseFromString(text, 'text/html').body.children;
    const elements = [];
    for (let i=0; i < collection.length; i++) elements.push(collection[i]);
    return elements;
  }

  /**
   * @param {Element} element
   * @param {Element[]} collection
   */
  static setCollectionToElement(element, collection) {
    if (!isCollectionToLoop(element, collection)) return;
    let temp = collection[0];
    element.replaceWith(temp);
    for (let index = 1; index < collection.length; index++) {
      element = temp;
      temp = collection[index];
      element.insertAdjacentElement('afterend', temp);
    }
  }

  /**
   * @param {Element} element
   * @param {Element[]} collection
   */
  static clearCollection(element, collection) {
    if (!isCollectionToLoop(element, collection)) return;
    for (let index = 0; index < collection.length; index++) {
      collection[index].remove();
    }
  }

  /**
   * @param {Element} element
   * @param {Element[]} newCollection
   * @param {Element[]} oldCollection
   */
  static updateCollection(element, newCollection, oldCollection) {
    if (!isCollectionToLoop(element, newCollection)) return;
    if (!isCollectionToLoop(element, oldCollection)) return;
    let length = newCollection.length;
    if (oldCollection.length > length) length = oldCollection.length;
    let state = 0;
    let temp = newCollection[0];
    for (let index = 0; index < length; index++) {
      if (!newCollection[index] && !state) state = 1;
      if (!oldCollection[index] && !state) state = 2;
      if (state === 1) oldCollection[index]?.remove();
      else if (state === 2) temp.insertAdjacentElement('afterend', newCollection[index]);
      else oldCollection[index].replaceWith(newCollection[index]);
      temp = newCollection?.[index];
    }
  }
  
  #source;
  #request;
  #async;
  #text;
  #elements;
  #onload;

  get source() { return this.#source; }
  get request() { return this.#request; }
  get async() { return this.#async; }
  get text() { return this.#text; }
  get elements() { return this.#elements; }
  get onload() { return this.#onload; }

  constructor(component) {
    this.#source = '';
    this.#request = new XMLHttpRequest();
    this.#async = true;
    this.#text = null;
    this.#elements = null;
    this.#onload= null;
    if (typeof component === 'object') component = component?.source;
    this.#source = component;
    cacheRender.set(this.source, this);
  }

  set onload(callback) {
    if (typeof callback !== 'function') this.#onload = null;
    this.#onload = callback;
  }

  get isReady() {
    const isDone = this.request.readyState === XMLHttpRequest.DONE;
    const status = this.request.status;
    return isDone && (status === 0 || (status >= 200 && status < 400))
  }
  set async(value) { this.#async = !!value; }

  loadElements() {
    const elements = Render.getElements(this.text);
    if (!this.#elements) this.#elements = elements;
    return elements;
  }

  set text(text) {
    if (typeof text === 'string') this.#text = text;
    else throw TypeError('property "text" must be type string.');
    this.loadElements();
  }

  load(force=false) {
    if (this.isReady && !force) {
      if (this.onload) this.onload();
      return;
    }
    const elements = this.#elements;
    this.#elements = null;
    try {
      this.request.open('GET', this.source, this.async);
      this.request.onreadystatechange = () => {
        if (!this.isReady) return;
        this.text = this.request.responseText;
        if (this.onload) this.onload();
      }
      this.request.send();
    } catch {
      this.#elements = elements;
    }
  }

  set source(component) {
    if (typeof component === 'string') this.#source = component;
    else throw TypeError('property "source" must be type string.');
    this.load(true);
  }

  /** @param {Element} element */
  setCollectionToElement(element) {
    Render.setCollectionToElement(element, this.elements);
  }
  /** @param {Element} element */
  clearCollection(element) {
    Render.clearCollection(element, this.elements);
  }
  /**
   * @param {Element} element
   * @param {Element[]} newCollection
   */
  updateCollection(element, newCollection) {
    Render.updateCollection(element, newCollection, this.elements);
  }
}

/** @type {import('./Component').MixComponent} */
export const MixComponent = ClassHTMLElement =>
class Component extends ClassHTMLElement {
  static mix = MixComponent;
  static get tagName() { return this.name.toLowerCase(); }
  static get tagPrefix() { return 'c' };
  static get tagExtends() { return null; }

  static source = './components/';
  static get render() {
    return Render.getRender(this.source + this.name + '.html');
  }

  static attributes = new Set(['build', 'no-build', 'render', 'no-render']);
  static get observedAttributes() { return Array.from(this.attributes); }
  static presetAttributes() {}

  static define(
    registry=window.customElements,
    prefix=this.tagPrefix,
    name=this.tagName,
    tagExtends=this.tagExtends
  ) {
    let error = 'parameter registry must be type CustomElementRegistry';
    if (registry instanceof CustomElementRegistry) error = '';
    if (!prefix) error = 'tag prefix not assigned';
    if (!name) error = 'no named tag to component';
    if (error) throw TypeError(error);
    name = String(prefix + '-' + name).toLowerCase();
    this.presetAttributes();
    registry.define(name, this, { extends: tagExtends ?? undefined });
  }

  constructor (...args) { super(...args); }

  get canBuild() { return this.getAttribute('build'); }
  get noBuild() { return this.hasAttribute('no-build'); }
  get canRender() { return this.getAttribute('render'); }
  get noRender() { return this.hasAttribute('no-render'); }
  set canBuild(value) { this.setAttribute('build', value); }
  set noBuild(value) { this.setAttribute('no-build', String(value)); }
  set canRender(value) { this.setAttribute('render', value); }
  set noRender(value) { this.setAttribute('no-render', String(value)); }
  
  isRunConnected = false;

  build() {}
  connected() {}
  attributeChanged(_name, _oldValue, _newValue) {}
  // disconnected() {}
  // adopted() {}

  render(onload=null) {
    /** @type {object} */
    const component = this.constructor;
    let callback = () => component?.render?.setCollectionToElement(this);
    if (typeof onload === 'function') callback = onload;
    component.render.onload = callback;
    component?.render?.load();
  }
  
  preBuild() {
    if (this.noBuild) return;
    this.build();
  }
  preRender() {
    if (this.noRender) return;
    this.render();
  }
  connectedCallback() {
    this.connected();
    if (this.canBuild !== 'no-build') this.preBuild();
    if (this.canRender !== 'no-render') this.preRender();
    this.isRunConnected = true;
  }
  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (!this.isRunConnected) return;
    this.attributeChanged(_name, _oldValue, _newValue);
    this.preBuild();
    this.preRender();
  }
  // disconnectedCallback() {}
  // adoptedCallback() {}
}

export class Component extends MixComponent(HTMLElement) {}
export default Component;
