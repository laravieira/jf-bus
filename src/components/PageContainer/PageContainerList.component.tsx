import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../SearchBar/SearchBar.config';

function PageContainerList<T>(props: FlatListProps<T>) {
  const { style, ListFooterComponent, ListFooterComponentStyle } = props;

  const flatListProps = {
    ...props,
    style: [styles.container, style],

    // Don't remove this box and style from the bottom of the scroll
    ListFooterComponent: ListFooterComponent ?? <View />,
    ListFooterComponentStyle: [styles.footer, ListFooterComponentStyle]
  } as FlatListProps<T>;

  return <SafeAreaView style={styles.wrapper}>
    <FlatList { ...flatListProps }/>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: HEADER_HEIGHT + 8,
    flex: 1
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 32
  },
  footer: {
    marginBottom: 32 // Hidden space on the bottom
  }
});

export default PageContainerList;