import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../SearchBar/SearchBar.config';

function PageContainer(props: PropsWithChildren) {
  return <SafeAreaView style={styles.container}>
    { props.children }
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: HEADER_HEIGHT + 32,
    paddingBottom: 32,
  }
});

export default PageContainer;