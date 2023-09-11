import FakeStore from './fakeStore.js';
import Product from './product.js';
import Category from './category.js';
import Utils from './utils.js';

const components = [
  FakeStore.Abstract,

  Product.Abstract,
  Product.Generator,
  Product.Title,
  Product.Text,
  Product.Category,
  Product.Price,
  Product.Image,
  Product.Modal,
  Product.OpenModal,
  Product.AddToCart,

  Category.Abstract,
  Category.Generator,
  Category.Title,

  Utils.SetAttrsOnEvent,
  Utils.SetAttrsOnResponse,
]

export function defineComponent(component) {
  if (components.includes(component)) {
    customElements.define(component.tag, component, { extends: component.extends })
  }
}

export function defineAllComponents() {
  for (const component of components) {
    customElements.define(
      component.tag,
      component,
      { extends: component.extends }
    );
  }
}

export default {
  FakeStore,
  Product,
  Category,
  Utils
}
