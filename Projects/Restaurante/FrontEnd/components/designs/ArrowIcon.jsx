import { View, StyleSheet } from 'react-native'
import Icon from './Icon'
import { toArray } from '../../utils'

/**
 * @typedef {import('./Icon').IconProps & {
 *   style?: import('../types').ViewStyleProp,
 * }} ArrowIconProps 
 * @type {import('react').FC<ArrowIconProps>}
 * @param {ArrowIconProps}
 */
export function ArrowIcon({ sizeIcon, scaleIcon, styleIcon, style }) {
  style = toArray(style)
  
  return (
    <Icon sizeIcon={sizeIcon} scaleIcon={scaleIcon} styleIcon={styleIcon}>
      <View style={styles.container}>
        <View style={[styles.head, ...style]}/>
        <View style={[styles.tail, ...style]}/>
      </View>
    </Icon>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '20%',
  },
  head: {
    borderLeftWidth: 30,
    borderLeftColor: '#000'
  },
  tail: {
    width: '100%',
    height: 5,
    backgroundColor: '#000'
  }
})

export default ArrowIcon
