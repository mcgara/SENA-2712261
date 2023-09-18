export type Constructor<T = HTMLElement> = new (...args: any[]) => T;

export const MixComponent: <T extends Constructor>(ClassHTMLElement: T) => T & {
  mix: typeof MixComponent
  get tagName(): string | undefined
  get tagPrefix(): string
  get tagExtends(): string | undefined
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
  
    get toBuild(): string | null
    set toBuild(value)
    get noBuild(): string | null
    set noBuild(value)
  
    build(): void
    connectedCallback(): void
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void
    disconnectedCallback(): void
    adoptedCallback(): void
  }
}
export type MixComponent = typeof MixComponent
export type Component = ReturnType<MixComponent>
export const Component: Component
export default Component
