import { View, StyleSheet } from 'react-native'
import NumPad from './NumPad'
import { DisplayProvider } from '../contexts/Display'
import Display from './Display'

export function Main() {
  return (
    <DisplayProvider>
      <View style={styles.container}>
        <Display/>
        <NumPad/>
      </View>
    </DisplayProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
  },
})

export default Main
