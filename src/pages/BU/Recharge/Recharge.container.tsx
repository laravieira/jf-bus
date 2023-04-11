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

// @ts-ignore
type RechargeProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_RECHARGE>;

function Recharge({ route: { params }, navigation }: RechargeProps) {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = navigation;
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [value, setValue] = useState<number|null>(null);

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  function onPageFocus() {
    const { data } = params as { data?: Card|Owner|Order};
    console.debug('onPageFocus', data);
    if(data?.iss) {
      const card = data as Card;
      setCards([card]);
      setValue((card.orders?.items[0]) ? card.orders?.items[0].credit : null);
    }else if(data?.card) {
      const owner = data as Owner;
      setCards([owner.card]);
      setValue(owner.card.orders?.items[0] ? owner.card.orders?.items[0].credit : null);
    }else if(data?.value) {
      const order = data as Order;
      setCards(order.cards?.items ?? []);
      setValue(order.value);
    }else {
      setCards([]);
      setValue(null);
    }
  }

  function onCreate() {
    CreateOrder(session ?? '', cards[0], value ?? 3.1)
      .then(order => {
        console.debug(order);
        // @ts-ignore
        navigation.navigate(ROUTE_BU_MAIN);
      })
      .catch(console.warn);
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