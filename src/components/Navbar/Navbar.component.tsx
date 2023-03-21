import { StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import NavbarIcon from './NavbarIcon.component';
import NavbarButton from './NavBarButton.component';

function Navbar(props: BottomTabBarProps) {
  function onButtonPress(route: Route<any>, hasFocus: boolean) {
    const { navigation } = props;
    const { key } = route;

    const pressEvent = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true
    });

    if(!hasFocus && !pressEvent.defaultPrevented)
      navigation.navigate({ key, merge:true });
  }

  function renderButton(route: Route<any>, key: number) {
    const { state: { index }, descriptors } = props;
    const {
      options: {
        tabBarAccessibilityLabel,
        tabBarTestID,
        tabBarIcon,
        tabBarButton
      }
    } = descriptors[route.key];

    const hasFocus = index === key;

    if(typeof tabBarButton !== 'undefined')
      return null;
    return <Navbar.Button
      hasFocus={hasFocus}
      label={tabBarAccessibilityLabel}
      id={tabBarTestID}
      icon={tabBarIcon}
      onButtonPress={() => onButtonPress(route, hasFocus) }
      key={key}
    />
  }

  function renderButtons() {
    const { state: { routes } } = props;

    return routes.map(renderButton);
  }

  return <View style={styles.navbar}>
    { renderButtons() }
  </View>;
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#D9BACB'
  }
});

Navbar.Icon = NavbarIcon;
Navbar.Button = NavbarButton;

export default Navbar;