import { Pressable, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { toArray } from '../utils'

export const defaultNumPadButton = {
  scale: 0.1655,
  size: 100
}

/**
 * @typedef {import('react-native').PressableProps & {
 *   symbol?: string,
 *   symbolStyle?: import('./types').TextStyleProp,
 *   size?: number,
 *   scale?: number,
 *   displayValue?: import('../contexts/Display').DisplayValueContext
 * }} NumPadButtonProps
 * @type {import('react').FC<NumPadButtonProps>}
 * @param {NumPadButtonProps} props
 */
export function NumPadButton(props) {
  let { style, symbolStyle, scale, size, symbol, displayValue } = props
  const { width, height } = useWindowDimensions()

  style = toArray(style)
  symbolStyle = toArray(symbolStyle)

  if (!size) size = (width + height) / 2 * (scale ?? defaultNumPadButton.scale)
  const styles = getStyles(size)

  return (
    <Pressable { ...props } style={[styles.button, ...style]} onPress={onPress}>
      <Text style={[styles.symbol, ...symbolStyle]}>{symbol}</Text>
    </Pressable>
  )
}

export const getStyles = (size=defaultNumPadButton.size) => StyleSheet.create({
  button: {
    width: size ?? defaultNumPadButton.size,
    height: size ?? defaultNumPadButton.size,
    backgroundColor: '#252525',
    borderColor: '#ff7200',
    borderWidth: 1,
    // borderRadius: 30
  },
  symbol: {
    flex: 1,
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default NumPadButton
