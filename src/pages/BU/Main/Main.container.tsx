import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_ACCOUNT, ROUTE_BU_CARDS, ROUTE_BU_RECHARGES } from '../../../constants';
import { logout } from '../../../slices/login.slice';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import MainComponent from './Main.component';
import { loadQuickCard } from '../../../slices/quickCard.slice';
import Orders from '../../../handlers/Orders.handler';
import { Order } from '../../../models/Order.model';
import { useSession } from '../../../hooks/useSession.hook';
import { setLogin } from '../../../slices/login.slice';

function Main() {
  const { login } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const session = useSession(login, dispatch, setLogin, useNavigation(), onSessionOrFocus);
  const { navigate } = useNavigation();

  const [orders, setOrders] = useState<Order[]>([]);
  const { card } = useAppSelector(state => state.quickCard);

  function onSessionOrFocus() {
    dispatch(loadQuickCard());
    session()
      .then(session => Orders(session ?? '')
        .then(page => setOrders(page.items)))
      .catch(() => null);
  }

  function onPageAccount() {
    // @ts-ignore
    navigate(ROUTE_BU_ACCOUNT)
  }

  function onPageRecharges() {
    // @ts-ignore
    navigate(ROUTE_BU_RECHARGES)
  }

  function onPageCards() {
    // @ts-ignore
    navigate(ROUTE_BU_CARDS)
  }

  function onLogout() {
    dispatch(logout());
  }

  const mainComponentProps = {
    card,
    orders,
    onPageAccount,
    onPageRecharges,
    onPageCards,
    onLogout
  };

  return <MainComponent { ...mainComponentProps }/>;
}

export default Main;