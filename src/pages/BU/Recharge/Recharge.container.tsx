import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN, ROUTE_BU_MAIN, ROUTE_BU_RECHARGE } from '../../../constants';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import RechargeComponent from './Recharge.component';
import { Card } from '../../../models/Card.model';
import { Owner } from '../../../models/Owner.model';
import { Order } from '../../../models/Order.model';
import CreateOrder from '../../../handlers/CreateOrder.handler';
import { userLogin } from '../../../slices/user.slice';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';

// @ts-ignore
type RechargeProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_RECHARGE>;
type paramsProp = { card?: Card, owner?: Owner, order?: Order, value?: number };

function Recharge({ route: { params }, navigation }: RechargeProps) {
  const { logged, session, loading: loginLoading, autoLogged } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = navigation;
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [value, setValue] = useState<number|null>(null);

  useEffect(() => {
    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  useEffect(onPageFocus, [loginLoading, logged]);

  useEffect(() => {
    setLoading(loginLoading || loading);
  }, [loginLoading]);

  function onPageFocus() {
    if(!logged && !loginLoading && !autoLogged)
      dispatch(userLogin({}))
    if(!logged && !loginLoading && autoLogged)
      // @ts-ignore
      navigate(ROUTE_BU_LOGIN);
    if(logged && !loginLoading)
      loadParams();
  }

  function loadParams() {
    const { card, owner, order, value } = params as paramsProp;

    if(card) {
      setCards([card]);
      setValue(value ? value : ((card.orders?.items[0]) ? card.orders?.items[0].credit : null));
    }else if(owner) {
      setCards([owner.card]);
      setValue(value ? value : (owner.card.orders?.items[0] ? owner.card.orders?.items[0].credit : null));
    }else if(order) {
      setCards(order.cards?.items ?? []);
      setValue(value ? value : (order.value));
    }else {
      setCards([]);
      setValue(value ? value : null);
    }
  }

  function onCreate() {
    setLoading(true);
    CreateOrder(session ?? '', cards[0], value ?? 3.1)
      .then(order => {
        console.debug(order);
        // @ts-ignore
        navigation.navigate(ROUTE_BU_MAIN);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  const rechargeComponentsProps = {
    value,
    setValue,
    create: onCreate,
    cards,
    loading
  };

  return <RechargeComponent { ...rechargeComponentsProps } />;
}

export default Recharge;