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

/** @type {Utils.Mix} */
export const Mix = (superclass) => new MixinBuilder(superclass);

/** @type {Utils.MixinBuilder} */
export class MixinBuilder {
  constructor(superclass) { this.superclass = superclass;}
  with(...mixins) {  return mixins.reduce((c, mixin) => mixin(c), this.superclass); }
}

export default {
  shuffleArray,
  generateRandom,
  setCountIndex,
  Mix,
  MixinBuilder
}
