import { View, StyleSheet } from 'react-native'
import { ScreensProvider } from '../contexts/Screens'
import Screens, { ScreenDefault } from './screens/index'

export function Main() {
  return (
    <View style={styles.container}>
      <ScreensProvider screens={Screens}>
        <ScreenDefault/>
      </ScreensProvider>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Main
