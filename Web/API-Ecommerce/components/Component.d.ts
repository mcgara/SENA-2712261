export class Render {
  static getRender(component: Component | string): Render
  static getElements(text: string): Element[]
  static setCollectionToElement(element: Element, collection: Element[]): void
  static clearCollection(element: Element, collection: Element[]): void

  constructor(component: Component)
  constructor(source: string)

  get source(): string
  set source(value)
  get request(): XMLHttpRequest
  set request(value)
  get async(): boolean
  set async(value)
  get text(): string
  set text(value)
  get elements(): Element[]

  get isReady(): boolean
  load(force?: boolean): void
  get onload(): () => void
  set onload(value)
  loadElements(): void
  setCollectionToElement(element: Element): void
  clearCollection(element: Element): void
}

export type ClassHTMLElement<T = HTMLElement> = new (...args: any[]) => T;
export type Component<T = ClassHTMLElement> = {
  mix: MixComponent

  tagName: string,
  tagPrefix: string,
  tagExtends: string

  source: string
  get render(): Render

  attributes: Set<string>
  get observedAttributes(): string[]
  presetAttributes(): void
  define(
    registry?: CustomElementRegistry,
    prefix?: string,
    name?: string,
    tagExtends?: string
  ): void
  
  new (...args: any[]): {
    isRunConnected: boolean;
  
    get canBuild(): string
    get noBuild(): boolean
    get canRender(): string
    get noRender(): boolean
    set canBuild(value)
    set noBuild(value)
    set canRender(value)
    set noRender(value)
  
    build(): void
    render(onload?: () => void): void
    connected(): void
    attributeChanged(name: string, oldValue: string | null, newValue: string | null): void
    // disconnected(): void
    // adopted(): void
  }
} & T
export type MixComponent = <T extends ClassHTMLElement>(ClassHTMLElement: T) => Component<T>
export const MixComponent: MixComponent
export const Component: Component
export default Component
