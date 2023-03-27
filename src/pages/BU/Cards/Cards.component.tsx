import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import Line from '../../../components/Line';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Owners, { Owner } from '../../../handlers/Owners.handler';
import Card from '../../../components/Card';

function Cards() {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [cards, setCards] = useState<Owner[]>([]);

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  function onPageFocus() {
    if(cards.length)
      return;
    Owners(session ?? '')
      .then(page => setCards(page.owners))
      .catch(console.warn);
  }

  function renderHeader() {
    return <View key="header">
      <Text.H3>All Cards</Text.H3>
      <Line style={styles.smallSpace}/>
    </View>;
  }

  function renderCard(owner: Owner) {
    return <Card owner={owner} style={styles.card} showHome/>;
  }

  function renderItem({ item: owner, index }: ListRenderItemInfo<Owner>) {
    return <>
      { !index ? renderHeader() : <></> }
      { renderCard(owner) }
    </>;
  }

  function keyExtractor(owner: Owner): string {
    return `${owner.id}`;
  }

  return <PageContainer.List data={cards} renderItem={renderItem} keyExtractor={keyExtractor} />;
}

const styles = StyleSheet.create({
  smallSpace: {
    marginTop: 8,
    marginBottom: 24
  },
  card: {
    marginBottom: 16
  }
});

export default Cards;