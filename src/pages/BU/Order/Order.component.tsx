import PageContainer from '../../../components/PageContainer';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_ORDER } from '../../../constants';
import OrderHandler from '../../../handlers/Order.handler';
import { Order as OrderModel } from '../../../models/Order.model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import Header from '../../../components/Header';
import { useSession } from '../../../hooks/useSession.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { setLogin } from '../../../slices/login.slice';
import Text from '../../../components/Text';

// @ts-ignore
type OrderProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_ORDER>;

function Order({ route: { params } }: OrderProps) {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, useNavigation(), onSessionOrFocus);

  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderModel|null>(null);

  function onSessionOrFocus() {
    if(order || loading)
      return;
    setLoading(true);
    session()
      .then(session => OrderHandler(session, params.order))
      .then(setOrder)
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  return <PageContainer.Scroll>
    <Header>Order</Header>
    <Text>{ order?.id }</Text>
  </PageContainer.Scroll>;
}

export default Order;