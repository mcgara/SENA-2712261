import { Expression, Expr } from "./expression.js"

class Display {
  #expression;
  #history;

  constructor (expression="") {
    this.#expression = "";
    if (Expression.isValid(expression))
    this.#history = [""];
    this.#history.pop();
  }
  
  get value() { return this.#value; }
  get history()

  add(value="") {
    if (!Expr.isValid(value)) throw TypeError(`parameter value must be type 'Expr' valid.`);
    this.#value += value;
  }
}
