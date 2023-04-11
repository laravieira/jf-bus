import PageContainer from '../../../components/PageContainer';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN, ROUTE_BU_CARD } from '../../../constants';
import Owner from '../../../handlers/Owner.handler';
import { Owner as OwnerModel } from '../../../models/Owner.model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import Header from '../../../components/Header';

// @ts-ignore
type CardProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_CARD>;

function Card({ route: { params } }: CardProps) {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [card, setCard] = useState<OwnerModel|null>(null);

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate(ROUTE_BU_LOGIN);

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  useEffect(() => {
    console.debug(card);
  }, [card]);

  function loadCard() {
    if(loading)
      return;
    setLoading(true);
    Owner(session ?? '', params.owner.id)
      .then(setCard)
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  function onPageFocus() {
    if(card)
      return;
    loadCard();
  }

  return <PageContainer.Scroll>
    <Header>Card</Header>
  </PageContainer.Scroll>;
}

export default Card;