import FakeStore from './FakeStore.js';

/** @type {import('./Product').MixProduct} */
export const MixProduct = ClassHTMLElement =>
class Product extends FakeStore.mix(ClassHTMLElement) {
  static mix = MixProduct;

  constructor(...args) { super(...args); }
}

/** @typedef {import('../api/fakestore').Product} IProduct */

export default class Product extends MixProduct(HTMLElement) {
  /** @param {IProduct} product */
  renderProduct(product) {
    const parent = this.render.elements[0];
    parent.querySelectorAll('[product]').forEach(element => {
      const key = element.getAttribute('product');
      if (key === 'image') {
        element.setAttribute('src', product.image);
        element.setAttribute('alt', product.title);
      } else element.innerHTML = product[key];
    })
  }
  
  build() {
    this.product.then(product => {
      if (!product) return;
      this.onRender(() => this.renderProduct(product));
    })
  }
}

export class ProductGenerator extends FakeStore {
  static get render() { return null; }
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add('query');
    this.attributes.add('max');
  }

  removeOnConnected = true;

  build() {
    let max = Number(this.getAttribute('max') ?? 1);
    if (Number.isNaN(max) || max < 0) max = 1;
    if (max === 0) {
      this.innerHTML = '';
      return;
    }

    let query = this.getAttribute('query');
    if (!query) query = Product.tagPrefix + '-' + Product.tagName;

    const inner = this.innerHTML
    const numChildren = this.children.length;
    const numElements = this.querySelectorAll(query).length;
    for (let _ = 1; _ < max; _++) this.innerHTML += inner;
    const children = Array.from(this.children);
    const elements = Array.from(this.querySelectorAll(query));
    this.render.elements = children;

    ProductGenerator.api.categories().then(categories =>
      ProductGenerator.api.products().then(allProducts => {
        if (!allProducts || !categories) return;
        let x = 0;
        let c = 0;
        for (let i = 0; i < elements.length; i++) {
          if (i === c + numElements) {
            x++;
            c = i;
          }
          if (!categories[x]) break;
          elements[i].setAttribute('category-index', String(x));
          const products = allProducts.filter(product => product.category === categories[x]);
          if (products.length === 0) break;
          elements[i].setAttribute('product-id', String(products[0].id));
        }
        if (children.length <= categories.length * numChildren) return;
        const removeChildren = children.reverse();
        removeChildren.length = removeChildren.length - categories.length * numChildren;
        removeChildren.forEach(element => element.remove());
      })
    )
  }
}
