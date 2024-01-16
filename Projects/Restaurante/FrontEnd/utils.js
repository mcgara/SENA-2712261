/**
 * @template {(...args: any) => any} T
 * @param {T} callback
 * @return {T}
 */
export function onceCallback(callback) {
  if (typeof callback !== 'function') throw TypeError('parameter callback must be type function');
  let value;
  let onceCall = false;
  return (...args) => {
    if (!onceCall) {
      value = callback(...args);
      onceCall = true;
    }
    return value;
  }
}

/**
 * @template T
 * @param {T} obj
 * @return {T extends Array ? T : T[]}
 */
export function toArray(obj) {
  if (!Array.isArray(obj)) obj = [obj]
  return obj
}

export default {
  onceCallback,
  toArray
}
