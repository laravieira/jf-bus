import PageContainer from '../../../components/PageContainer';
import { Order as OrderModel, OrderStatus } from '../../../models/Order.model';
import Header from '../../../components/Header';
import Text from '../../../components/Text';
import { StyleSheet, View } from 'react-native';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import {
  ArchiveBoxXMarkIcon, ArrowPathIcon,
  CheckIcon, DocumentArrowDownIcon,
  FaceFrownIcon,
  QrCodeIcon,
  ShareIcon,
  SwatchIcon, XMarkIcon
} from 'react-native-heroicons/outline';
import { Card as CardModel } from '../../../models/Card.model';
import Card from '../../../components/Card';
import Menu from '../../../components/Menu';

// @ts-ignore
type OrderProps = {
  order: OrderModel|null,
  onShare: () => void,
  onCodeCopy: () => void,
  onDownload: () => void,
  onDuplicate: () => void,
  onCancel: () => void
};

function Order(props: OrderProps) {
  const {
    order,
    onShare,
    onCodeCopy,
    onDownload,
    onDuplicate,
    onCancel
  } = props;

  function renderCard(card: CardModel, key: number) {
    return <Card card={card} key={key} showDetails showRecharge showHome/>;
  }

  function renderLine(key: string, value: string|number|undefined, link?: string) {
    return <View style={styles.line}>
      <Text.Bold>{ key }</Text.Bold>
      { link ? <Text.Link url={link}>{ value }</Text.Link> : <Text>{ value }</Text> }
    </View>;
  }

  function renderStatus(status: OrderStatus|undefined) {
    if(status === OrderStatus.NEW)
      return <View style={styles.line}>
        <Text.Bold>Status:</Text.Bold>
        <SwatchIcon size={18} color="#1F5FF3"/>
        <Text>New</Text>
      </View>;
    if(status === OrderStatus.CANCELED)
      return <View style={styles.line}>
        <Text.Bold>Status:</Text.Bold>
        <ArchiveBoxXMarkIcon size={18} color="#BE3333"/>
        <Text>Canceled</Text>
      </View>;
    if(status === OrderStatus.DONE)
      return <View style={styles.line}>
        <Text.Bold>Status:</Text.Bold>
        <CheckIcon size={18} color="#00A72F"/>
        <Text>Done</Text>
      </View>;
    return <View style={styles.line}>
      <Text.Bold>Status:</Text.Bold>
      <FaceFrownIcon size={18} color="#FFF"/>
      <Text>Unknow</Text>
      </View>;
  }

  return <PageContainer.Scroll>
    <Menu>
      <Menu.Button icon={ShareIcon} onPress={onShare}>Share</Menu.Button>
      <Menu.Button icon={QrCodeIcon} onPress={onCodeCopy}>Bar Code</Menu.Button>
      <Menu.Button icon={DocumentArrowDownIcon} onPress={onDownload}>Billet</Menu.Button>
      <Menu.Button icon={ArrowPathIcon} onPress={onDuplicate}>Duplicate</Menu.Button>
      <Menu.Button icon={XMarkIcon} onPress={onCancel}>Cancel</Menu.Button>
    </Menu>
    <View style={styles.page}>
      <Header style={styles.header} length={order?.id}>Order Details</Header>
      { renderStatus(order?.status) }
      { renderLine('Created At:', `${order?.createdAt?.getDay()}/${1+(order?.createdAt?.getMonth() ?? 0)}/${order?.createdAt?.getFullYear()}`) }
      { order?.status === OrderStatus.DONE ? renderLine('Paid At:', `${order?.paidAt?.getDay()}/${1+(order?.paidAt?.getMonth() ?? 0)}/${order?.paidAt?.getFullYear()}`) : null }
      { order?.status === OrderStatus.DONE ? renderLine('Available from:', `${order?.rechargePeriod?.from?.getDay()}/${1+(order?.rechargePeriod?.from?.getMonth() ?? 0)}/${order?.rechargePeriod?.from?.getFullYear()}`) : null }

      <Header style={styles.header} length={`R$: ${ order?.values?.total?.toFixed(2) ?? '0.00' }`}>Values</Header>
      { renderLine('Recharges:', `R$: ${ order?.values?.recarges?.toFixed(2) ?? '0.00' }`) }
      { renderLine('Tax:', `R$: ${ order?.values?.taxes?.toFixed(2) ?? '0.00' }`) }
      { renderLine('Paid:', `R$: ${ order?.values?.paid?.toFixed(2) ?? '0.00' }`) }

      <Header
        style={styles.header}
        length={order?.cards?.items.length}
        total={order?.cards?.total}>
        Cards
      </Header>
      <View style={styles.cards}>
        { order?.cards?.items.map(renderCard) }
      </View>
    </View>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  header: {
    paddingHorizontal: 0,
    marginTop: 32
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  total: {
    alignItems: 'flex-end',
    marginTop: 4
  },
  cards: {
    gap: 24
  }
});

export default Order;