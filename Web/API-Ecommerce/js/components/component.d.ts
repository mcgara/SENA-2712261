export type ClassHTMLElement<T = HTMLElement> = new (...args: any[]) => T;
export type Component<T = ClassHTMLElement> = {
  mix: MixComponent
  get tagName(): string
  get tagPrefix(): string
  get tagExtends(): string
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
    isRunConnectedCallback: boolean;
  
    get canBuild(): boolean
    set canBuild(value)
    get noBuild(): boolean
    set noBuild(value)
  
    build(): void
    connectedCallback(): void
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void
    disconnectedCallback(): void
    adoptedCallback(): void
  }
} & T
export type MixComponent = <T extends ClassHTMLElement>(ClassHTMLElement: T) => Component<T>
export const MixComponent: MixComponent
export const Component: Component
export default Component
