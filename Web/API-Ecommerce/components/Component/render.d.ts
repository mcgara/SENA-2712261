import { Component } from './abstract'

export class Render {
  static setElements(element: Element, newCollection: Element[], oldCollection: Element[]): void
  static clearElements(element: Element, collection: Element[]): void

  constructor(element: Element)

  get element(): Element
  set element(value)
  get text(): string
  set text(value)
  get elements(): Element[]
  set elements(newElements: Element[])

  clearElements(): void
}

export class RenderComponent {
  static getRender(component: Component | string): RenderComponent

  constructor(component: Component)
  constructor(source: string)

  get source(): string
  set source(value)
  get request(): XMLHttpRequest
  set request(value)
  get async(): boolean
  set async(value)
  get text(): string

  get isReady(): boolean
  load(force?: boolean): void
  get onload(): Array<() => void>
  set onload(value: () => void)
}

declare var Default: {
  Render: Render
  RenderComponent: RenderComponent,
}

export default Default
