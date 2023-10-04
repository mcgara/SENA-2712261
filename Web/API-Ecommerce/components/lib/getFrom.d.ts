import type { Component } from "./abstract"

export type GetFrom<T = Component> = {
  mix: MixGetFrom
  
  new (...args: any[]): {
    get fromThis(): boolean
    get fromQuery(): string
    set fromQuery(value)
    get fromProp(): string
    set fromProp(value)
  
    from: Document | Element | HTMLElement | null
    data: string | null
  }
} & T
export type MixGetFrom = <T extends Component>(ClassComponent: T) => GetFrom<T>

export type GetFromElement<T = GetFrom> = {
  mix: MixGetFromElement
} & T
export type MixGetFromElement = <T extends GetFrom>(ClassComponent: T) => GetFromElement<T>


export type GetFromRequest<T = Component> = {
  mix: MixGetFromRequest
  cache: Map<string, XMLHttpRequest>

  new (...args: any[]): {
    get url(): string
    set url(value)
    get method(): string
    set method(value)
    get sync(): string
    set sync(value)
    get username(): string
    set username(value)
    get password(): string
    set password(value)

    from: XMLHttpRequest
    data: string | null

    fromIsReady(): void
    fromOnChanged(): void
    fromRefresh(): void
  }
} & T
export type MixGetFromRequest = <T extends Component>(ClassComponent: T) => GetFromRequest<T>

declare const Module: {
  Abstract: GetFrom
  Element: GetFromElement
  Request: GetFromRequest
}
export default Module
