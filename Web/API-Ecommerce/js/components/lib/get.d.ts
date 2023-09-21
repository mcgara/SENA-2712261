import type { Component } from "./abstract"
import Get = require("./get")

export type From<T = Component> = T & {
  mix: typeof MixFrom
  new (...args: any[]): {
    get fromThis(): string
    set fromThis(value)
    get fromQuery(): string
    set fromQuery(value)
    get fromProp(): string
    set fromProp(value)
  
    from: HTMLElement | null
    data: string | null
  }
}
declare const MixFrom: <T extends Component>(ClassHTMLElement: T) => From<T>
export type MixFrom = typeof MixFrom
export const From: From



export type FromElement<T = From> = T & {
  mix: typeof MixFromElement
}
declare const MixFromElement: <T extends From>(ClassHTMLElement: T) => FromElement<T>
export type MixFromElement = typeof MixFromElement
export const FromElement: FromElement


export type FromRequest<T = Component> = T & {
  mix: typeof MixFromRequest
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
}
declare const MixFromRequest: <T extends Component>(ClassHTMLElement: T) => FromRequest<T>
export type MixFromRequest = typeof MixFromRequest
export const FromRequest: FromRequest


export as namespace Get
export default Get
