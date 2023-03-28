import { Order as OrderType } from '../../handlers/Orders.handler';
import { ViewStyle } from 'react-native';
import OrderComponent from './Order.component';

type OrderProps = {
  order: OrderType,
  style?: ViewStyle
};

function Order(props: OrderProps) {

  function onDetails() {
    console.debug('onDetails');
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
    console.debug('onDownload');
    //TODO Implement order recipe/bill download
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