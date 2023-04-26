import { Order as OrderModel } from '../../models/Order.model';
import { ViewStyle } from 'react-native';
import OrderComponent from './Order.component';
import useAppSelector from '../../hooks/useAppSelector.hook';
import Receipt from '../../handlers/Receipt.handler';
import Billet from '../../handlers/Billet.handler';
import { ROUTE_BU_ORDER, ROUTE_BU_RECHARGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import CancelOrder from '../../handlers/CancelOrder.handler';
import { useSession } from '../../hooks/useSession.hook';
import useAppDispatch from '../../hooks/useAppDispatch.hook';
import { setLogin } from '../../slices/login.slice';

type OrderProps = {
  order: OrderModel,
  style?: ViewStyle
};

function Order(props: OrderProps) {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, useNavigation());
  const { navigate } = useNavigation();

  function onDetails() {
    const { order } = props;

    // @ts-ignore
    navigate(ROUTE_BU_ORDER, { order: { ...order, createdAt: undefined }});
  }

  function onShare() {
    console.debug('onShare');
    //TODO Implement order sharing
  }

  function onCodeCopy() {
    const { order } = props;
    console.debug('onCodeCopy');
    //TODO Implement order auto copy barcode
    session()
      .then(session => Billet.requestFile(session, order))
      .catch(console.warn)
  }

  function onDownload() {
    const { order } = props;
    console.debug('onDownload');
    //TODO Implement order recipe/bill download
    session()
      .then(session => Receipt(session, order))
      .catch(console.warn)
  }

  function onDuplicate() {
    const { order } = props;

    // @ts-ignore
    navigate(ROUTE_BU_RECHARGE, { order: { ...order, createdAt: undefined } });
  }

  function onCancel() {
    const { order } = props;

    session()
      .then(session => CancelOrder(session, order))
      .then(() => alert('Order canceled'))
      .catch(console.warn);
  }

  const orderComponentProps = {
    ...props,
    onDetails,
    onShare,
    onCodeCopy,
    onDownload,
    onDuplicate,
    onCancel
  };

  return <OrderComponent { ...orderComponentProps }></OrderComponent>;
}

export default Order;