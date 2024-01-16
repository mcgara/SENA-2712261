import { useContext } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import ScreensContext from '../../contexts/Screens'
import BgCircles from '../designs/BgCircles'
import SearchBar from '../SearchBar'
import MenuIcon from '../designs/MenuIcon'
import UserIcon from '../designs/UserIcon'
import BoxDate from '../BoxDate'
import { boxDateMessage } from '../../handlers/screens/home'
import TaskList from '../TaskList'

/** @type {import('react').FC<{}>} */
export function HomeScreen() {
  const { setScreen, screenStyles } = useContext(ScreensContext)
  const onPressScreen = () => setScreen("HomeMock")

  return (
    <View style={styles.bg}>
      <BgCircles/>
      <View style={[screenStyles.container, styles.container]}>
        
        <View style={[styles.row, styles.header]}>
          <View style={[styles.row]}>
            <MenuIcon scaleIcon={0.085}/>
            <SearchBar placeholder='Buscar Tareas' styleBar={styles.searchBar}/>
          </View>
          <UserIcon scaleIcon={0.085}/>
        </View>

        <BoxDate style={styles.boxDate} message={boxDateMessage}/>
        
        <TaskList/>
        <TaskList/>

        <Pressable onPress={onPressScreen}>
          <View style={[styles.bg, styles.button]}>
            <Text style={{ fontSize: 14 }}>Go To HomeMock</Text>
          </View>
        </Pressable>

      </View>
      <BgCircles style={styles.bgCirclesDown}/>
    </View>
  )
}

export const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#f1cb6a',
  },
  container: {
    alignItems: 'center',
    padding: '2%',
  },
  text: {
    fontSize: 24
  },
  button: {
    position: 'absolute',
    top: 300,
    height: 100,
    width: 100,
    backgroundColor: 'blue',
    left: -50
  },
  bgCirclesDown: {
    zIndex: -1,
    left: '75%',
    top: '85%'
  },
  header: {
    marginTop: 5,
    width: '100%',
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#d67821',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row'
  },
  searchBar: {
    width: '70%'
  },
  boxDate: {
    marginTop: 15
  }
})

export default HomeScreen
