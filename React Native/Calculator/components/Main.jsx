import { View, StyleSheet, Text, StatusBar } from 'react-native'
import NumPad from './NumPad'

export function Main() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <NumPad/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})

export default Main
