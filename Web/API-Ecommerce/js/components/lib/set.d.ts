import Component from "./abstract"
import Get from "./get"
import Set = require("./set")

declare const MixTo: <T extends Component>(ClassHMLTElement: T) => T & {
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
export type MixTo = typeof MixTo
export type To = ReturnType<MixTo>
export const To: To


declare const MixToElement: <T extends To>(ClassHMLTElement: T) => T & {
  mix: typeof MixToElement
}
export type MixToElement = typeof MixToElement
export type ToElement = ReturnType<MixToElement>
export const ToElement: ToElement


declare const MixRequestToElement: <T extends Get.FromRequest & To>(ClassHMLTElement: T) => T & {
  mix: typeof MixRequestToElement
}
export type MixRequestToElement = typeof MixRequestToElement
export type RequestToElement = ReturnType<MixRequestToElement>
export const RequestToElement: RequestToElement


export as namespace ComponentSet
export default Set
