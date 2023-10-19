export function shuffleArray(array=[]) {
  const copyArray = [...array];
  for (let i = copyArray.length - 1; i > 0; i--) {
    const temp = copyArray[i];
    const ran = Math.floor(Math.random() * (i + 1));
    copyArray[i] = copyArray[ran];
    copyArray[ran] = temp;
  }
  return copyArray;
}

export function generateRandom(max, min=0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function setCountIndex(length=0) {
  let index = -1;
  length--;
  return () => {
    if (index >= length) return -1;
    return ++index;
  }
}

export function formatString(str, obj) {
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    obj[key] in [null, undefined] ? key : String(obj[key])
  );
}

/** @param {string} props */
export function getDeepProperty(obj, props) {
  const properties = props
    .replace(/(\b(\?\.|\?\.\[["'`])|\w?\[["'`])\b/g, ".")
    .replace(/\b["'`]\]/g, "")
    .split(".");
  for (const prop of properties) {
    if (!prop) continue;
    obj = obj?.[prop];
    if (typeof obj === "undefined") break;
  }
  return obj;
}

/** @type {import('./index').Mix} */
export const Mix = (superclass) => new MixinBuilder(superclass);

/** @type {import('./index').MixinBuilder} */
export class MixinBuilder {
  constructor(superclass) { this.superclass = superclass; }
  with(...mixins) {  return mixins.reduce((c, mixin) => mixin(c), this.superclass); }
}

export function onceCallback(callback) {
  if (typeof callback !== 'function') throw TypeError('parameter callback must be type function');
  let value;
  let onceCall = false;
  return () => {
    if (!onceCall) {
      value = callback();
      onceCall = true;
    }
    return value;
  }
}

export const camelToDash = str =>
  str[0].toLowerCase() +
  str.slice(1).replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);

export const toTitle = str => str?.replace(/\b([a-z])/, first => first.toUpperCase());

export default {
  shuffleArray,
  generateRandom,
  setCountIndex,
  formatString,
  getDeepProperty,
  MixinBuilder,
  Mix,
  onceCallback,
  camelToDash,
  toTitle
}
