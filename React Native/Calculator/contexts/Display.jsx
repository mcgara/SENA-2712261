import { createContext, useMemo } from 'react'

/**
 * @typedef {{
 *   data: string | null,
 *   showData: string,
 *   result: number | null,
 *   showResult: string
 * }} DisplayData
 * @typedef {(newDisplay: DisplayData | (displayData: DisplayData) => DisplayData) => void} SetDisplayData
 */

/**
 * @typedef {{
 *   value: DisplayData,
 *   events: {
 *     beforeChange: Array<() => void>,
 *     afterChange: Array<() => void>
 *   }
 * }} StateValueDisplayData
 * @typedef {[StateValueDisplayData, SetDisplayData]} StateDisplayData
 * @return {StateDisplayData}
 */
export const createStateDisplayData = () => {
  /** @type {StateValueDisplayData} */
  const displayData = {
    value: {
      data: null,
      showData: '0',
      result: null,
      showResult: '0'
    },
    events: {
      beforeChange: [],
      afterChange: []
    }
  }

  /**
   * @type {SetDisplayData}
   */
  const setDisplayData = (newDisplay) => {
    for (const dispatch of displayData.events.beforeChange) dispatch()
    if (typeof newDisplay === 'function') newDisplay = newDisplay(displayData.value)
    displayData.value = newDisplay
    for (const dispatch of displayData.events.afterChange) dispatch()
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
