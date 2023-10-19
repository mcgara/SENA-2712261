import Component from './Component/index.js';
import Utils from './Utils/index.js';
import Pages from './Pages/index.js';

import FakeStore, { FakeStoreOnLoad } from './FakeStore.js';
import Product, { ProductGenerator } from './Product.js';
import Category, { CategoryGenerator } from './Category.js';

import SpinnerLoading from './SpinnerLoading.js';

Utils.HTML.Head.define();
Utils.HTML.Body.define();
Utils.HTML.Title.define();
Utils.GetBootstrap.define();

FakeStoreOnLoad.define();

SpinnerLoading.define();

Product.define();
ProductGenerator.define();
Category.define();
CategoryGenerator.define();

Pages.define();

export default {
  Component,
  FakeStore,
  Product
}
