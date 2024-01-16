import { View, StyleSheet } from 'react-native'
import Icon from './Icon'
import { toArray } from '../../utils'

/**
 * @typedef {import('./Icon').IconProps & {
*   style?: import('../types').ViewStyleProp,
* }} UserIconProps 
* @type {import('react').FC<UserIconProps>}
* @param {UserIconProps}
*/
export function UserIcon({ styleIcon, scaleIcon, sizeIcon, style }) {
  style = toArray(style)
  
  return (
    <Icon sizeIcon={sizeIcon} scaleIcon={scaleIcon} styleIcon={styleIcon}>
      <View style={[styles.container, ...style]}/>
    </Icon>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 100
  }
})

export default UserIcon
