const domParser = new DOMParser();

const isElementsToLoop = (element, elements) =>
  element instanceof Element &&
  elements instanceof Array

export class Render {
  static getElements(text) {
    const collection = domParser.parseFromString(text, 'text/html').body.children;
    const elements = [];
    for (let i=0; i < collection.length; i++) elements.push(collection[i]);
    return elements;
  }

  /**
   * @param {Element} element
   * @param {Element[]} newElements
   * @param {Element[]} oldElements
   */
  static setElements(element, newElements, oldElements=[]) {
    if (!isElementsToLoop(element, newElements)) return;
    if (!isElementsToLoop(element, oldElements)) return;
    let length = newElements.length;
    if (oldElements.length > length) length = oldElements.length;
    let state = 0;
    let temp = element;
    for (let index = 0; index < length; index++) {
      if (!newElements[index] && !state) state = 1;
      if (!oldElements[index] && !state) state = 2;
      if (state === 1) oldElements[index]?.remove();
      else if (state === 2) {
        if (!temp.isConnected) temp = element;
        temp.insertAdjacentElement('afterend', newElements[index]);
      }
      else oldElements[index].replaceWith(newElements[index]);
      temp = newElements?.[index];
    }
  }

  /**
   * @param {Element} element
   * @param {Element[]} elements
   */
  static clearElements(element, elements) {
    if (!isElementsToLoop(element, elements)) return;
    for (let index = 0; index < elements.length; index++) {
      elements[index].remove();
    }
  }

  #element;
  #text;
  #elements;
  
  constructor(element) {
    if (!(element instanceof Element)) throw TypeError('parameter "element" must be type Element');
    this.#element = element;
    this.#text = null;
    this.#elements = null;
  }
  
  get element() { return this.#element; }
  get text() { return this.#text; }
  get elements() { return this.#elements; }

  /** @param {Element[]} newElements */
  set elements(newElements) {
    const error = TypeError('must be a array of Elements.');
    if (!Array.isArray(newElements)) throw error;

    try { this.#text = newElements.reduce((p, c) => p + c.outerHTML + '\n', ''); }
    catch { throw error; }

    Render.setElements(this.element, newElements, this.#elements ?? []);
    this.#elements = newElements;
  }

  set text(text) {
    if (typeof text === 'string') this.#text = text;
    else throw TypeError('property "text" must be type string.');

    try { this.elements = Render.getElements(this.#text); }
    catch { this.#elements = null; }
  }

  clearElements() {
    Render.clearElements(this.element, this.elements);
  }
}

/** @type {Map<string, import('./render').RenderComponent>} */
const cacheRender = new Map();

export class RenderComponent {
  static getRender(component) {
    if (typeof component === 'object') component = component?.source;
    if (typeof component !== 'string') throw TypeError('paramenter "component" must be type string');
    if (!cacheRender.has(component)) new RenderComponent(component);
    return cacheRender.get(component);
  }

  #source;
  #request;
  #async;
  #text;
  #onload;

  get source() { return this.#source; }
  get request() { return this.#request; }
  get async() { return this.#async; }
  get text() { return this.#text; }
  get onload() { return this.#onload; }

  constructor(component) {
    this.#source = '';
    this.#request = new XMLHttpRequest();
    this.#async = true;
    this.#text = null;
    this.#onload = [];
    if (typeof component === 'object') component = component?.source;
    this.#source = component;
    cacheRender.set(this.source, this);
  }

  set onload(callback) {
    if (typeof callback !== 'function') this.#onload = null;
    this.#onload.push(callback);
  }

  get isReady() {
    const isDone = this.request.readyState === XMLHttpRequest.DONE;
    const status = this.request.status;
    return isDone && (status === 0 || (status >= 200 && status < 400))
  }
  set async(value) { this.#async = !!value; }

  #onloadCalls() {
    this.onload.forEach(callback => callback());
    this.#onload = [];
  }

  load(force=false) {
    if (this.isReady && !force) {
      this.#onloadCalls();
      return;
    }
    try {
      this.request.open('GET', this.source, this.async);
      this.request.onreadystatechange = () => {
        if (!this.isReady) return;
        this.#text = this.request.responseText;
        this.#onloadCalls();
      }
      this.request.send();
    } catch {}
  }

  set source(component) {
    if (typeof component === 'string') this.#source = component;
    else throw TypeError('property "source" must be type string.');
    this.load(true);
  }
}

export default {
  Render, RenderComponent
}
