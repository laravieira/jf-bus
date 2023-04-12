import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { User as UserModel } from '../../../models/User.model';
import User from '../../../handlers/User.handler';
import Header from '../../../components/Header';
import { useSession } from '../../../hooks/useSession.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { setLogin } from '../../../slices/login.slice';

function Account() {
  const login = useAppSelector(state => state.login);
  const session = useSession(login, useAppDispatch(), setLogin, useNavigation(), onSessionOrFocus);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserModel>();

  function onSessionOrFocus() {
    if(user || loading)
      return;
    setLoading(true);
    session()
      .then(session => User(session))
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