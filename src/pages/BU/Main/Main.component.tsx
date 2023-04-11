import PageContainer from '../../../components/PageContainer';
import { StyleSheet, View } from 'react-native';
import Card from '../../../components/Card';
import Menu from '../../../components/Menu';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import { ArrowUturnRightIcon, CreditCardIcon, NewspaperIcon, UserIcon } from 'react-native-heroicons/outline';
import { Card as CardModel } from '../../../models/Card.model';
import { Order as OrderModel } from '../../../models/Order.model';
import Order from '../../../components/Order';
import Header from '../../../components/Header';

type MainComponentProps = {
  card: CardModel|null,
  orders: OrderModel[],
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
    return <View style={styles.quickcard}>
      <Header>Main Card</Header>
      { card ? <Card card={card} showDetails showRecharge showHome/> : <Card.Empty/> }
    </View>;
  }

  function renderOrder(order: OrderModel) {
    return <Order key={order.id} order={order} />;
  }

  function renderOrders() {
    if(orders.length)
    return <>
      <Header style={styles.recharges}>Last Recharges</Header>
      { orders.map(renderOrder) }
    </>;
  }

  return <PageContainer.Scroll style={styles.container}>
    { renderMenu() }
    { renderQuickCard() }
    { renderOrders() }
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
  quickcard: {
    marginTop: 24,
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  recharges: {
    marginTop: 32,
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  }
});

export default MainComponent;