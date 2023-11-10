import {
  evaluate,
  addSymbol,
  popSymbol,
  clearSymbols,
  handleCalculator
} from './functions'

/** @typedef {import('./functions').CalculateData} CalculateData */

export class Calculator {
  /** @type {CalculateData} */
  #data

  /** @param {CalculateData} [data] */
  constructor(data) {
    if (!data) data = { left: '0' }
    this.#data = data
  }

  get left() { return this.#data.left }
  get operator() { return this.#data.operator }
  get right() { return this.#data.right }
  get result() { return this.#data.result }

  /** @param {CalculateData} obj */
  update({ left, operator, right }) {
    if (left) this.#data.left = left
    if (operator) this.#data.operator = operator
    if (right) this.#data.right = operator
    this.#data.result = evaluate(this.#data)
  }

  evaluate() { this.update({}) }

  set left(value) {
    this.#data.left = String(value)
    this.evaluate()
  }
  set right(value) {
    this.#data.right = String(value)
    this.evaluate()
  }
  set operator(value) {
    this.#data.operator = String(value)
    this.evaluate()
  }

  /** @param {string} symbol */
  add(symbol) { addSymbol(this.#data, symbol) }
  pop() { popSymbol(this.#data) }
  clear() { clearSymbols(this.#data) }
  /** @param {string} symbol */
  handle(symbol) { handleCalculator(this.#data, symbol) }
}

export default Calculator
