import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Main from './components/Main'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Main/>
    </View>
  );
}
