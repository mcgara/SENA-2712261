import Home from './Home'
import HomeMock from './Home.mock'

/** @typedef {'Home' | 'HomeMock'} ScreenNames */
export const ScreenDefault = HomeMock

export const HomeScreen = Home
export const HomeMockScreen = HomeMock

export default {
  Home: <Home/>,
  HomeMock: <HomeMock/>
}
