import { View, StyleSheet } from 'react-native'
import { toArray } from '../../utils'
import Circle from './Circle'

/**
 * @typedef {{
 *   style: import('../types').ViewStyleProp,
 *   circle1?: import('../types').ViewStyleProp,
 *   circle2?: import('../types').ViewStyleProp
 * }} BgCirclesProps
 * @type {import('react').FC<BgCirclesProps>}
 * @param {BgCirclesProps}
 */
export default function BgCircles({ style, circle1, circle2 }) {
  style = toArray(style)
  circle1 = toArray(circle1)
  circle2 = toArray(circle2)

  return (
    <View style={[styles.style, ...style]}>
      <Circle style={[styles.circle, styles.circle1 , ...circle1]}/>
      <Circle style={[styles.circle, styles.circle2 , ...circle2]}/>
    </View>
  )
}

export const styles = StyleSheet.create({
  style: {
    position: 'absolute'
  },
  circle: {
    position: 'absolute',
    opacity: 0.7,
  },
  circle1: {
    backgroundColor: '#ed0',
    top: -70,
  },
  circle2: {
    left: -85
  }
})
