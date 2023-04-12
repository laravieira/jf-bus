import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_ORDER, ROUTE_BU_RECHARGE } from '../../../constants';
import OrderHandler from '../../../handlers/Order.handler';
import { Order as OrderModel } from '../../../models/Order.model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import { useSession } from '../../../hooks/useSession.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { setLogin } from '../../../slices/login.slice';
import OrderComponent from './Order.component';
import Billet from '../../../handlers/Billet.handler';
import Receipt from '../../../handlers/Receipt.handler';
import CancelOrder from '../../../handlers/CancelOrder.handler';

// @ts-ignore
type OrderProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_ORDER>;

function Order({ route: { params }, navigation }: OrderProps) {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, navigation, onSessionOrFocus);

  let _loading = false;
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderModel|null>(null);

  function onSessionOrFocus() {
    if(order || loading || _loading)
      return;
    setLoading(_loading = true);
    session()
      .then(session => OrderHandler(session, params.order))
      .then(setOrder)
      .catch(console.warn)
      .finally(() => setLoading(_loading = false));
  }

  function onShare() {
    if(!order)
      return;

    console.debug('onShare');
    //TODO Implement order sharing
  }

  function onCodeCopy() {
    if(!order)
      return;

    console.debug('onCodeCopy');
    //TODO Implement order auto copy barcode
    session()
      .then(session => Billet.requestFile(session, order))
      .catch(console.warn)
  }

  function onDownload() {
    if(!order)
      return;

    console.debug('onDownload');
    //TODO Implement order recipe/bill download
    session()
      .then(session => Receipt(session, order))
      .catch(console.warn)
  }

  function onDuplicate() {
    if(!order)
      return;

    // @ts-ignore
    navigation.navigate(ROUTE_BU_RECHARGE, {
      order: { ...order, createdAt: undefined }
    });
  }

  function onCancel() {
    if(!order)
      return;

    session()
      .then(session => CancelOrder(session, order))
      .then(() => alert('Order canceled'))
      .catch(console.warn);
  }

  const orderComponentProps = {
    order,
    onShare,
    onCodeCopy,
    onDownload,
    onDuplicate,
    onCancel
  };

  return <OrderComponent { ...orderComponentProps }/>;
}

export default Order;