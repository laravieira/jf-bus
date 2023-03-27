import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import useAppSelector from '../../hooks/useAppSelector.hook';
import useAppDispatch from '../../hooks/useAppDispatch.hook';
import { useEffect } from 'react';
import { loadQuickCard } from '../../slices/quickCard.slice';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_BU_CARDS, ROUTE_BU_LOGIN } from '../../constants';

function Home() {
  const { quickCard: { card }, user: { logged } } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(loadQuickCard());
  }, []);

  function onEmptyQuickCard() {
    if(logged)
      // @ts-ignore
      navigate({name: ROUTE_BU_CARDS});
    else
      // @ts-ignore
      navigate({name: ROUTE_BU_LOGIN});
  }

  function renderQuickCard() {
    if(card)
      return <Card owner={card} showRecharge/>;
    else
      return <Card.Empty onPress={onEmptyQuickCard}/>;
  }

  return <PageContainer>
    { renderQuickCard() }
  </PageContainer>;
}

export default Home;