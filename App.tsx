import Navigation from './src/navigation/Navigation.component';
import { Inter_300Light, Inter_500Medium } from '@expo-google-fonts/inter';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { loadAsync } from 'expo-font';

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
  return <Navigation/>;
}

export default App;