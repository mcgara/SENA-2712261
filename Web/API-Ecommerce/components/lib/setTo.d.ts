import Component from "./abstract"
import { GetFromElement, GetFromRequest } from "./getFrom"

export type SetTo<T = Component> = {
  mix: MixSetTo
  
  new (...args: any[]): {
    get toThis(): boolean
    get toQuery(): string
    set toQuery(value)
    get toProp(): string
    set toProp(value)
    get insertTo(): string
    set insertTo(value)
    get removeThis(): boolean
  
    to: Document | Element | HTMLElement | null
    data: string | null
  }
} & T
export type MixSetTo = <T extends Component>(ClassComponent: T) => SetTo<T>

export type SetToElement<T = SetTo> = {
  mix: MixSetToElement
} & T
export type MixSetToElement = <T extends SetTo>(ClassComponent: T) => SetToElement<T>

export type SetRequestTo<T = SetTo<GetFromElement>> = {
  mix: MixSetRequestTo
} & T
export type MixSetRequestTo = <T extends SetTo<GetFromRequest>>(ClassComponent: T) => SetRequestTo<T>


declare const Module: {
  Abstract: SetTo
  Element: SetToElement
  RequestTo: SetRequestTo
}
export default Module
