import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native'

/**
 * @typedef {import('react-native').PressableProps & {
 *   text?: string,
 *   textStyle?: import('./types').TextStyleProp,
 *   size?: number,
 *   scale?: number
 * }} ButtonPadProp
 * @type {import('react').FC<ButtonPadProp>}
 * @param {ButtonPadProp} props
 */

export function ButtonPad(props) {
  let { style, textStyle, scale, size, text } = props
  if (!Array.isArray(style)) style = [style]
  if (!Array.isArray(textStyle)) textStyle = [textStyle]

  const { width, height } = useWindowDimensions()
  if (!size) size = (width + height) / 2 * (scale ?? 0.1)
  const styles = getStyles(size)

  return (
    <Pressable { ...props } style={{}}>
      <View style={[styles.button, ...style]}>
        <Text style={[styles.text, ...textStyle]}>{text}</Text>
      </View>
    </Pressable>
  )
}

export const getStyles = (size=100) => StyleSheet.create({
  button: {
    width: size ?? 100,
    height: size ?? 100,
    borderRadius: 100,
    backgroundColor: '#333'
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default ButtonPad
