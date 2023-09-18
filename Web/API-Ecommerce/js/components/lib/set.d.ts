import Component from "./abstract"
import Get from "./get"
import Set = require("./set")

export const MixTo: <T extends Component>(ClassHMLTElemement: T) => {
  mix: typeof MixTo

  new (...args: any[]): {
    get toThis(): string | null
    get toQuery(): string | null
    set toQuery(value)
    get toProp(): string | null
    set toProp(value)
    get insertTo(): string | null
    set insertTo(value)
    get removeThis(): string | null
    set removeThis(value)
  
    to: HTMLElement
    data: string | null
  }
}
export type MixTo = typeof MixTo
export type To = ReturnType<MixTo>
export const To: To


export as namespace ComponentSet
export default Set
