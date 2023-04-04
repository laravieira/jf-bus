import { Order as OrderType } from '../../handlers/Orders.handler';
import { ViewStyle } from 'react-native';
import OrderComponent from './Order.component';
import OrderHandler from '../../handlers/Order.handler';
import useAppSelector from '../../hooks/useAppSelector.hook';
import Receipt from '../../handlers/Receipt.handler';

type OrderProps = {
  order: OrderType,
  style?: ViewStyle
};

function Order(props: OrderProps) {
  const { session } = useAppSelector(state => state.user);

  function onDetails() {
    const { order: { owner, number, status } } = props;
    console.debug('onDetails');
    OrderHandler(session ?? '', owner, number, status)
      .then(data => console.debug(data))
      .catch(console.warn)
    //TODO Implement order details page
  }

  function onShare() {
    console.debug('onShare');
    //TODO Implement order sharing
  }

  function onCodeCopy() {
    console.debug('onCodeCopy');
    //TODO Implement order auto copy barcode
  }

  function onDownload() {
    const { order: { owner, number, status } } = props;
    console.debug('onDownload');
    //TODO Implement order recipe/bill download
    Receipt(session ?? '', owner, number, status)
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