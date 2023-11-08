import { useContext, useCallback, useMemo } from 'react'
import { DisplayContext } from '../contexts/Display'

/**
 * @typedef {import('../constants/symbolsNumPad').SymbolsNumPad} SymbolsNumPad
 * @typedef {import('../contexts/Display').StateDisplayData} StateDisplayData 
 * @typedef {{
 *   display?: StateDisplayData,
 *   symbol?: { [P in keyof SymbolsNumPad]: SymbolsNumPad[P] }[keyof SymbolsNumPad]
 * }} UseNumPadButtonProps
 */

/** @param {UseNumPadButtonProps} */
export function useNumPadButtonOnPress({ symbol, display }) {
  return useCallback(() => {
    if (!display || !symbol) return
    const [, setDisplay] = display
    setDisplay(value => ({ ...value, showData: symbol }))
  }, [])
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
