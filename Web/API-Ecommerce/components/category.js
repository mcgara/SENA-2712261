import { FakeStore } from "./FakeStore.js";
import Product from "./Product.js";
import Mix from "./mixins.js";

export class Category extends FakeStore {
  static tag = "api-category";
  static extends = "div";

  build() {
    const query = `
      [is^="${Category.tag}-"],
      [is="${Product.Generator.tag}"]
    `;
    this.category.then(category => {
      if (category === null) return;
      const elements = this.querySelectorAll(query);
      elements.forEach(element => {
        element.categoryIndex = this.categoryIndex;
        element.build();
      })
    })
  }

  constructor () { super(); }
}

export class Generator extends Category {
  static tag = "api-category-generator";
  static extends = "div";
  
  build() {
    const inner = this.innerHTML;
    const query = `[is="${Category.tag}"]`;
    this.categories.then(categories => {
      if (categories === null) return;
      this.innerHTML = "";
      categories.forEach(() => this.innerHTML += inner);
      const elements = this.querySelectorAll(query);
      elements.forEach(element => { element.build(); })
    })
  }
  
  constructor () { super(); }
}

export class Title extends Mix.FakeStore(HTMLHeadingElement) {
  static tag = "api-category-title";
  static extends = "h1";
  
  constructor () { super(); }

  build() {
    const cb = cat => cat?.replace(cat?.[0], cat?.[0].toUpperCase())
    this.dataToAttribute(this.category.then(cb));
  }
}

export default {
  Abstract: Category,
  Generator,
  Title
}
