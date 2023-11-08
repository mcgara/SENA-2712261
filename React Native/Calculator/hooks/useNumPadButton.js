import { useContext, useCallback, useMemo } from 'react'
import { DisplayContext } from '../contexts/Display'

/**
 * @typedef {import('../constants/symbolsNumPad').SymbolsNumPad} SymbolsNumPad
 * @typedef {import('../contexts/Display').DisplayValueContext} DisplayValueContext
 * @typedef {import('../contexts/Display').SetDisplayValue} SetDisplayValue
 * @typedef {{
 *   display?: DisplayValueContext,
 *   symbol?: { [P in keyof SymbolsNumPad]: SymbolsNumPad[P] }[keyof SymbolsNumPad]
 * }} UseNumPadButtonProps
 */

/** @param {UseNumPadButtonProps} */
export function useNumPadButtonOnPress({ symbol, display }) {
  const onPress = useCallback(() => {
    if (!display || !symbol) return
    display = { ...display, showValue: symbol }
  }, [symbol, display])

  return onPress
}

// --- Bad Idea ---
/** @param {UseNumPadButtonProps} */
export function useNumPadButton({ symbol, display }) {
  const onPress = useNumPadButtonOnPress({ symbol, display })

  return useMemo(() => ({
    onPress
  }), [])
}

export default useNumPadButton
