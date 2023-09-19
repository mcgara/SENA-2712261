import type { Component } from "./abstract"
import Get = require("./get")

declare const MixFrom: <T extends Component>(ClassHTMLElement: T) => T & {
  mix: typeof MixFrom
  new (...args: any[]): {
    get fromThis(): string
    get fromQuery(): string
    set fromQuery(value)
    get fromProp(): string
    set fromProp(value)
  
    from: HTMLElement | null
    data: string | null
  }
}
export type MixFrom = typeof MixFrom
export type From = ReturnType<MixFrom>
export const From: From



declare const MixFromElement: <T extends From>(ClassHTMLElement: T) => T & {
  mix: typeof MixFromElement
}
export type MixFromElement = typeof MixFromElement
export type FromElement = ReturnType<MixFromElement>
export const FromElement: FromElement



declare const MixFromRequest: <T extends Component>(ClassHTMLElement: T) => T & {
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
export type MixFromRequest = typeof MixFromRequest
export type FromRequest = ReturnType<MixFromRequest>
export const FromRequest: FromRequest


export as namespace Get
export default Get
