export class Operators {
  static #hierarchy = {
    primary: {
      parentheseStart: "(",
      parentheseEnd: ")"
    },
    secondary: {
      sqrt: "\u221A",
      percent: "\u0025",
      negative: "\u00B1"
    },
    tertiary: {
      times: "\u00D7",
      divide: "\u00F7"
    },
    fourthary: {
      plus: "+",
      minus: "-"
    },
    quintary: {
      equals: "=",
    }
  }

  static #operators = Object.values(this.#hierarchy).reduce((p, c) => { return { ...p, ...c } });

  static get hierarchy() { return { ...this.#hierarchy }; }
  static get operators() { return { ...this.#operators }; }
  static all() { return Object.values(this.#operators); }
  static names() { return Object.keys(this.#operators); }
  static entries() { return Object.entries(this.#operators); }
  static isOperator(op="") { return this.all().includes(String(op)); }
  static isHierarchy(op="", hierarchy="primary") { return Object.values(this.#hierarchy?.[hierarchy]).includes(op); }
  static inHierarchy(op="") { return Object.entries(this.#hierarchy).filter((v) => Object.values(v[1]).includes(op))?.[0]?.[0]; }
  static #get(name, op) { return this.entries().find((v) => v[0] === name || v[1] === op) }
  static getName(op="") { return this.#get(null, op)?.[0] }
  static getOperator(name="") { return this.#get(name, null)?.[1] }

  static #getOp(key) { return String(this.#operators[key]); }
  static get parentheseStart() { return this.#getOp("parentheseStart"); }
  static get parentheseEnd() { return this.#getOp("parentheseEnd"); }
  static get minus() { return this.#getOp("minus"); };
  static get plus() { return this.#getOp("plus"); };
  static get times() { return this.#getOp("times"); };
  static get divide() { return this.#getOp("divide"); };
  static get sqrt() { return this.#getOp("sqrt"); };
  static get percent() { return this.#getOp("percent"); };
  static get equals() { return this.#getOp("equals"); };
  static get negative() { return this.#getOp("negative"); };

  static resolve(left=NaN, operator="", right=NaN) {
    if (
      typeof left !== "number" ||
      typeof right !== "number"
    ) throw TypeError("Operation math parameters 'left' and 'right' must be number type.");
    
    const isLeft = !isNaN(left);
    const isRight = !isNaN(right);
    const op = operator.toString();
    let result = NaN;
    
    if (isRight && op === this.sqrt) result = Math.sqrt(right);
    else if (isRight && op === this.negative) result = right * -1;

    else if (isLeft && op === this.equals) result = left;

    else if (!isLeft && !isRight) result = NaN;
    else if (op === this.plus) result = left + right;
    else if (op === this.minus) result = left - right;
    else if (op === this.times) result = left * right;
    else if (op === this.divide) result = left / right;
    else if (op === this.percent) result = left * right / 100;

    else throw TypeError(`Operator math '${op}' not exists, must be Operator type.`);

    return result;
  }
}
