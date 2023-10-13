export function shuffleArray<T>(array: T[]): T[]
export function generateRandom(max: number, min?: number): number
export function setCountIndex(length?: number): number
export function formatString(str: string, obj: object): string
export function getDeepProperty(obj: object, props: string): object
export function onceCallback<T extends () => any>(callback: T): T
export function camelToDash(str: string): string
export function toTitle(str: string): string

export type Constructor<T = {}> = new (...args: any[]) => T

export class MixinBuilder<T extends Constructor> {
  constructor (superclass: T)
  superclass: T
  with<C extends Constructor>(...mixins: Array<(superclass: T) => C>): C
}

export const Mix: <T extends Constructor>(superclass: T) => MixinBuilder<T>
export type Mix = typeof Mix
