import { Component, ClassHTMLElement } from './component'
import FakeStore from './fakeStore'
export type Product<T = FakeStore<Component>> = {
  mix: MixProduct

  new (...args: any[]): {}
} & T
export type MixProduct = <T extends ClassHTMLElement>(ClassHTMLElement: T) => Product<FakeStore<Component<T>>>
export const Product: Product
export default Product
