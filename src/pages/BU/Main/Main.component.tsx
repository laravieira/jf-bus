import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import { userLogin, userLogout } from '../../../slices/user.slice';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import Line from '../../../components/Line';
import { StyleSheet } from 'react-native';
import Card from '../../../components/Card';
import Owners from '../../../handlers/Owners.handler';
import Button from '../../../components/Button';

function Main() {
  const { logged, loading, autoLogged, session } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const { navigate, addListener, removeListener } = useNavigation();
  const card = {
    user: 'Lara Vieira de Menezes',
    type: 231,
    code: '59.20.00021735-2',
    active: true
  };
  useEffect(() => {
    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  useEffect(() => {
    if(!logged && !loading && !autoLogged)
      dispatch(userLogin({}))
    if(!logged && !loading && autoLogged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });
  }, [loading, logged]);

  function onPageFocus() {
    if(!logged && !loading && !autoLogged)
      dispatch(userLogin({}))
    if(!logged && !loading && autoLogged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });
  }

  function onOwners() {
    console.debug('Session:', session);
    Owners(session ?? '')
      .then(data => console.debug('Valid return:', data))
      .catch(console.warn)
  }

  function onLogout() {
    dispatch(userLogout());
    console.debug('onLogout', !logged, !loading, autoLogged);
  }

  return <PageContainer.Scroll>
    <Text.H3>Bilhete Único</Text.H3>
    <Line style={styles.smallSpace}/>
    <Card style={styles.mediumSpace} data={card} showLock/>
    <Text.H3 style={styles.largeSpace}>Last Recharges</Text.H3>
    <Line style={styles.smallSpace}/>
    <Button onPress={onOwners} style={styles.smallSpace}>Owners</Button>
    <Button onPress={onLogout} style={styles.smallSpace}>Logout</Button>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  largeSpace: {
    marginTop: 32
  },
  mediumSpace: {
    marginTop: 24
  },
  smallSpace: {
    marginTop: 8
  },
  small: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Main;