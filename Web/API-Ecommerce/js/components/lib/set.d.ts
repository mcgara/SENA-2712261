import Component from "./abstract"
import Get from "./get"
import Set = require("./set")

export type To<T = Component> = T & {

  mix: typeof MixTo

  new (...args: any[]): {
    get toThis(): string
    get toQuery(): string
    set toQuery(value)
    get toProp(): string
    set toProp(value)
    get insertTo(): string
    set insertTo(value)
    get removeThis(): string
    set removeThis(value)
  
    to: HTMLElement | null
    data: string | null
  }
}
declare const MixTo: <T extends Component>(ClassHMLTElement: T) => To<T>
export type MixTo = typeof MixTo
export const To: To

export type ToElement<T = To> = T & {
  mix: typeof MixToElement
}
declare const MixToElement: <T extends To>(ClassHMLTElement: T) => ToElement<T>
export type MixToElement = typeof MixToElement
export const ToElement: ToElement

export type RequestToElement<T = To<Get.FromRequest>> = T & {
  mix: typeof MixRequestToElement
}
declare const MixRequestToElement: <T extends To<Get.FromRequest>>(ClassHMLTElement: T) => RequestToElement<T>
export type MixRequestToElement = typeof MixRequestToElement
export const RequestToElement: RequestToElement


export as namespace ComponentSet
export default Set
