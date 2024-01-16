import { View, StyleSheet, useWindowDimensions } from 'react-native'

/**
 * @typedef {{ style?: import('../types').ViewStyleProp }} BgCircleProp
 * @type {import('react').FC<BgCircleProp>}
 * @param {BgCircleProp}
 */
export function BgCircle({ style }) {
  const { width, height } = useWindowDimensions()
  if (!Array.isArray(style)) style = [style ?? {}]

  const size = (width + height) / 2 * 0.35
  const styles = getCircleStyle(size)
  
  return <View style={[styles.circle, ...style]}/>
}

/**
 * @typedef {{
 *   style: import('../types').ViewStyleProp,
 *   circle1?: import('../types').ViewStyleProp,
 *   circle2?: import('../types').ViewStyleProp
 * }} BgCirclesProp
 * @type {import('react').FC<BgCirclesProp>}
 * @param {BgCirclesProp}
 */
export function BgCircles({ style, circle1, circle2 }) {
  if (!Array.isArray(style)) style = [style ?? {}]
  if (!Array.isArray(circle1)) circle1 = [circle1 ?? {}]
  if (!Array.isArray(circle2)) circle2 = [circle2 ?? {}]

  style.unshift(styles.style)
  circle1.unshift(styles.circle1)
  circle2.unshift(styles.circle2)

  return (
    <View style={style}>
      <BgCircle style={circle1}/>
      <BgCircle style={circle2}/>
    </View>
  )
}

/** @param {number} size */
export const getCircleStyle = size => StyleSheet.create({
  circle: {
    height: size,
    width: size,
    backgroundColor: '#fff',
    opacity: 0.65,
    borderRadius: 100,
    position: 'absolute'
  }
})

export const styles = StyleSheet.create({
  style: {
    position: 'absolute'
  },
  circle1: {
    backgroundColor: 'pink',
    top: -70,
  },
  circle2: {
    left: -85
  }
})

export default BgCircles
