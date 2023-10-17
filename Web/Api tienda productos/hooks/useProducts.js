import { APIFakeStore as API } from '../api/index.js';
import { shuffleArray } from '../utils/index.js';

/** @typedef {import('../api/fakestore').Product} Product */

/**
 * @template T
 * @param {(products: Product[]) => T} callback
 */
export const useProducts = (callback, shuffle=true) =>
  API.products()
    .then(products => shuffle === true ? shuffleArray(products) : products)
    .then(callback);

/** @type {string[]} */
const ArrayOfString = [];

/** @type {Record<string, Product[]>} */
const ProductsPerCategory = {};

/**
 * @template T
 * @param {(products: typeof ProductsPerCategory) => T} callback
 */
export const useProductsPerCategory = (callback, shuffle=true) =>
  useProducts(products =>
    callback(products
      .reduce((p, c) => p.includes(c.category) ? p : [...p, c.category], ArrayOfString)
      .reduce((p, c) => ({ ...p, [c]: products.filter(product => product.category === c) }), ProductsPerCategory)
    ), shuffle
  );

export default {
  useProducts,
  useProductsPerCategory
}
