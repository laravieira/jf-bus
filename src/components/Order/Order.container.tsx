import { Order as OrderModel } from '../../models/Order.model';
import { ViewStyle } from 'react-native';
import OrderComponent from './Order.component';
import OrderHandler from '../../handlers/Order.handler';
import useAppSelector from '../../hooks/useAppSelector.hook';
import Receipt from '../../handlers/Receipt.handler';
import Billet from '../../handlers/Billet.handler';

type OrderProps = {
  order: OrderModel,
  style?: ViewStyle
};

function Order(props: OrderProps) {
  const { session } = useAppSelector(state => state.user);

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
    console.debug('onDuplicate');
    //TODO Implement order duplicate
  }

  function onCancel() {
    console.debug('onCancel');
    //TODO Implement order delete
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