import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../SearchBar/SearchBar.config';
import PageContainerScroll from './PageContainerScroll.component';
import PageContainerList from './PageContainerList.component';

function PageContainer(props: PropsWithChildren) {
  return <SafeAreaView style={styles.container}>
    { props.children }
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    paddingTop: HEADER_HEIGHT + 32,
    paddingHorizontal: 16,
  }
});

PageContainer.Scroll = PageContainerScroll;
PageContainer.List = PageContainerList;

export default PageContainer;