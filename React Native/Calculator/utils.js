/**
 * @template T
 * @param {T} obj
 * @return {T extends Array ? T : T[]}
 */
export function toArray(obj) {
  if (!Array.isArray(obj)) obj = [obj]
  return obj
}
