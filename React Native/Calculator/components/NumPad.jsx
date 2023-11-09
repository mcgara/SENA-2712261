import { View, StyleSheet } from 'react-native'
import NumPadButton from './NumPadButton'
import { symbolsNumPad as Sb } from '../calculator/symbols'
import { toArray } from '../utils'

/**
 * @typedef {{
 *   style?: import('./types').ViewStyleProp
 * }} NumPadProps
 * @type {import('react').FC<NumPadProps>}
 * @param {NumPadProps}
 */
export function NumPad({ style }) {
  style = toArray(style)

  return (
    <View style={[styles.container, ...style]}>
      <View style={[styles.row]}>
        <NumPadButton symbol={Sb.bs} style={styles.buttonBs}/>
        <NumPadButton symbol={Sb.clear}/>
        <NumPadButton symbol={Sb.expon} style={styles.buttonExpon}/>
        <NumPadButton symbol={Sb.division}/>
      </View>
      <View style={[styles.row]}>
        <NumPadButton symbol={Sb.seven}/>
        <NumPadButton symbol={Sb.eight}/>
        <NumPadButton symbol={Sb.nine}/>
        <NumPadButton symbol={Sb.times}/>
      </View>
      <View style={[styles.row]}>
        <NumPadButton symbol={Sb.four}/>
        <NumPadButton symbol={Sb.five}/>
        <NumPadButton symbol={Sb.six}/>
        <NumPadButton symbol={Sb.minus}/>
      </View>
      <View style={[styles.row]}>
        <NumPadButton symbol={Sb.one}/>
        <NumPadButton symbol={Sb.two}/>
        <NumPadButton symbol={Sb.three}/>
        <NumPadButton symbol={Sb.plus}/>
      </View>
      <View style={[styles.row]}>
        <NumPadButton symbol={Sb.plusminus}/>
        <NumPadButton symbol={Sb.zero}/>
        <NumPadButton symbol={Sb.dot}/>
        <NumPadButton symbol={Sb.equal} style={styles.buttonEqual}/>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: '40%',
    borderWidth: 1,
    borderColor: '#ff7200'
  },
  row: {
    flexDirection: 'row'
  },
  buttonEqual: {
    backgroundColor: '#ff7200'
  },
  buttonBs: {
    backgroundColor: '#ff3900',
    paddingRight: 5
  },
  buttonExpon: {
    paddingLeft: 10
  }
})

export default NumPad
