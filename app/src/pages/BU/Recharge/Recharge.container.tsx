import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_MAIN, ROUTE_BU_RECHARGE } from '../../../constants';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import RechargePage from './Recharge.page';
import { Card } from '../../../models/Card.model';
import { Owner } from '../../../models/Owner.model';
import { Order } from '../../../models/Order.model';
import CreateOrder from '../../../handlers/CreateOrder.handler';
import { setLogin } from '../../../slices/login.slice';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { useSession } from '../../../hooks/useSession.hook';
import CardHandler from '../../../handlers/Card.handler';
import OrderHandler from '../../../handlers/Order.handler';

// @ts-ignore
type RechargeProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_RECHARGE>;
type paramsProp = { card?: Card, owner?: Owner, order?: Order, value?: number };

function Recharge({ route: { params }, navigation }: RechargeProps) {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, navigation, onSessionOrFocus);
  const { loading: loginLoading } = login;

  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [value, setValue] = useState<number|null>(null);

  useEffect(() => {
    setLoading(loginLoading || loading);
  }, [loginLoading]);

  function onSessionOrFocus() {
    session().then(loadParams);
  }

  function loadParams() {
    const { card, owner, order, value } = params as paramsProp;

    if(card) {
      setCards([card]);
      if(value)
        setValue(value);
      else if(card.orders?.items[0])
        setValue(card.orders?.items[0].credit);
      else session()
        .then(session => CardHandler(session, card.number))
        .then(card => setValue(card.orders?.items[0] ? card.orders?.items[0].credit : null))
        .catch(() => setValue(null))
    }else if(owner) {
      setCards([owner.card]);
      if(value)
        setValue(value);
      else if(owner.card.orders?.items[0])
        setValue(owner.card.orders?.items[0].credit);
      else session()
          .then(session => CardHandler(session, owner.card.number))
          .then(card => setValue(card.orders?.items[0] ? card.orders?.items[0].credit : null))
          .catch(() => setValue(null))
    }else if(order) {
      setValue(value ? value : (order.value));
      if(order.cards?.items)
        setCards(order.cards?.items);
      else session()
        .then(session => OrderHandler(session, order))
        .then(order => setCards(order.cards?.items ?? []))
        .catch(() => setCards([]));
    }else {
      setCards([]);
      setValue(value ? value : null);
    }
  }

  function onCreate() {
    setLoading(true);
    session()
      .then(session => CreateOrder(session, cards[0], value ?? 3.1))
      // @ts-ignore
      .then(() => navigation.navigate(ROUTE_BU_MAIN))
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  const rechargePageProps = {
    value,
    setValue,
    create: onCreate,
    cards,
    loading
  };

  return <RechargePage { ...rechargePageProps } />;
}

export default Recharge;