import { Component, ClassHTMLElement } from './Component/abstract'
import FakeStore from './FakeStore'
export type Product<T = FakeStore<Component>> = {
  mix: MixProduct

  new (...args: any[]): {}
} & T
export type MixProduct = <T extends ClassHTMLElement>(ClassHTMLElement: T) => Product<FakeStore<Component<T>>>
export var Product: Product
export var ProductGenerator: FakeStore
export default Product
