import APIFakeStore from '../../api.js';

export const MixFakeStore = ClassHTMLElement => class extends ClassHTMLElement {
  build() { return; }

  initBuild() {
    if (this.getAttribute("build") !== null) this.build();
  }

  constructor () {
    super();
    initBuild();
  }

  get productIndex() { return this.getAttribute("product-index"); }
  set productIndex(value) { this.setAttribute("product-index", value); }
  get categoryIndex() { return this.getAttribute("category-index"); }
  set categoryIndex(value) { this.setAttribute("category-index", value); }

  get categories() { return APIFakeStore.categories; }

  get category() {
    return this.categories.then(categories => {
      if (this.categoryIndex === null) this.categoryIndex = APIFakeStore.indexCategories();
      return categories?.[this.categoryIndex] ?? null
    });
  }

  get products() {
    return this.category.then(async category => {
      const products = await APIFakeStore.products;
      return products?.[category] ?? null;
    });
  }

  get product() {
    return this.category.then(async category => {
      if (category === null) return null;
      const products = await this.products
      if (this.productIndex === null) this.productIndex = APIFakeStore.indexProducts[category]();
      return products?.[this.productIndex] ?? null;
    })
  }

  dataToAttribute(data, toAttribute=null) {
    if (data === null || data === undefined) return;
    toAttribute = toAttribute ?? "innerHTML";

    if (data instanceof Promise) data.then(value => this[toAttribute] = value);
    else if (typeof data === "function") this[toAttribute] = data();
    else this[toAttribute] = data;
  }
}
