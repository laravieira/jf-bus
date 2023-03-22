import { ScrollView, StyleSheet, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../SearchBar/SearchBar.config';

function PageContainerScroll(props: PropsWithChildren) {
  return <SafeAreaView style={styles.wrapper}>
    <ScrollView style={ styles.container }>
      { props.children }
      {/* Don't remove this box from the bottom of the scroll */}
      <View style={styles.bottomspace}/>
    </ScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: HEADER_HEIGHT + 8
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 32
  },
  bottomspace: {
    height: 32, // Hidden space on the bottom
    marginTop: 32
  }
});

export default PageContainerScroll;