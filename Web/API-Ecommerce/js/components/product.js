import { generateRandom } from '../utils.js';
import { FakeStore } from './fakeStore.js';
import Mix from './mixins.js';

export class Product extends FakeStore {
  static tag = "api-product";
  static extends = "div";
  
  delayBuild = { max: 3500, min: 1000 };
  removeToNotFound = true;

  build() {
    const query = `[is^="${Product.tag}-"]`;
    this.product.then(product => {
      const noFound = product === null;
      if (noFound && this.removeToNotFound) this.remove();
      if (noFound) return;
      const elements = this.querySelectorAll(query);
      for (const element of elements) {
        element.categoryIndex = this.categoryIndex;
        element.productIndex = this.productIndex;
        const timeout = generateRandom(this.delayBuild.max, this.delayBuild.min);
        setTimeout(() => element.build(), timeout);
    }})
  }

  constructor () { super(); }
}

export class Generator extends Product {
  static tag = "api-product-generator";
  static extends = "div";
  
  build() {
    const query = `[is="${Product.tag}"]`;
    const inner = this.innerHTML;
    this.innerHTML = "";
    this.products.then(products => {
      if (products === null) return;
      products.forEach(() => this.innerHTML += inner);
      const elements = this.querySelectorAll(query);
      elements.forEach(element => {
        element.categoryIndex = this.categoryIndex;
        element.build();
      })
    })
  }
  
  constructor () { super(); }
}

export class Title extends Mix.Product(HTMLHeadingElement) {
  static tag = "api-product-title";
  static extends = "h1";

  constructor () { super("title"); }
}

export class Text extends Mix.Product(HTMLParagraphElement) {
  static tag = "api-product-text";
  static extends = "p";
  
  constructor () { super("description"); }
}

export class Category extends Mix.Product(HTMLParagraphElement) {
  static tag = "api-product-category";
  static extends = "p";
  
  constructor () { super("category"); }
}

export class Price extends Mix.Product(HTMLParagraphElement) {
  static tag = "api-product-price";
  static extends = "p";
  
  constructor () { super(); }
  
  get dataCallback() {
    return this.product.then(product => {
      if ((product?.price ?? null) === null) return null;
      return "$ " + product.price;
    });
  }
}

export class Image extends Mix.Product(HTMLImageElement) {
  static tag = "api-product-img";
  static extends = "img";
  
  constructor () { super("image", "src"); }

  build() {
    this.dataToAttribute(this.dataCallback, this.toAttribute);
    const callbackAlt = this.product.then(product => product?.title ?? null);
    this.dataToAttribute(callbackAlt, "alt");
  }
}

export class Modal extends Product {
  static tag = "api-product-modal";
  static extends = "div";

  #initInnerHTML = "";
  #isFirstOpen = true;

  #clear(mutations=[new MutationRecord()]) {
    mutations.forEach(mutation => {
      if (
        mutation.attributeName === "style" &&
        this.style.display === "none"
      ) this.innerHTML = this.#initInnerHTML;
    });
  }

  #observerToClear() {
    const mutation = new MutationObserver(this.#clear);
    mutation.observe(this, { attributes: true });
  }

  constructor () {
    super();
    this.initBuild;
  }

  beforeBuild() {
    this.#initInnerHTML = this.innerHTML;
    this.#isFirstOpen = true;
    this.#observerToClear();
  }

  build() {
    if (this.#isFirstOpen) this.#isFirstOpen = false;
    else this.delayBuild = { max: 700, min: 400 }
    super.build();
  }
}

export class OpenModal extends Product {
  static tag = "api-product-modal-open";
  static extends = "div";
  
  #isFirstOpen;
  #modal;

  constructor () {
    super();
    this.#modal = null;
    this.#isFirstOpen = true;
    this.noRunBuild = true;
    this.onclick = this.build;
    console.log("Hello world")
  }

  get toModal() { return this.getAttribute("to-modal"); }
  set toModal(value) {
    if (value === this.toModal) return;
    this.setAttribute("to-modal", value);
    this.#modal = null;
    this.#isFirstOpen = true;
  }

  validModal() {
    this.#modal = document.querySelector(this.toModal);
    return this.#modal !== null;
  }

  build() {
    if (this.#modal === null && !this.validModal()) return;
    this.#modal.productIndex = this.productIndex;
    this.#modal.categoryIndex = this.categoryIndex;
    if (typeof this.#modal?.build !== "function") return;
    if (this.#isFirstOpen) this.#isFirstOpen = false;
    else this.#modal.delayBuild = { max: 500, min: 0 }
    this.product.then(() => this.#modal.build());
  }
}

export class AddToCart extends Mix.Product(HTMLButtonElement) {
  static tag = "api-product-add-cart";
  static extends = "button";
  
  constructor () { super(); }

  addToCard() {
    this.product.then(product => {
      alert(`Producto '${product.title}' añadido al carrito.`);
    })
  }

  build() {
    this.addEventListener("click", this.addToCard);
  }
}

export default {
  Abstract: Product,
  Generator,
  Title,
  Text,
  Category,
  Price,
  Image,
  Modal,
  OpenModal,
  AddToCart
}
