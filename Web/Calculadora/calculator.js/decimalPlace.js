export class DecimalPlace {
  static #auto = "A";
  static #false = "F";
  static get auto() { return this.#auto; }
  static get false() { return this.#false; }
  static set auto(value) { this.#auto = value.toString(); }
  static set false(value) { this.#false = value.toString(); }

  static #places = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  static get places() { return [this.auto, ...this.#places , this.false]; }
  static set places(value=[]) {
    if (!Array.isArray(value)) return;
    for (let i=0; i < value.length; i++) value[i] = value[i].toString();
    this.#places = value;
  }

  static isPlace(decimal="") { return this.places.includes(decimal.toString()); }
  static place(decimal="") {
    decimal = decimal.toString();
    const num = Number(decimal);
    if (decimal === this.auto) return 2;
    if (!this.isPlace(decimal) || decimal === this.false || isNaN(num)) return 0;
    return num;
  }
}
