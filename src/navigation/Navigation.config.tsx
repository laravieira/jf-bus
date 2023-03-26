import Favorites from '../pages/Favorites';
import Schedules from '../pages/Schedules';
import Home from '../pages/Home';
import BU from '../pages/BU';
import About from '../pages/About';
import { AtSymbolIcon, ClockIcon, CreditCardIcon, HeartIcon, HomeIcon, UserIcon } from 'react-native-heroicons/outline';
import { IconProps } from '../components/Navbar/NavbarIcon.component';
import Schedule from '../pages/Schedule';
import {
  ROUTE_ABOUT,
  ROUTE_FAVORITES,
  ROUTE_HOME,
  ROUTE_BU_LOGIN,
  ROUTE_BU_MAIN,
  ROUTE_SCHEDULE,
  ROUTE_SCHEDULES,
  ROUTE_BU_ACCOUNT,
  ROUTE_BU_RECHARGES,
  ROUTE_BU_CARDS
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
    name: ROUTE_BU_MAIN,
    title: 'BU Main Page',
    icon: CreditCardIcon,
    component: BU.Main,
    visible: true
  },{
    name: ROUTE_ABOUT,
    title: 'About Page',
    icon: AtSymbolIcon,
    component: About,
    visible: true
  },{
    name: ROUTE_BU_LOGIN,
    title: 'BU Login Page',
    icon: UserIcon,
    component: BU.Login,
    visible: false
  },{
    name: ROUTE_BU_ACCOUNT,
    title: 'BU Account Page',
    icon: UserIcon,
    component: BU.Account,
    visible: false
  },{
    name: ROUTE_BU_RECHARGES,
    title: 'BU Recharges List Page',
    icon: UserIcon,
    component: BU.Recharges,
    visible: false
  },{
    name: ROUTE_BU_CARDS,
    title: 'BU Cards List Page',
    icon: UserIcon,
    component: BU.Cards,
    visible: false
  },{
    name: ROUTE_SCHEDULE,
    title: 'Bus Schedule Page',
    icon: ClockIcon,
    component: Schedule,
    visible: false
  }
];
