import { View, StyleSheet } from 'react-native'
import BgCircles from './BgCircles.jsx'
import { toArray } from '../../utils.js'

/**
 * @typedef {import('react').PropsWithChildren & {
 *   style?: import('../types').ViewStyleProp
 * }} ScreenPropsBg
 * @type {import('react').FC<ScreenPropsBg>}
 * @param {ScreenPropsBg}
 */
export default function ScreenBg({ children, style }) {
  style = toArray(style);
  
  return (
    <View style={style}>
      <BgCircles />
        {children}
      <BgCircles style={styles.bgCirclesDown} />
    </View>
  )
}

export const styles = StyleSheet.create({
  bgCirclesDown: {
    zIndex: -1,
    left: '75%',
    top: '85%'
  }
})
