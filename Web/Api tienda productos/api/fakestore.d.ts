export const url: "https://fakestoreapi.com";

export const routes: {
  users: `${typeof url}/users`
  products: `${typeof url}/products`
  categories: `${typeof url}/products/categories`
}

export interface User {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  },
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  },
  phone: string
}

export type Category = string;

export interface Product {
  id: number
  title: string
  price: number
  category: Category
  description: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export const users: () => Promise<User[]>
export const products: () => Promise<Product[]>
export const categories: () => Promise<Category[]>

declare var Default = {
  url,
  routes,
  users,
  products,
  categories
}
export default Default
