import { useContext, useCallback, useMemo } from 'react'
import { DisplayContext } from '../contexts/Display'

/**
 * @typedef {import('../contexts/Display').StateDisplayData} StateDisplayData 
 * @typedef {{
 *   display: StateDisplayData,
 *   symbol: string
 * }} UseNumPadButtonProps
 */

/** @param {UseNumPadButtonProps} */
export function useNumPadButtonOnPress({ symbol, display }) {
  return useCallback(() => {
    const [displayData, setDisplayData] = display
    setDisplayData(() => displayData.value.handle(symbol))
  }, [symbol])
}

/** @param {Pick<UseNumPadButtonProps, 'symbol'>} */
export function useNumPadButton({ symbol }) {
  const display = useContext(DisplayContext)
  const onPress = useNumPadButtonOnPress({ symbol, display })

  return useMemo(() => ({
    onPress,
  }), [symbol])
}

export default useNumPadButton
