import { createContext, useState } from 'react'
import { StyleSheet, Dimensions, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')
const initialScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    paddingTop: StatusBar.currentHeight
  }
})

/**
 * @typedef {import('../components/screens/index').ScreenNames} ScreenNames
 * @typedef {ScreenNames} ScreenKey
 * @typedef {typeof initialScreenStyles} ScreenStyles
 * @typedef {import('react').Dispatch<import('react').SetStateAction<ScreenStyles>> SetScreenStyles}
 * @typedef {import('react').Dispatch<import('react').SetStateAction<ScreenKey>>} SetScreen
 * @typedef {import('react').Context<{
 *   screen: ScreenKey,
 *   setScreen: SetScreen,
 *   screenStyles: ScreenStyles,
 *   setScreenStyles: SetScreenStyles
 * }>} ScreenContextValue
 */

/** @type {ScreenContextValue} */
export const ScreensContext = createContext()

/**
 * @typedef {import('react').PropsWithChildren & {
 *   screens: Record<ScreenKey, () => JSX.Element>
 * }} ScreensProviderProps
 */

/**
 * @type {import('react').FC<ScreensProviderProps>}
 * @param {ScreensProviderProps}
 */
export function ScreensProvider({ children: ScreenDefault, screens }) {
  const [screen, setScreen] = useState()
  const [screenStyles, setScreenStyles] = useState(initialScreenStyles)

  const valueContext ={
    screen,
    setScreen,
    screenStyles,
    setScreenStyles
  }
  
  return (
    <ScreensContext.Provider value={valueContext}>
      {screens[screen] ?? ScreenDefault}
    </ScreensContext.Provider>
  )
}

export default ScreensContext
