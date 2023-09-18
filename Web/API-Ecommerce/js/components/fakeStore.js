import { Component } from "./lib/index.js";
import { shuffleArray } from "../utils.js";
import { APIFakeStore } from "../api/index.js";
        
export const API = {
  users: APIFakeStore.users().then(users => { shuffleArray(users); return users}),
  products: APIFakeStore.products().then(products => { shuffleArray(products); return products}),
  categories: APIFakeStore.categories().then(categories => { shuffleArray(categories); return categories}),
}

export const MixFakeStore = (MixClassComponent=Component) => class extends MixClassComponent {
  static Mix = MixFakeStore;
  static get tagPrefix() { return "api"; }
  static presetAttributes() {
    this.attributes.add("product-index");
    this.attributes.add("category-index");
  }

  static API = API;

  get productIndex() { return this.getAttribute("product-index"); }
  set productIndex(value) { this.setAttribute("product-index", value); }
  get categoryIndex() { return this.getAttribute("category-index"); }
  set categoryIndex(value) { this.setAttribute("category-index", value); }

  get categories() { return APIFakeStore.categories; }

  get category() {
    return this.categories.then(categories => {
      console.log("Hello", this.categoryIndex)
      if (!this.categoryIndex) this.categoryIndex = APIFakeStore.categoriesIndex();
      let category = String(categories[this.categoryIndex]);
      console.log(categories, category, this.categoryIndex)
      if ((categories[this.categoryIndex] ?? null) === null) category = null;
      return category;
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
      const products = await this.products;
      if (this.productIndex === null) this.productIndex = APIFakeStore.productsIndex[category]();
      let product = APIFakeStore.TJSON.product;
      product = products[this.productIndex];
      return product;
    })
  }
}


export class FakeStore extends MixFakeStore(HTMLDivElement) {
  static tagName = "fakestore";
  static tagExtends = "div";
  
  constructor () { super(); }
}

export default {
  Abstract: FakeStore
}
