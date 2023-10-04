import Component from './Component.js';
import { shuffleArray, onceCallback } from '../utils/index.js';
import { APIFakeStore } from '../api/index.js';
        
export const API = {
  users: onceCallback(() => APIFakeStore.users().then(users => shuffleArray(users))),
  products: onceCallback(() => APIFakeStore.products().then(products => shuffleArray(products))),
  categories: onceCallback(() => APIFakeStore.categories().then(categories => shuffleArray(categories))),
}

/** @type {import('./FakeStore.js').MixFakeStore} */
export const MixFakeStore = ClassHTMLElement =>
class FakeStore extends Component.mix(ClassHTMLElement) {
  static mix = MixFakeStore;
  static get tagPrefix() { return super.tagPrefix + '-api'; }
  static presetAttributes() {
    super.presetAttributes()
    this.attributes.add('product-index');
    this.attributes.add('category-index');
    this.attributes.add('user-index');
  }

  static get api() { return API; }

  constructor (...args) { super(...args); }

  get productIndex() { return this.getAttribute('product-index'); }
  set productIndex(value) { this.setAttribute('product-index', value); }
  get categoryIndex() { return this.getAttribute('category-index'); }
  set categoryIndex(value) { this.setAttribute('category-index', value); }
  get userIndex() { return this.getAttribute('user-index'); }
  set userIndex(value) { this.setAttribute('user-index', value); }

  get category() {
    return FakeStore.api.categories().then(categories => {
      if (!this.categoryIndex || categories === null) null;
      const index = Number(this.categoryIndex);
      return categories[index] ?? null;
    });
  }

  get product() {
    return this.category.then(async category => {
      if (!this.productIndex || category === null) return null;
      const index = Number(this.productIndex);
      let product = null;
      try {
        product =
          (await FakeStore.api.products())
            .filter(p => p.category === category)[index];
      } catch {}
      return product;
    })
  }

  get user() {
    return FakeStore.api.users().then(users => {
      if (!this.userIndex || users === null) null;
      const index = Number(this.userIndex);
      return users[index] ?? null;
    });
  }
}

export class FakeStore extends MixFakeStore(HTMLElement) {}
export default FakeStore
