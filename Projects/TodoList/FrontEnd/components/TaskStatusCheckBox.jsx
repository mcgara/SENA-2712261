import { View, StyleSheet } from 'react-native'
import Icon from './designs/Icon'
import { toArray } from '../utils'

/**
 * @typedef {import('./designs/Icon').IconProps & {
 *   style?: import('../types').ViewStyleProp,
 * }} MenuIconProps 
 * @type {import('react').FC<MenuIconProps>}
 * @param {MenuIconProps}
 */
export function TaskStatusCheckBox({ sizeIcon, scaleIcon, styleIcon, style }) {
  style = toArray(style)
  
  return (
    <Icon sizeIcon={sizeIcon} scaleIcon={scaleIcon} styleIcon={styleIcon}>
      <View style={[styles.box, ...style]}/>
    </Icon>
  )
}

export const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#111'
  }
})

export default TaskStatusCheckBox

