import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import Line from '../../../components/Line';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Orders, { Order as OrderType } from '../../../handlers/Orders.handler';
import Order from '../../../components/Order';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';

function Recharges() {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  function onPageFocus() {
    if(orders.length)
      return;
    Orders(session ?? '')
      .then(page => setOrders(page.orders))
      .catch(console.warn);
  }

  function renderHeader() {
    return <View key="header" style={styles.header}>
      <Text.H3>All Recharges</Text.H3>
      <Line style={styles.line}/>
    </View>;
  }

  function renderOrder(order: OrderType) {
    return <Order order={order}/>;
  }

  function renderItem({ item: order, index }: ListRenderItemInfo<OrderType>) {
    return <>
      { !index ? renderHeader() : <></> }
      { renderOrder(order) }
    </>;
  }

  function keyExtractor(order: OrderType): string {
    return `${order.id}`;
  }

  return <PageContainer.List
    data={orders}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    style={styles.page}
  />;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 0
  },
  header: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  line: {
    marginTop: 8,
    marginBottom: 24
  }
});

export default Recharges;