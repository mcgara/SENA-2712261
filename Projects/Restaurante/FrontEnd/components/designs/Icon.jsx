import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { toArray } from '../../utils'

/**
 * @typedef {import('react').PropsWithChildren & {
 *   styleIcon?: import('../types').ViewStyleProp,
 *   scaleIcon?: number,
 *   sizeIcon?: number
 * }} IconProps
 * @type {import('react').FC<IconProps>}
 * @param {IconProps}
 */
export function Icon({ children, styleIcon, sizeIcon, scaleIcon }) {
  const { width, height } = useWindowDimensions()

  styleIcon = toArray(styleIcon)
  scaleIcon = scaleIcon ?? 0.1
  sizeIcon = sizeIcon ?? (width + height) / 2 * scaleIcon
  const styles = getStyles(sizeIcon)
  
  return <View style={[styles.container, ...styleIcon]}>{children}</View>
}

/** @param {number} size */
export const getStyles = size => StyleSheet.create({
  container: {
    width: size,
    height: size
  }
})

export default Icon
