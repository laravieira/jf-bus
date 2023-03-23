import Favorites from '../pages/Favorites';
import Schedules from '../pages/Schedules';
import Home from '../pages/Home';
import Recharge from '../pages/Recharge';
import About from '../pages/About';
import Login from '../pages/Login';
import { AtSymbolIcon, ClockIcon, CreditCardIcon, HeartIcon, HomeIcon, UserIcon } from 'react-native-heroicons/outline';
import { IconProps } from '../components/Navbar/NavbarIcon.component';
import Schedule from '../pages/Schedule';
import {
  ROUTE_ABOUT,
  ROUTE_FAVORITES, ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_RECHARGE,
  ROUTE_SCHEDULE,
  ROUTE_SCHEDULES
} from '../constants';

type Screen = {
  name: string,
  title: string,
  icon: (props: IconProps) => JSX.Element,
  component: (props: any) => JSX.Element,
  visible: boolean
}



export const SCREENS: Screen[] = [
  {
    name: ROUTE_FAVORITES,
    title: 'Favorites Page',
    icon: HeartIcon,
    component: Favorites,
    visible: true
  },{
    name: ROUTE_SCHEDULES,
    title: 'List of Bus Schedule Page',
    icon: ClockIcon,
    component: Schedules,
    visible: true
  },{
    name: ROUTE_HOME,
    title: 'Home Page',
    icon: HomeIcon,
    component: Home,
    visible: true
  },{
    name: ROUTE_RECHARGE,
    title: 'Recharge Page',
    icon: CreditCardIcon,
    component: Recharge,
    visible: true
  },{
    name: ROUTE_ABOUT,
    title: 'About Page',
    icon: AtSymbolIcon,
    component: About,
    visible: true
  },{
    name: ROUTE_LOGIN,
    title: 'Recharge Login Page',
    icon: UserIcon,
    component: Login,
    visible: false
  },{
    name: ROUTE_SCHEDULE,
    title: 'Bus Schedule Page',
    icon: ClockIcon,
    component: Schedule,
    visible: false
  }
];
