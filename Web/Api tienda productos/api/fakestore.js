import { onceCallback } from '../utils/index.js';

export const url = "https://fakestoreapi.com";
export const routes = {
  users: url + "/users",
  products: url + "/products",
  categories: url + "/products/categories"
}

async function fetchFakeStore(route) {
  let listElements = [];
  try {
    const response = await fetch(route);
    listElements = await response.json() ?? [];
  } catch {}
  return listElements;
}

export const users = onceCallback(async () => await fetchFakeStore(routes.users))
export const products = onceCallback(async () => await fetchFakeStore(routes.products))
export const categories = onceCallback(async () => await fetchFakeStore(routes.categories))

export default {
  url,
  routes,
  products,
  categories,
  users
}
