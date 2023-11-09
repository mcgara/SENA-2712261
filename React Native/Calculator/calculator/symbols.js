export const symbolsNumPad = {
  dot: '.',
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  plus: '+',
  minus: '\u2212',
  times: '\u00D7',
  division: '\u00F7',
  plusminus: '+/\u2212',
  expon: 'x\u00B2',
  equal: '=',
  bs: '\u232B',
  clear: 'C'
}

/** @typedef {typeof symbolsNumPad} SymbolsNumPad */

export const symbolsParsedNumPad = [
  [symbolsNumPad.minus, '-'],
  [symbolsNumPad.times, '*'],
  [symbolsNumPad.division, '/'],
  [symbolsNumPad.expon, '** 2'],
  [symbolsNumPad.plusminus, '* -1'],
]

/** @param {string} symbol */
export function parserSymbol(symbol) {
  for (const [key, value] of symbolsParsedNumPad) {
    if (key === symbol) symbol = value
  }
  return symbol
}

export const numbersSymbols = [
  symbolsNumPad.zero,
  symbolsNumPad.one,
  symbolsNumPad.two,
  symbolsNumPad.three,
  symbolsNumPad.four,
  symbolsNumPad.five,
  symbolsNumPad.six,
  symbolsNumPad.seven,
  symbolsNumPad.eight,
  symbolsNumPad.nine,
]

export const operatorsSymbols = [
  symbolsNumPad.plus,
  symbolsNumPad.minus,
  symbolsNumPad.times,
  symbolsNumPad.division,
  symbolsNumPad.plusminus,
  symbolsNumPad.expon
]
