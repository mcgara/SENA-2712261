import { Text, Pressable, StyleSheet } from 'react-native'
import Circle from './designs/Circle'
import { toArray } from '../utils'

/**
 * @typedef {import('react-native').PressableProps} PressableProps
 * @typedef {import('./designs/Circle').CircleProps} CircleProps
 * @typedef {PressableProps & CircleProps & {
 *   textStyle?: import('./types').TextStyleProp
 *   text?: string
 * }} CircleButtonProps
 * @type {import('react').FC<CircleButtonProps>}
 * @param {CircleButtonProps} props
 */
export default function CircleButton(props) {
  const style = toArray(props.style)
  const textStyle = toArray(props.textStyle)
  
  return (
    <Pressable {...props} style={{}}>
      <Circle scale={0.28} {...props} style={[styles.circle, ...style]} >
        <Text style={[styles.text, ...textStyle]}>{props.text}</Text>
      </Circle>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  circle:  {
    borderWidth: 2,
    borderColor: '#ed0'
  },
  text: {
    fontSize: 22
  }
})
