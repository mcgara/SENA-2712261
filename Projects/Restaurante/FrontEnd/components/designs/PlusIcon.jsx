import { View, StyleSheet } from 'react-native'
import Icon from './Icon'
import { toArray } from '../../utils'

/**
 * @typedef {import('./Icon').IconProps & {
 *   style?: import('../types').ViewStyleProp,
 *   styleLine?: import('../types').ViewStyleProp
 * }} PlusIconProps 
 * @type {import('react').FC<PlusIconProps>}
 * @param {PlusIconProps}
 */
export function PlusIcon({ sizeIcon, scaleIcon, styleIcon, style, styleLine }) {
  style = toArray(style)
  styleLine = toArray(styleLine)

  let { width: vwidth, height: vheight } = styles.line
  for (const propStyle of styleLine) {
    vwidth = propStyle?.width ?? vwidth
    vheight = propStyle?.height ?? vheight
  }
  
  return (
    <Icon sizeIcon={sizeIcon} scaleIcon={scaleIcon} styleIcon={styleIcon}>
      <View style={[styles.container, ...style]}>
        <View style={[styles.line, ...styleLine]}/>
        <View style={[styles.line, ...styleLine, { height: vwidth, width: vheight }]}/>
      </View>
    </Icon>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d67821',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    backgroundColor: '#fff'
  }
})

export default PlusIcon
