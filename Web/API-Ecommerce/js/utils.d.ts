export function shuffleArray<T>(array: T[]): T[]
export function generateRandom(max: number, min?: number): number
export function setCountIndex(length?: number): number

export type Constructor<T = {}> = new (...args: any[]) => T

export class MixinBuilder<T extends Constructor> {
  constructor (superclass: T)
  superclass: T
  with<C extends Constructor>(...mixins: Array<(superclass: T) => C>): C
}

export const Mix: <T extends Constructor>(superclass: T) => MixinBuilder<T>
export type Mix = typeof Mix

export as namespace Utils
