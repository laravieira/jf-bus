import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Orders from '../../../handlers/Orders.handler';
import Order from '../../../components/Order';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import { Order as OrderModel } from '../../../models/Order.model';
import { Page } from '../../../models/Page.model';
import Header from '../../../components/Header';
import { useSession } from '../../../hooks/useSession.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { setLogin } from '../../../slices/login.slice';

function Recharges() {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, useNavigation(), onSessionOrFocus);
  const [page, setPage] = useState<Page<OrderModel>>({ current: 0, total: 0, pages: 1, items: []});
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderModel[]>([]);

  function loadOrders() {
    if(loading || page.current+1 > page.pages)
      return;
    setLoading(true);
    session()
      .then(session => Orders(session, page.current+1))
      .then(page => {
        setOrders([...orders, ...page.items])
        return page;
      })
      .then(page => {
        setPage({...page, items: []})
        return page;
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  function onSessionOrFocus() {
    if(orders.length)
      return;
    loadOrders();
  }

  function renderHeader() {
    return <Header
      style={styles.header}
      length={orders.length}
      total={page.total}
      key="header">
      All Recharges
    </Header>;
  }

  function renderOrder(order: OrderModel) {
    return <Order order={order}/>;
  }

  function renderItem({ item: order, index }: ListRenderItemInfo<OrderModel>) {
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

  function keyExtractor(order: OrderModel, index: number): string {
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
  footer: {
    paddingVertical: 24,
    alignItems: 'center'
  }
});

export default Recharges;