import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import Line from '../../../components/Line';
import { StyleSheet, View } from 'react-native';
import Card from '../../../components/Card';
import Menu from '../../../components/Menu';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import { ArrowUturnRightIcon, CreditCardIcon, NewspaperIcon, UserIcon } from 'react-native-heroicons/outline';
import { Owner } from '../../../handlers/Owners.handler';
import { Order } from '../../../handlers/Orders.handler';

type MainComponentProps = {
  card: Owner|null,
  orders: Order[],
  onPageAccount: () => void,
  onPageRecharges: () => void,
  onPageCards: () => void,
  onLogout: () => void
};

function MainComponent(props: MainComponentProps) {
  const {
    card,
    orders,
    onPageAccount,
    onPageRecharges,
    onPageCards,
    onLogout
  } = props;

  function renderMenu() {
    return <Menu>
      <Menu.Button icon={UserIcon} onPress={onPageAccount}>Account</Menu.Button>
      <Menu.Button icon={NewspaperIcon} onPress={onPageRecharges}>Recharges</Menu.Button>
      <Menu.Button icon={CreditCardIcon} onPress={onPageCards}>Cards</Menu.Button>
      <Menu.Button icon={ArrowUturnRightIcon} onPress={onLogout}>Logout</Menu.Button>
    </Menu>;
  }

  function renderQuickCard() {
    if(card)
      return <Card style={styles.mediumSpace} owner={card} showDetails showRecharge/>;
    else
      return <Card.Empty style={styles.mediumSpace}/>;
  }

  function renderOrder(order: Order) {
    return <View key={order.id}><Text.H2>{ order.price }: { order.status }</Text.H2></View>;
  }

  function renderOrders() {
    if(orders.length)
    return <>
      <Text.H3 style={styles.largeSpace}>Last Recharges</Text.H3>
      <Line style={styles.smallSpace}/>
      { orders.map(renderOrder) }
    </>;
  }

  return <PageContainer.Scroll style={styles.container}>
    { renderMenu() }
    <View style={styles.content}>
      { renderQuickCard() }
      { renderOrders() }
    </View>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
  content: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  largeSpace: {
    marginTop: 32
  },
  mediumSpace: {
    marginTop: 24,
  },
  smallSpace: {
    marginTop: 8
  },
  small: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default MainComponent;