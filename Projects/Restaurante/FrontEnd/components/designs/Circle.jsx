import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { toArray } from '../../utils'

/**
 * @typedef {import('react').PropsWithChildren & {
 *   style?: import('../types').ViewStyleProp
 *   scale?: number
 *   size?: number
 * }} CircleProps
 * @type {import('react').FC<CircleProps>}
 * @param {CircleProps}
 */
export default function Circle({ children, style, scale, size }) {
  const { width, height } = useWindowDimensions()
  style = toArray(style)

  scale = scale ?? 0.35
  size = size ?? (width + height) / 2 * scale
  const styles = getCircleStyle(size)
  
  return (
    <View style={[styles.circle, ...style]}>
      {children}
    </View>
  )
}

/** @param {number} size */
export const getCircleStyle = size => StyleSheet.create({
  circle: {
    height: size,
    width: size,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
