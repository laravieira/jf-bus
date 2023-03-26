import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../SearchBar/SearchBar.config';
import PageContainerScroll from './PageContainerScroll.component';
import PageContainerList from './PageContainerList.component';
import { PAGE_HORIZONTAL_PADDING } from './PageContainer.config';

function PageContainer(props: PropsWithChildren) {
  return <SafeAreaView style={styles.container}>
    { props.children }
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    paddingTop: HEADER_HEIGHT + 32,
    paddingHorizontal: PAGE_HORIZONTAL_PADDING,
  }
});

PageContainer.Scroll = PageContainerScroll;
PageContainer.List = PageContainerList;

export default PageContainer;