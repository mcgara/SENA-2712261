import { View, StyleSheet, TextInput } from 'react-native'
import { toArray } from '../utils'

/**
 * @typedef {import('react-native').TextInputProps & {
*   styleBar?: import('./types').ViewStyleProp
* }} SearchBarProps 
* @type {import('react').FC<SearchBarProps>}
* @param {SearchBarProps} props
*/
export function SearchBar(props={}) {
  let { style, styleBar } = props
  
  style = toArray(style)
  styleBar = toArray(styleBar)

  return (
    <View style={[styles.bar, ...styleBar]}>
      <TextInput { ...props } style={[styles.textInput, ...style]} />
    </View>
  )
}

export const styles = StyleSheet.create({
  bar: {
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16
  }
})

export default SearchBar
