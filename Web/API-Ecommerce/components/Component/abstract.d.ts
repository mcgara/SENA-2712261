import { Render, RenderComponent } from './render'

export type ClassHTMLElement<T = HTMLElement> = new (...args: any[]) => T;
export type Component<T = ClassHTMLElement> = {
  mix: MixComponent

  tagName: string,
  tagPrefix: string,
  tagExtends: string

  root: string
  get source(): string
  get render(): RenderComponent

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
    isRunConnected: boolean
    removeOnConnected: boolean
    render: Render
  
    get canBuild(): string
    get noBuild(): boolean
    get canRender(): string
    get noRender(): boolean
    set canBuild(value)
    set noBuild(value)
    set canRender(value)
    set noRender(value)
    
    onRender(onload: () => void): void
    build(): void
    connected(): void
    attributeChanged(name: string, oldValue: string | null, newValue: string | null): void
    disconnected(): void
    // adopted(): void
  }
} & T
export type MixComponent = <T extends ClassHTMLElement>(ClassHTMLElement: T) => Component<T>
export const MixComponent: MixComponent
export const Component: Component
export default Component
