export const url = "https://fakestoreapi.com";
export const routes = {
  users: url + "/users",
  products: url + "/products",
  categories: url + "/products/categories"
}

export const products = async () => {
  let listProducts = [];
  try {
    const response = await fetch(routes.products);
    listProducts = await response.json() ?? [];
  } catch {}
  return listProducts;
}

export const categories = async () => {
  let listCategories = [];
  try {
    const response = await fetch(routes.categories);
    listCategories = await response.json() ?? [];
  } catch {}
  return listCategories;
}

export const users = async () => {
  let listUsers = [];
  try {
    const response = await fetch(routes.users);
    listUsers = await response.json() ?? [];
  } catch {}
  return listUsers;
}

export default {
  url,
  routes,
  products,
  categories,
  users
}
