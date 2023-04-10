import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import useAppSelector from '../../hooks/useAppSelector.hook';
import useAppDispatch from '../../hooks/useAppDispatch.hook';
import { useEffect } from 'react';
import { loadQuickCard } from '../../slices/quickCard.slice';

function Home() {
  const { card } = useAppSelector(state => state.quickCard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuickCard());
  }, []);

  function renderQuickCard() {
    if(card)
      return <Card card={card} showRecharge/>;
    else
      return <Card.Empty/>;
  }

  return <PageContainer>
    { renderQuickCard() }
  </PageContainer>;
}

export default Home;