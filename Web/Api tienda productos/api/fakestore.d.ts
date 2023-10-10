export const url: "https://fakestoreapi.com";

export const routes: {
  users: `${typeof url}/users`
  products: `${typeof url}/products`
  categories: `${typeof url}/products/categories`
}

export interface User {
  id: number,
  email: string,
  username: string,
  password: string,
  name: {
    firstname: string,
    lastname: string
  },
  address: {
    city: string,
    street: string,
    number: number,
    zipcode: string,
    geolocation: {
      lat: string,
      long: string
    }
  },
  phone: string
}

export type Category = string;

export interface Product {
  id: number,
  title: string,
  price: string,
  category: Category,
  description: string,
  image: string
}

export type Users = User[];
export type Products = Product[];
export type Categories = Category[];

export const users: () => Promise<Users>
export const products: () => Promise<Products>
export const categories: () => Promise<Categories>

declare var Default = {
  url,
  routes,
  users,
  products,
  categories
}
export default Default
