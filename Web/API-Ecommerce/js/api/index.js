import TJSON from './jsonTemplates.js';
import { shuffleArray, setCountIndex } from '../utils.js';

export const APIProducts = (async function () {
  const response = await fetch("https://fakestoreapi.com/products"); // Api response Error 502 Bad GateWay.
  // const response = await fetch("https://api.escuelajs.co/api/v1/products"); // Api EscuelaJS

  let products = [TJSON.product];
  let data = { [String()]: products }
  delete data[String()];

  products = await response.json();
  products.forEach((product) => {
    // product.category = product.category.name; // Api EscuelaJS
    // product.image = product.images[0]; // Api EscuelaJS
    if (data[product.category] === undefined) data[product.category] = []; 
    else data[product.category].push(product);
  })

  for (const category in data) shuffleArray(data[category]);
  return data;
})()

export const APICategories = (async function () {
  const categories = Object.keys(await products);
  shuffleArray(categories);
  return categories;
})()

export const APICategoriesIndex = setCountIndex();
export const APIProductsIndex = { [String()]: setCountIndex() };

delete APIProductsIndex[String()];

APICategories.then(categories => {
  APICategoriesIndex = setCountIndex(categories.length)
});

APIProducts.then(products => {
  for (const category in products) {
    APIProductsIndex[category] = setCountIndex(products[category].length);
  }
});

export default {
  products: APIProducts,
  productsIndex: APIProductsIndex,
  categories: APICategories,
  categoriesIndex: APICategoriesIndex,
}
