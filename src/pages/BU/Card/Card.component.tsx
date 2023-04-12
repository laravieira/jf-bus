import PageContainer from '../../../components/PageContainer';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_CARD } from '../../../constants';
import Owner from '../../../handlers/Owner.handler';
import { Owner as OwnerModel } from '../../../models/Owner.model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import Header from '../../../components/Header';
import { useSession } from '../../../hooks/useSession.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { setLogin } from '../../../slices/login.slice';
import Text from '../../../components/Text';

// @ts-ignore
type CardProps = BottomTabScreenProps<RootParamsList, ROUTE_BU_CARD>;

function Card({ route: { params } }: CardProps) {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, useNavigation(), onSessionOrFocus);

  const [loading, setLoading] = useState<boolean>(false);
  const [owner, setOwner] = useState<OwnerModel|null>(null);

  function onSessionOrFocus() {
    if(owner || loading)
      return;
    setLoading(true);
    session()
      .then(session => Owner(session, params.owner))
      .then(setOwner)
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  return <PageContainer.Scroll>
    <Header>Card</Header>
    <Text>{ owner?.card.number }</Text>
  </PageContainer.Scroll>;
}

export default Card;