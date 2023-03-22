import { Keyboard } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import NavbarIcon from './NavbarIcon.component';
import NavbarButton from './NavBarButton.component';
import { useEffect, useState } from 'react';
import NavbarComponent from './Navbar.component';

function Navbar(props: BottomTabBarProps) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    }
  }, []);

  function onKeyboardShow() {
    setShow(false);
  }

  function onKeyboardHide() {
    setShow(true);
  }

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

  const navbarComponentProps = {
    ...props,
    onButtonPress,
    show
  };

  return <NavbarComponent { ...navbarComponentProps } />;
}

Navbar.Icon = NavbarIcon;
Navbar.Button = NavbarButton;

export default Navbar;