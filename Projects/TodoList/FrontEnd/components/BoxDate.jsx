import { View, Text, StyleSheet } from 'react-native'
import useBoxDate from '../hooks/useBoxDate'
import { boxDateHandleOnDate, boxDateHandleMessage } from '../handlers/boxDate'
import { toArray } from '../utils'

/**
 * @typedef {{
 *   style?: import('./types').ViewStyleProp,
 *   onDate?: (date: Date) => string,
 *   message?: string | (date: Date) => string,
 *   styleDate?: import('./types').TextStyleProp,
 *   styleMessage?: import('./types').TextStyleProp,
 * }} BoxDateProp
 * @type {import('react').FC<BoxDateProp>}
 * @param {BoxDateProp}
 */
export function BoxDate({ onDate, message, style, styleDate, styleMessage }) {
  style = toArray(style)
  styleDate = toArray(styleDate)
  styleMessage = toArray(styleMessage)
  
  if (!onDate) onDate = boxDateHandleOnDate
  if (!message) message = boxDateHandleMessage

  const [textDate, textMessage] = useBoxDate({ onDate, message })

  return (
    <View style={[styles.box, ...style]}>
      <Text style={[styles.text, ...styleDate]}>{textDate}</Text>
      <Text style={[styles.text, ...styleMessage]}>{textMessage}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  box: {
    width: '90%',
    height: '15%',
    backgroundColor: '#f4f3df',
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    borderRadius: 15
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center'
  }
})

export default BoxDate
