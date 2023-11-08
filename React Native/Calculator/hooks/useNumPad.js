import { useContext } from 'react'
import { DisplayContext } from '../contexts/Display'
import { useNumPadButtonOnPress } from './useNumPadButton'

/**
 * @typedef {import('./useNumPadButton').UseNumPadButtonProps} UseNumPadButtonProps
 */
export function useNumPad() {
  const displayValue = useContext(DisplayContext)

  /** @param {Pick<UseNumPadButtonProps, 'symbol'>} symbol */
  const getHandlers = symbol => {
    const props = { displayValue, setDisplayValue, symbol }
    return {
      onPress: useNumPadButtonOnPress(props)
    }
  }

  return getHandlers
}

export default useNumPad
