import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import { User as UserModel } from '../../../models/User.model';
import User from '../../../handlers/User.handler';
import Header from '../../../components/Header';

function Account() {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, [logged]);

  function onPageFocus() {
    if(user && loading)
      return;
    setLoading(true);
    User(session ?? '')
      .then(setUser)
      .catch(console.warn)
      .finally(() => setLoading(false));
  }

  return <PageContainer.Scroll>
    <Header>Account</Header>
    <Text>{ user?.name }</Text>
  </PageContainer.Scroll>;
}

export default Account;