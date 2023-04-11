import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Owners from '../../../handlers/Owners.handler';
import Card from '../../../components/Card';
import { Page } from '../../../models/Page.model';
import { Owner } from '../../../models/Owner.model';
import Header from '../../../components/Header';

function Cards() {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [page, setPage] = useState<Page<Owner>>({ current: 0, total: 0, pages: 1, items: []});
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Owner[]>([]);

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  function loadCards() {
    if(loading || page.current+1 > page.pages)
      return;
    setLoading(true);
    Owners(session ?? '', page.current+1)
      .then(page => {
        setCards([...cards, ...page.items])
        return page;
      })
      .then(page => {
        setPage({...page, items: []})
        return page;
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  function onPageFocus() {
    if(cards.length)
      return;
    loadCards();
  }

  function renderHeader() {
    return <Header
      length={cards.length}
      total={page.total}
      key="header">
      All Cards
    </Header>;
  }

  function renderCard(owner: Owner) {
    return <Card card={owner.card} style={styles.card} showHome showRecharge showDetails/>;
  }

  function renderItem({ item: owner, index }: ListRenderItemInfo<Owner>) {
    return <>
      { !index ? renderHeader() : <></> }
      { renderCard(owner) }
    </>;
  }

  function renderFooter() {
    return <View style={styles.footer}>
      { loading
        ? <Text>Loading more...</Text>
        : <Text>{ `${ cards.length }/${ page.total }` }</Text>
      }
    </View>;
  }

  function keyExtractor(owner: Owner): string {
    return `${owner.id}`;
  }

  return <PageContainer.List
    data={cards}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    onEndReached={loadCards}
    onEndReachedThreshold={.3}
    ListFooterComponent={renderFooter()}
  />;
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center'
  }
});

export default Cards;