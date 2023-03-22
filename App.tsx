import Navigation from './src/navigation/Navigation.component';
import { Inter_300Light, Inter_500Medium } from '@expo-google-fonts/inter';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { loadAsync } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

preventAutoHideAsync().then();

function App() {
  const [appReady, setAppReady] = useState<boolean>(false);

  useEffect(() => {
    loadAsync({
      Inter_300Light,
      Inter_500Medium,
    }).catch(console.warn)
      .finally(() => setAppReady(true));
  }, []);

  useEffect(() => {
    if(appReady)
      hideAsync().then();
  }, [appReady]);

  if(!appReady)
    return null;
  return <Provider store={store}>
    <StatusBar style="auto" />
    <LinearGradient
      colors={['#BF849A', '#6FA0BF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    />
    <Navigation/>
  </Provider>;
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
});

export default App;
