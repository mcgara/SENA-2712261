import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native';

import Home from './components/pages/home'

export default function App() {
  return (
    <View style={styles.statusBar}>
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    paddingTop: Constants.statusBarHeight
  }
})
