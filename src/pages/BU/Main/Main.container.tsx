import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_ACCOUNT, ROUTE_BU_CARDS, ROUTE_BU_LOGIN, ROUTE_BU_RECHARGES } from '../../../constants';
import { userLogin, userLogout } from '../../../slices/user.slice';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import MainComponent from './Main.component';
import { loadQuickCard } from '../../../slices/quickCard.slice';
import Orders from '../../../handlers/Orders.handler';
import { Order } from '../../../models/Order.model';

function Main() {
  const { logged, loading, autoLogged, session } = useAppSelector(state => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const { card } = useAppSelector(state => state.quickCard);
  const { navigate, addListener, removeListener } = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuickCard());

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  useEffect(onPageFocus, [loading, logged]);

  function onPageFocus() {
    if(!logged && !loading && !autoLogged)
      dispatch(userLogin({}))
    if(!logged && !loading && autoLogged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });
    if(logged && !loading)
      Orders(session ?? '')
        .then(page => setOrders(page.items))
        .catch(console.warn);
  }

  function onPageAccount() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_ACCOUNT })
  }

  function onPageRecharges() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_RECHARGES })
  }

  function onPageCards() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_CARDS })
  }

  function onLogout() {
    dispatch(userLogout());
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