import {
  parserSymbol,
  symbolsNumPad as sb,
  numbersSymbols,
  operatorsSymbols
} from './symbols'

/**
 * @typedef {{
 *   left: string | number,
 *   operator?: string,
 *   right?: string | number,
 *   result: number
 * }} CalculateData
 * @param {CalculateData} data
 */
export function evaluate(data) {
  data.left = data.left ? parserSymbol(String(data.left)) : '0'
  if (data.operator) data.operator = parserSymbol(String(data.operator))
  if (data.right) data.right = parserSymbol(String(data.right))

  /** @type {string} */
  let evaluated = data.left + data.operator ? data.operator + (data.right ? data.right : '') : ''
  let result = NaN
  try { result = eval(evaluated) } catch {}
  data.result = result
  return result
}

/**
 * @param {CalculateData} data
 * @param {string} symbol
 * @return {CalculateData}
 */
export function addSymbol(data, symbol) {
  const isOperator = operatorsSymbols.includes(symbol)
  const isNumber = numbersSymbols.includes(symbol)
  const isZero = symbol === sb.zero
  const isDot = symbol === sb.dot

  
  if (isNumber && !!data.operator) {
    if (!data.right || (data.right === sb.zero && !isZero)) data.right = symbol
    else if (isDot && !data.right.includes(sb.dot)) data.right += symbol
  } else if (isNumber) {
    if (!data.left || (data.left === sb.zero && !isZero)) data.left = symbol
    else if (isDot && !data.left.includes(sb.dot)) right += symbol
  } else if (isOperator) data.operator = symbol
  
  console.log('addSymbol', symbol, data.left)
  return data
}

/**
 * @param {CalculateData} data
 * @return {CalculateData}
 */
export function popSymbol(data) {
  if (data.right) {
    data.right = String(data.right)
    if (data.right.length === 1 && data.right !== sb.zero) data.right = sb.zero
    else if (data.right !== sb.zero) data.right = data.right.slice(0, data.right.length - 1)
  } else if (data.left) {
    data.left = String(data.left)
    if (data.left.length === 1 && data.left !== sb.zero) data.left = sb.zero
    else if (data.left !== sb.zero) data.left = data.left.slice(0, data.left.length - 1)
  }

  return data
}

/**
 * @param {CalculateData} [data]
 * @return {CalculateData}
 */
export function clearSymbols(data) {
  data.left = '0'
  data.operator = undefined
  data.right = undefined
  data.result = 0
  return data
}

/**
 * @param {CalculateData} data
 * 
 * @param {string} symbol
 * @return {CalculateData}
 */
export function handleCalculator(data, symbol) {
  if (symbol === sb.equal) data = evaluate(data)
  else if (symbol === sb.bs) data = popSymbol(data)
  else if (symbol === sb.clear) data = clearSymbols(data)
  else data = addSymbol(data, symbol)
  console.log('hello', symbol, data.left)
  return data
}
