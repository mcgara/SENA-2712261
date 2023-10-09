import Component from './Component/index.js';
import { shuffleArray, onceCallback } from '../utils/index.js';
import { APIFakeStore } from '../api/index.js';
        
export const API = {
  users: onceCallback(() => APIFakeStore.users().then(users => shuffleArray(users))),
  products: onceCallback(() => APIFakeStore.products().then(products => shuffleArray(products))),
  categories: onceCallback(() => APIFakeStore.categories().then(categories => shuffleArray(categories))),
}

/** @type {import('./FakeStore').MixFakeStore} */
export const MixFakeStore = ClassHTMLElement =>
class FakeStore extends Component.mix(ClassHTMLElement) {
  static mix = MixFakeStore;
  static get tagPrefix() { return super.tagPrefix + '-api'; }
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add('product-id');
    this.attributes.add('product-index');
    this.attributes.add('category-index');
    this.attributes.add('user-id');
    this.attributes.add('user-index');
  }

  static get api() { return API; }

  constructor (...args) { super(...args); }

  get categoryIndex() { return this.getAttribute('category-index'); }
  set categoryIndex(value) { this.setAttribute('category-index', value); }
  get productID() { return this.getAttribute('product-id'); }
  set productID(value) { this.setAttribute('product-id', value); }
  get productIndex() { return this.getAttribute('product-index'); }
  set productIndex(value) { this.setAttribute('product-index', value); }
  get userID() { return this.getAttribute('user-id'); }
  set userID(value) { this.setAttribute('user-id', value); }
  get userIndex() { return this.getAttribute('user-index'); }
  set userIndex(value) { this.setAttribute('user-index', value); }

  get category() {
    return FakeStore.api.categories()
      .then(categories => categories?.[this.categoryIndex] ?? null);
  }

  get product() {
    if (this.productID) {
      return FakeStore.api.products().then(products => {
        const id = Number(this.productID);
        return products?.filter(product => product.id === id)?.[0] ?? null;
      })
    }
    return this.category.then(category => FakeStore.api.products()
      .then(products => products
        ?.filter(product => product.category === category)
        ?.[this.productIndex] ?? null
    ))
  }

  get user() {
    if (this.userID) {
      return FakeStore.api.users().then(users => {
        const id = Number(this.userID);
        return users?.filter(user => user.id === id)?.[0] ?? null;
      })
    }
    return FakeStore.api.users().then(users => users?.[this.productIndex] ?? null)
  }
}

export default class FakeStore extends MixFakeStore(HTMLElement) {}

export class FakeStoreOnLoad extends FakeStore {
  static get tagName() { return 'onload'; }
  static get render() { return null; }
  removeOnConnected = true;

  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add('onload');
    this.attributes.add('query');
    this.attributes.add('attribute-name');
    this.attributes.add('attribute-value');
  }

  build() {
    const onload = this.getAttribute('onload');
    const query = this.getAttribute('query');
    const attrName = this.getAttribute('attribute-name');
    const attrValue = this.getAttribute('attribute-value');

    if (!(query && attrName)) return;
    const elements = this.ownerDocument.querySelectorAll(query);
    if (elements.length < 1) return;

    let api = FakeStoreOnLoad.api.products;
    if (FakeStoreOnLoad.api[onload]) api = FakeStoreOnLoad.api[onload];

    api().then(() => elements.forEach(element => {
      if (!attrValue) element.toggleAttribute(attrName);
      else element.setAttribute(attrName, attrValue);
    }))
  }
}
