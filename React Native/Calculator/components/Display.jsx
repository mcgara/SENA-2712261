import { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DisplayContext } from '../contexts/Display'
import { toArray } from '../utils'

/**
 * @typedef {{
 *   style?: import('./types').ViewStyleProp,
 *   textStyle?:  import('./types').TextStyleProp
 * }} DisplayProps
 * @type {import('react').FC<DisplayProps>}
 * @param {DisplayProps}
 */
export function Display({ style, textStyle }) {
  const { displayValue } = useContext(DisplayContext)
  useEffect(() => {}, [displayValue])

  style = toArray(style)
  textStyle = toArray(textStyle)
  
  return (
    <View style={[styles.container, ...style]}>
      <Text style={[styles.text, ...textStyle]}>
        {
          displayValue.result !== null
          ? displayValue.showResult
          : displayValue.showValue
        }
      </Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    top: '12%',
    backgroundColor: '#252525',
    borderWidth: 2,
    padding: '5%',
    borderColor: '#ff7200',
    // borderRadius: 30
  },
  text: {
    flex: 1,
    fontSize: 74,
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'right'
  }
})

export default Display
