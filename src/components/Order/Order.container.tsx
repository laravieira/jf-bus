import { Order as OrderModel } from '../../models/Order.model';
import { ViewStyle } from 'react-native';
import OrderComponent from './Order.component';
import OrderHandler from '../../handlers/Order.handler';
import useAppSelector from '../../hooks/useAppSelector.hook';
import Receipt from '../../handlers/Receipt.handler';
import Billet from '../../handlers/Billet.handler';
import { ROUTE_BU_RECHARGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import CancelOrder from '../../handlers/CancelOrder.handler';

type OrderProps = {
  order: OrderModel,
  style?: ViewStyle
};

function Order(props: OrderProps) {
  const { session } = useAppSelector(state => state.user);
  const { navigate } = useNavigation();

  function onDetails() {
    const { order } = props;
    console.debug('onDetails');
    OrderHandler(session ?? '', order)
      .then(data => console.debug(data))
      .catch(console.warn)
    //TODO Implement order details page
  }

  function onShare() {
    console.debug('onShare');
    //TODO Implement order sharing
  }

  function onCodeCopy() {
    const { order } = props;
    console.debug('onCodeCopy');
    //TODO Implement order auto copy barcode
    Billet.requestFile(session ?? '', order)
      .catch(console.warn)
  }

  function onDownload() {
    const { order } = props;
    console.debug('onDownload');
    //TODO Implement order recipe/bill download
    Receipt(session ?? '', order)
      .then(data => console.debug(data))
      .catch(console.warn)
  }

  function onDuplicate() {
    const { order } = props;
    // @ts-ignore
    navigate(ROUTE_BU_RECHARGE, {
      order: { ...order, createdAt: undefined }
    });
  }

  function onCancel() {
    const { order } = props;

    CancelOrder(session ?? '', order)
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