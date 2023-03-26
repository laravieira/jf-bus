import { StyleSheet, View } from 'react-native';
import MenuButton from './MenuButton.component';
import { PropsWithChildren } from 'react';
import { PAGE_HORIZONTAL_PADDING } from '../PageContainer/PageContainer.config';

function Menu(props: PropsWithChildren) {
  const { children } = props;

  return <View style={styles.menu}>
    { children }
  </View>
}

const styles = StyleSheet.create({
  menu: {
    left: 0,
    right: 0,
    height: 86,
    paddingHorizontal: PAGE_HORIZONTAL_PADDING,
    backgroundColor: 'rgba(255 255 255 / .3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255 255 255 / .3)',
    flexDirection: 'row',
  }
});

Menu.Button = MenuButton;

export default Menu;