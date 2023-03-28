import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import Line from '../../../components/Line';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Orders, { Order as OrderType, OrdersPage } from '../../../handlers/Orders.handler';
import Order from '../../../components/Order';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';

function Recharges() {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [page, setPage] = useState<OrdersPage>({ current: 0, total: 0, pages: 1, orders: []});
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  function loadOrders() {
    if(loading || page.current+1 > page.pages)
      return;
    setLoading(true);
    Orders(session ?? '', page.current+1)
      .then(page => {
        setOrders([...orders, ...page.orders])
        return page;
      })
      .then(page => {
        setPage({...page, orders: []})
        return page;
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  function onPageFocus() {
    if(orders.length)
      return;
    loadOrders();
  }

  function renderHeader() {
    return <View key="header" style={styles.header}>
      <View style={styles.title}>
        <Text.H3>All Recharges</Text.H3>
        <Text>{ `${orders.length}/${page.total}` }</Text>
      </View>
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

  function renderFooter() {
    return <View style={styles.footer}>
      { loading
        ? <Text>Loading more...</Text>
        : <Text>{ `${ orders.length }/${ page.total }` }</Text>
      }
    </View>;
  }

  function keyExtractor(order: OrderType, index: number): string {
    return `${index}-${order.id}`;
  }

  return <PageContainer.List
    data={orders}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    style={styles.page}
    onEndReached={loadOrders}
    onEndReachedThreshold={.3}
    ListFooterComponent={renderFooter()}
  />;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 0
  },
  header: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  line: {
    marginTop: 8,
    marginBottom: 24
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center'
  }
});

export default Recharges;