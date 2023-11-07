import { View, StyleSheet } from 'react-native'
import ButtonPad from './ButtonPad'
import { signsNumPad as signs } from '../hooks/useNumPad'

export function NumPad() {
  return (
    <View style={styles.container}>
      <View style={[styles.row]}>
        <ButtonPad text={signs.bs} scale={0.166} textStyle={styles.text}/>
        <ButtonPad text={'x\u00B2'} scale={0.166} textStyle={styles.text}/>
        <ButtonPad text={'\u221A'} scale={0.166} textStyle={styles.text}/>
        <ButtonPad text={'\u00F7'} scale={0.166} textStyle={styles.text}/>
      </View>
      <View style={[styles.row]}>
        <ButtonPad text='7' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='8' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='9' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text={'\u00D7'} scale={0.166} textStyle={styles.text}/>
      </View>
      <View style={[styles.row]}>
        <ButtonPad text='4' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='5' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='6' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text={'\u2212'} scale={0.166} textStyle={styles.text}/>
      </View>
      <View style={[styles.row]}>
        <ButtonPad text='1' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='2' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='3' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='+' scale={0.166} textStyle={styles.text}/>
      </View>
      <View style={[styles.row]}>
        <ButtonPad text='+/-' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='0' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='.' scale={0.166} textStyle={styles.text}/>
        <ButtonPad text='=' scale={0.166} textStyle={styles.text}/>
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
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 36
  }
})  

export default NumPad
