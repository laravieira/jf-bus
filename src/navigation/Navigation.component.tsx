import { NavigationContainer } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { IconProps } from '../components/Navbar/NavbarIcon.component';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootParamsList, SCREENS } from './Navigation.config';
import SearchBar from '../components/SearchBar';
import { ROUTE_DEFAULT } from '../constants';

const Tab = createBottomTabNavigator<RootParamsList>();

function renderScreen(screen: {
  name: string,
  title: string,
  icon: (props: IconProps) => JSX.Element,
  component: (props: any) => JSX.Element,
  visible: boolean,
  resetOnOutFocus?: boolean
}, key: number) {
  const { name, title, icon, component, visible, resetOnOutFocus } = screen;

  return <Tab.Screen
    // @ts-ignore
    name={ name }
    component={component}
    options={{
      title,
      tabBarIcon: props => <Navbar.Icon icon={icon} hasFocus={props.focused}/>,
      tabBarButton: visible ? undefined : () => null,
      unmountOnBlur: resetOnOutFocus
    }}
    key={key}
  />
}

function Navigation() {
  return <NavigationContainer>
    <SearchBar/>
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={ props => <Navbar { ...props } />}
      // @ts-ignore
      initialRouteName={ ROUTE_DEFAULT }
      sceneContainerStyle={{backgroundColor: 'transparent'}}
    >
      { SCREENS.map(renderScreen) }
    </Tab.Navigator>
  </NavigationContainer>
}

export default Navigation;