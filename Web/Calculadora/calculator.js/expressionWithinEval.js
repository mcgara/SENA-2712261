import { Operators } from "./operators.js";
import { DecimalPlace } from "./decimalPlace.js";

export class Expr {
  static #RE = Object.values({
    number: "(?<num>\\d+)((?<f>\\.)(?<fnum>\\d+)?)?",
    operators: `(?<op>[${Operators.all().join("")}])`,
  }).join("|");
  
  static get RE() { return "^" + Expr.#RE + "$"; }

  static parser(expr="") {
    expr = String(expr);
    const gp = RegExp(Expr.RE, "u").exec(expr)?.groups;
    return typeof gp === "undefined" ? null : {
      number: {
        value: gp.num ? Number(gp.num) : NaN,
        isFloat: gp.f === ".",
        float: gp.f === "." && gp.fnum ? Number(gp.fnum) : NaN,
      },
      operator: {
        value: gp.op ?? "",
        isParenthese: [Operators.parentheseStart, Operators.parentheseEnd].includes(gp.op)
      }
    }
  }

  static isExpr(expr) { return expr instanceof Expr; }

  static isValid(expr="") { Expr.parser(expr) !== null; }

  static number(number=Expr.parser(null).number) {
    if (typeof number?.value !== "number" || isNaN(number?.value)) return NaN;
    let num = number.value.toString();
    if (!isNaN(number?.float)) num += "." + number.float?.toString();
    return Number(num);
  }

  static toDecimal(value=0, decimal=0) {
    const length = String(value).split(".")[0].length;
    return Number(value).toPrecision(length + decimal);
  }

  #expr;
  #decimal;
  #data;
  #is;
  #parenthese;
  #next;
  #prev;
  #value;
  #result;

  #parser() { this.#data = Expr.parser(this.#expr); }
  isValid() { return this.#data !== null; }

  get expr() { return this.#expr; }
  set expr(expr) {
    this.#expr = String(expr);
    this.#parser();
    this.#value = NaN;
    this.#result = NaN;
    const valid = this.isValid();
    this.#is = {
      number: valid && !isNaN(this.#data.number.value),
      operator: valid && Operators.isOperator(this.#data.operator.value),
      parenthese: valid && this.#data.operator.isParenthese
    }
  }

  toString() { return this.expr; }

  get decimal() { return this.#decimal; }
  set decimal(decimal) { this.#decimal = DecimalPlace.place(decimal); }

  constructor (expr="", decimal="F") {
    this.#expr = "";
    this.#decimal = 0;
    this.#data = Expr.parser(null);
    this.#is = {
      number: false,
      operator: false,
      parenthese: false
    }
    this.#next = null;
    this.#prev = null;
    this.#parenthese = null;
    this.#value = NaN;
    this.#result = NaN;
    this.expr = expr;
    this.decimal = decimal;
  }

  get is() { return { ...this.#is }; }
  get prev() { return this.#prev; }
  get next() { return this.#next; }
  get parenthese() { return this.#parenthese; }
  set prev(value) { if (Expr.isExpr(value)) this.#prev = value; }
  set next(value) { if (Expr.isExpr(value)) this.#next = value; }
  set parenthese(value) { if (Expr.isExpr(value)) this.#parenthese = value; }

  #isNumber() { this.#value = Expr.number(this.#data.number); }

  #isOpParenthese() {
    if (Expr.isExpr(this.parenthese)) {
      this.#value = this.parenthese.result;
      this.#result = this.parenthese.result;
      return;
    }
    const [nav, parenthseStop] = this.expr === Operators.parentheseStart
      ? ["next", Operators.parentheseEnd]
      : ["prev", Operators.parentheseStart];

    let hierarchy = {
      primary: [],
      secondary: [],
      tertiary: [],
      fourthary: [],
      quintary: []
    }
    let start = this[nav];
    let end = this;
    while (Expr.isExpr(start)) {
      end = start;
      const isParenthese = start.is.parenthese;
      if (start.is.operator && !isParenthese) {
        const hierarchyKey = Operators.inHierarchy(start.expr);
        hierarchy?.[hierarchyKey].push(start);
      }
      if (isParenthese && start.expr === parenthseStop) break;
      else if (isParenthese) end.result;
      if (isParenthese && Expr.isExpr(start.parenthese)) start = start.parenthese;
      start = start[nav];
    }
    hierarchy = Object.values(hierarchy).reduce((p, c) => [...p, ...c]);
    console.log(hierarchy.map((v) => [v.expr, v.prev.expr, v.next.expr]), "hierarchy")
    let result = NaN;
    let tempOp = null;
    for (const operator of hierarchy) {
      if (!Expr.isExpr(tempOp)) tempOp = operator;
      result = operator.result;
      tempOp.prev.result = result;
      tempOp.next.result = result;
      tempOp = operator;
      console.log("result", result)
    }
    console.log("result2", result)
    if (!(end.is.parenthese && end.expr === parenthseStop)) {
      result = end.result;
      // console.log("asdf", end.expr, end.result, this.expr, this.prev.expr, this.prev.result)
    }
    else {
      result = end.expr === Operators.parentheseEnd ? end.prev.result : this.prev.result;
      this.parenthese = end;
      end.parenthese = this;
    }

    this.#value = result;
    this.#result = result;
  }
  #isOpEquals() {
    const end = this.prev;
    let start = this.prev;
    while (Expr.isExpr(start)) start = start.prev;
    
  }
  #isOpPercent() { return [this.prev?.prev, this.prev]; }

  #isOperator() {
    if (this.is.parenthese) return this.#isOpParenthese();
    
    const [left, right] = this.expr === Operators.percent
      ? this.#isOpPercent()
      : [this.prev, this.next];
      
    if (this.expr === Operators.equals) this.#isOpEquals();
      
    this.#value = Operators.resolve(
      left?.result ?? NaN,
      this.expr,
      right?.result ?? NaN
    );
    if (Expr.isExpr(left)) left.result = this.#value;
    if (Expr.isExpr(right)) right.result = this.#value;
  }

  get value() {
    if (isNaN(this.#value) && this.isValid()) {
      if (this.is.number) this.#isNumber();
      else if (this.is.operator) this.#isOperator();
    }
    return this.#value;
  }

  get result() { return !isNaN(this.#result) ? this.#result : this.value; }
  set result(result) {
    if (typeof result !== "number") throw TypeError("result value most be number type.");
    this.#result = result;
  }

  #toDecimal(value) { return Expr.toDecimal(value, this.decimal); }
  toDecimal() { return this.#toDecimal(this.result); }
  valueToDecimal() { return this.#toDecimal(this.value); }
}

var _Expr = Expr;
Expr = function (value="", decimal="F") { return new _Expr(value, decimal); }
Object.defineProperties(Expr, Object.getOwnPropertyDescriptors(_Expr));

class Expression {
  static #RE = new RegExp(Expr.RE.slice(1, -1), "gu");
  static get RE() { return Expression.#RE; }
  static parser(value="", sep="<SP>") {
    return String(value).replace(Expression.RE, (expr) => `${sep}${expr}`).slice(sep.length).split(sep);
  }
  
  #expr;
  #decimal;
  #result;
  #length;
  #head = new Expr(null);
  #tail = new Expr(null);

  get decimal() { return this.#decimal; }
  set decimal(decimal) { this.#decimal = DecimalPlace.place(decimal); }

  append(expr="") {
    if (expr === "") throw SyntaxError("a value is required in the parameter 'expr'.");
    if (!(expr instanceof Expr)) expr = new Expr(String(expr), this.decimal);
    if (this.#head === null) this.#head = expr;
    else {
      this.#tail.next = expr;
      expr.prev = this.#tail;
    }
    this.#tail = expr;
    this.#length += 1;
    this.#expr += " " + expr.expr;
  }

  concatenate(exprs=["<Param>", new Expr()]) {
    if (!Array.isArray(exprs)) exprs = Expression.parser(exprs);
    if (exprs instanceof Expr) exprs = [exprs];
    if (exprs?.[0] === "<Param>" && exprs?.[1].expr === "") return;
    for (const expr of exprs) this.append(expr);
  }

  constructor (exprs=["<Param>", new Expr()], decimal="F") {
    this.#decimal = 0;
    this.#expr = "";
    this.#length = 0;
    this.#head = null;
    this.#tail = null;
    this.#result = NaN;
    this.decimal = decimal;
    this.concatenate(exprs);
  }

  get expr() { return this.#expr.trim(); }
  get length() { return this.#length; }
  get head() { return this.#head; }
  get tail() { return this.#tail; }
  set head(value) { this.#head = value instanceof Expr ? value : new Expr(value); }
  set tail(value) { this.#tail = value instanceof Expr ? value : new Expr(value); }

  toString() { return this.expr; }

  pop() {
    if (this.length === 0) this.#head = null;
    else this.#length -= 1;
    const tail = this.tail;
    this.tail = this.tail?.prev;
    this.#expr = this.expr.slice(0, this.expr.lastIndexOf(this.tail.expr));
    return tail;
  }

  get result() {
    const equals = new Expr(Operators.equals, this.decimal);
    this.append(equals);
    const result = equals.result;
    this.append(result);
    this.#result = result;
    console.log("hello", equals.expr, result)
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
}

// const aa = new Expression(["2","\u00D7","(","10","+","2", "-", "3","+","10", ")", "+", "55", "\u00F7", "2"], "A")
// aa.traverse((expr) => console.log(expr.result, expr.expr, expr.toDecimal()))

const a = new Expression("(1+2+4\u00D76)");
// a.traverse((expr) => console.log(expr.expr))
console.log(a.head.result, a.toString())
// console.log(a.result, a.toString())
// for (const x in Operators.hierarchy) console.log(x)
// console.log(Operators.inHierarchy("\u00d7"))
