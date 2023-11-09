import { createContext, useMemo } from 'react'
import Calculator from '../calculator'

/**
 * @typedef {Calculator} DisplayData
 * @typedef {(newDisplay: DisplayData | (displayData: DisplayData) => DisplayData) => void} SetStateDisplayData
 */

/**
 * @typedef {{
 *   value: DisplayData,
 *   events: {
 *     beforeChange: Set<() => void>,
 *     afterChange: Set<() => void>
 *   }
 * }} StateValueDisplayData
 * @typedef {[StateValueDisplayData, SetStateDisplayData]} StateDisplayData
 * @return {StateDisplayData}
 */
export const createStateDisplayData = () => {
  /** @type {StateValueDisplayData} */
  const displayData = {
    value: new Calculator(),
    events: {
      beforeChange: new Set(),
      afterChange: new Set()
    }
  }

  /**
   * @type {SetStateDisplayData}
   */
  const setDisplayData = (newDisplay=null) => {
    for (const dispatch of displayData.events.beforeChange.values()) dispatch()
    if (typeof newDisplay === 'function') newDisplay = newDisplay(displayData.value)
    if (newDisplay) displayData.value.update(newDisplay)
    console.log('setDisplay', displayData.value.left, displayData.value.operator, displayData.value.right, displayData.value.result)
    for (const dispatch of displayData.events.afterChange.values()) dispatch()
  }

  return [displayData, setDisplayData]
}

/**
 * @typedef {import('react').Context<StateDisplayData>} DisplayDataContext
 * @type {DisplayDataContext}
 */
export const DisplayContext = createContext()

/** @param {import('react').PropsWithChildren} */
export function DisplayProvider({ children }) {
  const displayState = useMemo(() => createStateDisplayData(), [])
  
  return (
    <DisplayContext.Provider value={displayState}>
      {children}
    </DisplayContext.Provider>
  )
}
