import { APIFakeStore as API } from '../api/index.js';
import { shuffleArray } from '../utils/index.js';

/** @typedef {import('../api/fakestore').Product[]} IProducts */

/**
 * @template R
 * @param {(products: IProducts) => R} callback
 */
export const useProducts = (callback, shuffle=true) =>
  API.products()
    .then(products => !shuffle ? products : shuffleArray(products))
    .then(callback);

/** @type {string[]} */
const ArrayOfString = [];

/** @type {Record<string, IProducts>} */
const ProductsPerCategory = {};

/**
 * @template R
 * @param {(products: typeof ProductsPerCategory) => R} callback
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
