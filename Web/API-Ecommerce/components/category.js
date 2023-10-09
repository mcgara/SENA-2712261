import FakeStore from './FakeStore.js';

export default class Category extends FakeStore {
  static get render() { return null; }

  build() {
    this.category.then(category => {
      if (!category) return;
      this.innerHTML = category[0].toUpperCase() + category.slice(1);
    })
  }
}

export class CategoryGenerator extends FakeStore {
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
    if (!query) query = Category.tagPrefix + '-' + Category.tagName;

    const inner = this.innerHTML;
    const numChildren = this.children.length;
    const numElements = this.querySelectorAll(query).length;
    for (let _ = 1; _ < max; _++) this.innerHTML += inner;
    const children = Array.from(this.children);
    const elements = Array.from(this.querySelectorAll(query))
    this.render.elements = children;

    CategoryGenerator.api.categories().then(categories => {
      if (!categories) return;
      let x = 0;
      let c = 0;
      for (let i = 0; i < elements.length; i++) {
        if (i === c + numElements) {
          x++;
          c = i;
        }
        if (!categories[x]) break;
        elements[i].setAttribute('category-index', String(x));
      }
      if (children.length <= categories.length * numChildren) return;
      const removeChildren = children.reverse();
      removeChildren.length = removeChildren.length - categories.length * numChildren;
      removeChildren.forEach(element => element.remove());
    })
  }
}
