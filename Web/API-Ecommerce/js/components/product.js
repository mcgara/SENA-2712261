import { generateRandom, getDeepProperty } from "../utils.js";
import FakeStore from "./fakeStore.js";

/** @type {import('./product').MixProduct} */
export const MixProduct = ClassHTMLElement =>
class Product extends FakeStore.mix(ClassHTMLElement) {
  static mix = MixProduct;

  constructor() { super() }
}

/** @typedef {import('../../api/fakestore.js').Product} IProduct */

export class Product extends MixProduct(HTMLDivElement) {
  static tagName = "product";
  static tagExtends = "div";

  /**
   * @param {Element} element
   * @param {string} data
   */
  setToHTML(element, data) {
    if (element instanceof HTMLImageElement) element.src = data;
    else element.innerHTML = data;
  }

  /** @param {IProduct} product */
  setProduct(product) {
    const elements = this.querySelectorAll(`[${Product.tagName}]`)
    elements.forEach(element => {
      const props = element.getAttribute(Product.tagName)
      const data = getDeepProperty(product, props)
    })
  }
  
  build() {
    this.product.then(product => {
      if (!product) return;
      
    })
  }
}

export const MixProductModal = ClassHTMLElement =>
class ProductModal extends FakeStore.mix(ClassHTMLElement) {
  static get tagName() { return "product"; }
  static get tagExtends() { return "div"; }
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add("product-modal");
    this.attributes.add("modal-open");
  }

  get productModal() { return this.getAttribute("product-modal"); }
  set productModal(value) { this.setAttribute("product-modal", value); }
  get modalOpen() { return this.hasAttribute("modal-open"); }
  set modalOpen(value) { this.setAttribute("modal-open", value); }
  
  delayBuild = { max: 3500, min: 1000 };
  removeToNotFound;
  modal = null;

  constructor () {
    super();
    this.removeToNotFound = true;
    this.modal = null;
  }

  setValueToElement(element=this, key="", value="") {
    value = String(value);
    if (key === "image") element.setAttribute("src", value);
    else element.innerHTML = value;
  }

  isModal() {
    this.modal = this.ownerDocument.querySelector(this.productModal);
  }

  isModalOpen() {
    if (!this.modalOpen || this.modal === null) return;
    this.modal.onclick = () => this.build();
  }

  build() {
    this.isModal();
    this.isModalOpen();
    const query = `[product]`;
    this.product.then(product => {
      const noFound = product === null;
      console.log(product, "thisConsole", this.categoryIndex, this.productIndex)
      if (noFound && this.removeToNotFound) this.remove();
      if (noFound) return;
      const modalElements = Array.from(this.modal?.querySelector(query) ?? []);
      const elements = Array.from(this.querySelectorAll(query));
      elements.concat(...modalElements);
      for (const element of elements) {
        const key = element.getAttribute("product");
        let value = product[key];
        if (key === null || value === null) continue;
        const timeout = generateRandom(this.delayBuild.max, this.delayBuild.min);
        setTimeout(() => this.setValueToElement(element, key, value), timeout);
    }})
  }
}
