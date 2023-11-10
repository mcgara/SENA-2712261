import { useContext, useCallback, useMemo, useState, useEffect } from 'react'
import { DisplayContext } from '../contexts/Display'
import { operatorsSymbols, parserSymbol } from '../calculator/symbols'

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

/** @param {UseNumPadButtonProps} */
export function useNumPadButtonStyleOperators({ symbol, display }) {
  const [backgroundColor, setBackgroundColor] = useState('#252525')
  const [displayData] = display

  if (operatorsSymbols.includes(symbol)) {
    const changedBgColorButtonOperator = useCallback(() => {
      if (displayData.value.operator === parserSymbol(symbol)) setBackgroundColor('#ff7200')
      else setBackgroundColor('#252525')
      console.log(displayData.value.operator, 'chagedColor', backgroundColor, symbol)
    }, [])

    useEffect(() => {
      displayData.events.afterChange.add(changedBgColorButtonOperator)
      return () => displayData.events.afterChange.delete(changedBgColorButtonOperator)
    }, [])
  }

  console.log('style use button operator', backgroundColor)
  return { backgroundColor }
}

/** @param {Pick<UseNumPadButtonProps, 'symbol'>} */
export function useNumPadButton({ symbol }) {
  const display = useContext(DisplayContext)
  const onPress = useNumPadButtonOnPress({ symbol, display })
  const style = [
    useNumPadButtonStyleOperators({ symbol, display })
  ]

  console.log('style use button', style)

  return useMemo(() => ({
    onPress,
    style
  }), [symbol])
}

export default useNumPadButton
