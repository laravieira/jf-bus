import { StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import { NAVBAR_HEIGHT } from './Navbar.config';
import NavbarButton from './NavBarButton.component';

type NavbarComponentProps = {
  onButtonPress: (route: Route<any>, hasFocus: boolean) => void,
  show: boolean
} & BottomTabBarProps;

function NavbarComponent(props: NavbarComponentProps) {
  function renderButton(route: Route<any>, key: number) {
    const { state: { index }, descriptors, onButtonPress } = props;
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
    return <NavbarButton
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

  return <View style={ props.show ? styles.navbar : { display: 'none' } }>
    { renderButtons() }
  </View>;
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    height: NAVBAR_HEIGHT,
    width: '100%',
    backgroundColor: '#D9BACB'
  }
});

export default NavbarComponent;