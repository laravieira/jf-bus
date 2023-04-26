import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { Order as OrderModel, OrderStatus } from '../../models/Order.model';
import { PAGE_HORIZONTAL_PADDING } from '../PageContainer/PageContainer.config';
import Text from '../Text';
import {
  ArchiveBoxXMarkIcon, ArrowPathIcon,
  CheckIcon, DocumentArrowDownIcon,
  FaceFrownIcon,
  QrCodeIcon,
  ShareIcon,
  SwatchIcon, XMarkIcon
} from 'react-native-heroicons/outline';

type OrderComponentProps = {
  order: OrderModel,
  style?: ViewStyle,
  onDetails: () => void,
  onShare: () => void,
  onCodeCopy: () => void,
  onDownload: () => void,
  onDuplicate: () => void,
  onCancel: () => void
};

function Order(props: OrderComponentProps) {
  const { style, onDetails } = props;

  function renderStatus(status: number) {
    if(status === OrderStatus.NEW)
      return <><SwatchIcon size={18} color="#1F5FF3"/><Text>New</Text></>;
    if(status === OrderStatus.CANCELED)
      return <><ArchiveBoxXMarkIcon size={18} color="#BE3333"/><Text>Canceled</Text></>;
    if(status === OrderStatus.DONE)
      return <><CheckIcon size={18} color="#00A72F"/><Text>Done</Text></>;
    return <><FaceFrownIcon size={18} color="#FFF"/><Text>Unknow</Text></>;
  }

  function renderDetails() {
    const { order: { id, status, value, createdAt } } = props;

    return <View>
      <Text style={styles.id}>{ id }</Text>
      <Text.Bold>Status</Text.Bold>
      <View style={styles.line}>
        <View style={styles.status}>{ renderStatus(status) }</View>
        <Text>{ `created at ${createdAt.toLocaleDateString('pt-br')}` }</Text>
      </View>
      <Text.H2 style={styles.price}>{ `R$: ${value.toFixed(2)}` }</Text.H2>
    </View>;
  }

  function renderButtons() {
    const iconProps = { size: 32, color: '#FFF' };
    const {
      order: {
        status
      },
      onShare,
      onCodeCopy,
      onDownload,
      onDuplicate,
      onCancel
    } = props;

    return <View style={styles.buttons}>
      { status === 2 ? <TouchableOpacity onPress={onShare}><ShareIcon {...iconProps}/></TouchableOpacity> : null }
      { status < 3 ? <TouchableOpacity onPress={onCodeCopy}><QrCodeIcon {...iconProps}/></TouchableOpacity> : null }
      <TouchableOpacity onPress={onDownload}><DocumentArrowDownIcon {...iconProps}/></TouchableOpacity>
      <TouchableOpacity onPress={onDuplicate}><ArrowPathIcon {...iconProps}/></TouchableOpacity>
      { status < 3 ? <TouchableOpacity onPress={onCancel}><XMarkIcon {...iconProps}/></TouchableOpacity> : null }
    </View>;
  }

  return <TouchableWithoutFeedback style={style} onPress={onDetails}>
    <View style={styles.order}>
      { renderDetails() }
      { renderButtons() }
    </View>
  </TouchableWithoutFeedback>;
}

const styles = StyleSheet.create({
  order: {
    backgroundColor: 'rgba(255 255 255 / .15)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255 255 255 / .3)',
    width: '100%',
    paddingHorizontal: PAGE_HORIZONTAL_PADDING,
    paddingVertical: 16,
    gap: 24
  },
  id: {
    marginBottom: 10
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  line:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    position: 'absolute',
    top: -7,
    right: 0
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24
  }
});

export default Order;