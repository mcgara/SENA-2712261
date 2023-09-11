import { Operators } from "./operators.js";
import { DecimalPlace } from "./decimalPlace.js";

export class Expr {
  static #opToParser = {
 // secondary: {
      sqrt: "Operators.resolve(NaN, Operators.sqrt, `<value>`)",
      percent: "Operators.resolve(`<value>`, Operators.percent, `<value>`)",
      negative: "Operators.resolve(NaN, Operators.negative, `<value>`)",
 // },
 // tertiary: {
      times: "*",
      divide: "/",
 // },
  }

  static #RE = Object.values({
    number: "^(?<num>\\d+(\\.(\\d+)?)?)$",
    operators: `^(?<op>[-${Operators.all().join("").replace("-", "")}])$`,
  }).join("|");
  
  static get RE() { return Expr.#RE; }

  static parser(expr="", ...values) {
    expr = String(expr);
    const gp = RegExp(Expr.RE, "u").exec(expr)?.groups;
    const data = gp === undefined ? null : {
      expr: gp.num ?? gp.op ?? "NaN",
      isNumber: gp.num !== undefined,
      isOperator: gp.op !== undefined
    }
    const isOp = data !== null && data.isOperator;
    expr = !isOp ? null : this.#opToParser[Operators.getName(data.expr)] ?? null;
    if (isOp && expr !== null) {
      for (const value in values) expr = expr.replace("`<value>`", String(value));
      expr = expr.replace(/`<value>`/g, "NaN");
      data.expr = expr;
    }
    return data;
  }

  // static parserOperator(expr="") {
    
  // }

  static isExpr(expr) { return expr instanceof Expr; }
  static isValid(expr="") { return Expr.parser(expr) !== null; }

  static toDecimal(value=0, decimal=0) {
    const length = String(value).split(".")[0].length;
    return Number(value).toPrecision(length + decimal);
  }

  #value;
  #parsed;
  #decimal;
  #data;
  #is;
  #next;
  #prev;
  #origin;
  #result;

  #parser(...values) { this.#data = Expr.parser(this.#value, ...values); }
  isValid() { return this.#data !== null; }

  get value() { return this.#value; }
  set value(value) {
    this.#value = String(value);
    this.#parser();
    if (!this.isValid()) throw TypeError(`value '${value}' is not a Expr valid`);
    this.#parsed = "NaN";
    this.#origin = NaN;
    this.#result = NaN;
    const valid = this.isValid();
    this.#is = {
      number: valid && this.#data.isNumber,
      operator: valid && this.#data.isOperator,
    }
  }

  toString() { return this.value; }

  get decimal() { return this.#decimal; }
  set decimal(decimal) { this.#decimal = DecimalPlace.place(decimal); }

  constructor (expr="", decimal="F") {
    this.#value = "";
    this.#parsed = "NaN";
    this.#decimal = 0;
    this.#data = Expr.parser(null);
    this.#is = {
      number: false,
      operator: false,
    }
    this.#next = null;
    this.#prev = null;
    this.#origin = NaN;
    this.#result = NaN;
    this.value = expr;
    this.decimal = decimal;
  }

  get is() { return { ...this.#is }; }
  get prev() { return this.#prev; }
  get next() { return this.#next; }
  set prev(value) { if (Expr.isExpr(value)) this.#prev = value; }
  set next(value) { if (Expr.isExpr(value)) this.#next = value; }

  #isNumber() { this.#origin = Number(this.value); }

  #isOpPercent() { return [this.prev?.prev?.prev, this.prev]; }
  #isOperator() {
    const [left, right] = this.value === Operators.percent
      ? this.#isOpPercent()
      : [this.prev, this.next];
      
    // if (this.value === Operators.equals) this.#isOpEquals();

    return [left, right];
  }

  get parsed() {
    if (this.#parsed === "NaN" && this.isValid()) {
      this.#parser(...this.#isOperator());
      this.#parsed = this.#data.expr;
    }
    return this.#parsed;
  }

  #resolveValue() {
    const [left, right] = this.#isOperator();
    this.#origin = Operators.resolve(
      left?.result ?? NaN,
      this.value,
      right?.result ?? NaN
    );
  }

  get origin() {
    if (isNaN(this.#origin) && this.isValid()) {
      if (this.is.number) this.#isNumber();
      else if (this.is.operator) this.#resolveValue();
    }
    return this.#origin;
  }

  #evaluate() {
    let start = this.prev;
    let evaluate = this.parsed;
    while (Expr.isExpr(start)) {
      evaluate = start.parsed + evaluate;
      start = start.prev;
    }
    this.#result = eval(evaluate); // Warning
    return this.#result;
  }

  get result() { return !isNaN(this.#evaluate()) ? this.#result : this.origin; }

  #toDecimal(value) { return Expr.toDecimal(value, this.decimal); }
  toDecimal() { return this.#toDecimal(this.result); }
  valueToDecimal() { return this.#toDecimal(this.value); }
}

var _Expr = Expr;
Expr = function (value="", decimal="F") { return new _Expr(value, decimal); }
Object.defineProperties(Expr, Object.getOwnPropertyDescriptors(_Expr));

export class Expression {
  static #ExprRE = Expr.RE.replace(/\^/g, "").replace(/\$/g, "");
  static #RE = new RegExp(this.#ExprRE, "gu");
  static get RE() { return Expression.#RE; }
  static #parser(value, sep) {
    return String(value)
      .replace(this.RE, (v) => `${sep}${v}`)
      .split(sep)
      .slice(1);
  }

  static parser(value, sep="<<SP?>>") {
    const parsed = this.#parser(value, sep);
    const isValid = parsed.every(expr => Expr.isValid(expr));
    return isValid ? parsed : null;
  }

  static isValid(value) { return this.parser(value) !== null; }
  static isExpression(value) { return value instanceof Expression; }
  
  #value;
  #toString;
  #decimal;
  #result;
  #length;
  #head;
  #tail;

  get decimal() { return this.#decimal; }
  set decimal(decimal) { this.#decimal = DecimalPlace.place(decimal); }

  clearResult() {
    if (isNaN(this.#result)) return;
    this.#result = NaN;
    const index = this.value.lastIndexOf(` ${Operators.equals} `)
    this.#value = this.value.slice(0, index);
  }

  append(expr=new Expr()) {
    if (Expr.isExpr(expr) && expr.value === "") {
      throw SyntaxError("a value is required in the parameter 'expr'.");
    }
    if (!(Expr.isExpr(expr))) expr = new Expr(String(expr), this.decimal);
    if (this.#head === null) this.#head = expr;
    else {
      this.#tail.next = expr;
      expr.prev = this.#tail;
    }
    this.clearResult();
    this.#length += 1;
    this.#value += expr.value;
    const noSpace = (
      this.#toString === "" ||
      expr.value === Operators.parentheseEnd ||
      Expr.isExpr(this.#tail) && this.#tail.expr === Operators.parentheseStart
    );
    this.#toString += (noSpace ? "" : " ") + expr.value;
    this.#tail = expr;
  }

  concatenate(expressions=["<Param>", new Expr()]) {
    let exprs = expressions;
    if (!Array.isArray(exprs)) exprs = Expression.parser(exprs);
    if (exprs instanceof Expr) exprs = [exprs];
    if (exprs === null || exprs?.[0] === "<Param>" && exprs?.[1].expr === "") return;
    for (const expr of exprs) this.append(expr);
  }

  pop() {
    if (this.length === 0) this.#head = null;
    else this.#length -= 1;
    const tail = this.tail;
    this.tail = this.tail?.prev;
    this.clearResult();
    this.#value = this.value.slice(0, this.value.length - tail.expr.length);
    this.#toString = this.#toString.slice(0, this.#toString.length - tail.expr.length).trimEnd();
    return tail;
  }

  constructor (expressions=["<Param>", new Expr()], decimal="F") {
    this.#decimal = 0;
    this.#value = "";
    this.#toString = "";
    this.#length = 0;
    this.#head = null;
    this.#tail = null;
    this.#result = NaN;
    this.decimal = decimal;
    this.concatenate(expressions);
  }

  get value() { return this.#value; }
  get length() { return this.#length; }
  get head() { return this.#head; }
  get tail() { return this.#tail; }
  set head(value) { this.#head = Expr.isExpr(value) ? value : new Expr(value); }
  set tail(value) { this.#tail = Expr.isExpr(value) ? value : new Expr(value); }
  get result() {
    const resultIsNaN = isNaN(this.#result)
    if (resultIsNaN && Expr.isExpr(this.tail)) this.#result = this.tail.result;
    if (!resultIsNaN && !this.#toString.includes(Operators.equals)) {
      this.#toString += ` ${Operators.equals} ` + Expr.toDecimal(this.#result, this.decimal);
    }
    return this.#result;
  }

  #traverse(callback, nav) {
    if (typeof callback !== "function") return;
    let currentExpr = nav === "next" ? this.#head : this.#tail;
    while (Expr.isExpr(currentExpr)) {
      callback(currentExpr);
      currentExpr = currentExpr[nav];
    }
  }

  traverse(callback=(expr=new Expr()) => {}) { this.#traverse(callback, "next"); }
  traverseRight(callback=(expr=new Expr()) => {}) { this.#traverse(callback, "prev"); }

  toDecimal() { return Expr.toDecimal(this.result, this.decimal); }
  toString() { return this.#toString; }
  valueToString() {
    const result = this.result;
    this.clearResult();
    const value = this.toString();
    this.#result = result;
    this.result;
    return value;
  }
}

var _Expression = Expression;
Expression = function (value="", decimal="F") { return new _Expression(value, decimal); }
Object.defineProperties(Expression, Object.getOwnPropertyDescriptors(_Expression));

// Test

// const a = Expression("500\u00F7(13+5)", 5);
// console.log(a.result, a.toDecimal(), a.expr)

// Warning: Module incompleted for use.
