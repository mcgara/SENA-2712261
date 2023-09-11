export const MixProduct = (ClassHTMLElement) => class extends MixFakeStore(ClassHTMLElement) {
  keyData;
  toAttribute;

  constructor (keyData, toAttribute=null) {
    super();
    this.keyData = keyData;
    this.toAttribute = toAttribute;
  }

  get dataCallback() {
    return this.product.then(product => product?.[this.keyData] ?? null);
  }

  build() { this.dataToAttribute(this.dataCallback, this.toAttribute); }
}
