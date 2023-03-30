import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import Line from '../../../components/Line';
import { StyleSheet } from 'react-native';
import User, { UserType } from '../../../handlers/User.handler';

function Account() {
  const { logged, session } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>();

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
    <Text.H3>Account</Text.H3>
    <Line style={styles.smallSpace}/>
    <Text>{ user?.name }</Text>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  smallSpace: {
    marginTop: 8
  }
});

export default Account;