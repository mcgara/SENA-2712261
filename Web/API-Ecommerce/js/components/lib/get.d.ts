import type { Component } from "./abstract"
import Get = require("./get")

export const MixFrom: <T extends Component>(ClassHTMLElement: T) => T & {
  mix: typeof MixFrom
  new (...args: any[]): {
    get fromThis(): string | null
    get fromQuery(): string | null
    set fromQuery(value)
    get fromProp(): string | null
    set fromProp(value)
  
    from: HTMLElement | null
    data: string | null
  }
}
export type MixFrom = typeof MixFrom
export type From = ReturnType<MixFrom>
export const From: From



export const MixFromElement: <T extends From>(ClassHTMLElement: T) => T & {
  mix: typeof MixFromElement
}
export type MixFromElement = typeof MixFromElement
export type FromElement = ReturnType<MixFromElement>
export const FromElement: FromElement



export const MixFromRequest: <T extends Component>(ClassHTMLElement: T) => T & {
  mix: typeof MixFromRequest
  cache: Map<string, XMLHttpRequest>

  new (...args: any[]): {
    get url(): string | null
    set url(value)
    get method(): string | null
    set method(value)
    get sync(): string | null
    set sync(value)
    get username(): string | null
    set username(value)
    get password(): string | null
    set password(value)

    from: XMLHttpRequest
    data: string | null

    requestIsReady(): void
    requestOnChanged(): void
    requestRefresh(): void
  }
}
export type MixFromRequest = typeof MixFromRequest
export type FromRequest = ReturnType<MixFromRequest>
export const FromRequest: FromRequest


export as namespace Get
export default Get
