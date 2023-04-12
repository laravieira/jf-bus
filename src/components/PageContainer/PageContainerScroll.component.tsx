import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../SearchBar/SearchBar.config';

function PageContainerScroll(props: ScrollViewProps) {
  return <SafeAreaView style={styles.wrapper}>
    <ScrollView { ...props } style={ [styles.container, props.style] }>
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
    paddingTop: 32
  },
  bottomspace: {
    height: 32, // Hidden space on the bottom
    marginTop: 32
  }
});

export default PageContainerScroll;