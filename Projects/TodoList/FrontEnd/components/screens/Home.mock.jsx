import { useContext } from 'react'
import { ScreensContext } from '../../contexts/Screens'
import { Pressable, View, Text, StyleSheet } from 'react-native'

/** @type {import('react').FC<{}>} */
export function HomeMockScreen() {
  const { setScreen, screenStyles } = useContext(ScreensContext)
  const onPressScreen = () => setScreen('Home')

  return (
    <View style={[screenStyles.container, styles.container]}>
      <Pressable style={styles.container} onPress={onPressScreen}>
        <Text style={styles.text}>Home Mock, Press to Screen Home</Text>
        <Text style={styles.text}>Proposite: Test Home Screen when load data</Text>
      </Pressable>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16
  }
})

export default HomeMockScreen
