import { NavigationContainer } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { IconProps } from '../components/Navbar/NavbarIcon.component';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTE_DEFAULT, SCREENS } from './Navigation.config';
import SearchBar from '../components/SearchBar';

const Tab = createBottomTabNavigator();

function renderScreen(screen: {
  name: string,
  title: string,
  icon: (props: IconProps) => JSX.Element,
  component: (props: any) => JSX.Element,
  visible: boolean
}, key: number) {
  const { name, title, icon, component, visible } = screen;

  return <Tab.Screen
    name={name}
    component={component}
    options={{
      title,
      tabBarIcon: props => <Navbar.Icon icon={icon} hasFocus={props.focused}/>,
      tabBarButton: visible ? undefined : () => null
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
      initialRouteName={ ROUTE_DEFAULT }
      sceneContainerStyle={{backgroundColor: 'transparent'}}
    >
      { SCREENS.map(renderScreen) }
    </Tab.Navigator>
  </NavigationContainer>
}

export default Navigation;