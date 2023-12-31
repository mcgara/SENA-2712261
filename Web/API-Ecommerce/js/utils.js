export function shuffleArray(array=[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const temp = array[i];
    const ran = Math.floor(Math.random() * (i + 1));
    array[i] = array[ran];
    array[ran] = temp;
  }
  return array;
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
  )
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

/** @type {import('./utils').Mix} */
export const Mix = (superclass) => new MixinBuilder(superclass);

/** @type {import('./utils').MixinBuilder} */
export class MixinBuilder {
  constructor(superclass) { this.superclass = superclass;}
  with(...mixins) {  return mixins.reduce((c, mixin) => mixin(c), this.superclass); }
}

export default {
  shuffleArray,
  generateRandom,
  setCountIndex,
  formatString,
  getDeepProperty,
  MixinBuilder,
  Mix
}
