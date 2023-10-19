import { Component, ClassHTMLElement } from './Component/abstract'
import { Categories, Category, Products, Product, Users, User } from '../api/fakestore'

export type API = {
  products: () => Promise<Products>
  categories: () => Promise<Categories>
  users: () => Promise<Users>
}

export type FakeStore<T = Component> = {
  mix: MixFakeStore

  get api(): API

  new (...args: any[]): {
    get productID(): string
    set productID(value)
    get productIndex(): string
    set productIndex(value)
    get categoryIndex(): string
    set categoryIndex(value)
    get userID(): string
    set userID(value)
    get userIndex(): string
    set userIndex(value)
  
    get product(): Promise<Product>
    get category(): Promise<Category>
    get user(): Promise<User>
  }
} & T
export type MixFakeStore = <T extends ClassHTMLElement>(ClassHTMLElement: T) => FakeStore<Component<T>>
export var FakeStore: FakeStore
export var FakeStoreOnLoad: FakeStore
export default FakeStore
