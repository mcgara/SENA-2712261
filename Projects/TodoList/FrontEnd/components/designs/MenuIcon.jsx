import { View, StyleSheet } from 'react-native'
import Icon from './Icon'
import { toArray } from '../../utils'

/**
 * @typedef {import('./Icon').IconProps & {
 *   style?: import('../types').ViewStyleProp,
 * }} MenuIconProps 
 * @type {import('react').FC<MenuIconProps>}
 * @param {MenuIconProps}
 */
export function MenuIcon({ sizeIcon, scaleIcon, styleIcon, style }) {
  style = toArray(style)
  
  return (
    <Icon sizeIcon={sizeIcon} scaleIcon={scaleIcon} styleIcon={styleIcon}>
      <View style={styles.container}>
        <View style={[styles.line, ...style]}/>
        <View style={[styles.line, ...style]}/>
        <View style={[styles.line, ...style]}/>
      </View>
    </Icon>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: '20%',
  },
  line: {
    width: '50%',
    height: 3.5,
    backgroundColor: '#000',
    borderRadius: 100
  }
})

export default MenuIcon
