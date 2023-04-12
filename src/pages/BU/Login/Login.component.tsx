import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import InputField from '../../../components/InputField';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CheckField from '../../../components/CheckField';
import { BU_HOST, BU_PATH_PASSWORD, ROUTE_BU_LOGIN, ROUTE_BU_MAIN } from '../../../constants';
import Button from '../../../components/Button';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { login, setLogin } from '../../../slices/login.slice';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
import { useSession } from '../../../hooks/useSession.hook';

function Login() {
  const state = useAppSelector(state => state.login);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const session = useSession(
    state,
    useAppDispatch(),
    setLogin,
    { ...navigation, navigate },
    onSessionOrFocus
  );

  const [logging, setLogging] = useState<boolean>(false);
  const [document, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keep, setKeep] = useState<boolean>(true);

  function onSessionOrFocus() {
    const { logged, loading, autoLogged } = state;

    if(!logging && !loading && !autoLogged)
      session()
        .then(() => navigate(ROUTE_BU_MAIN))
        .catch(() => null)

    if(logging && !loading) {
      setLogging(false);
      if(logged)
        return navigate(ROUTE_BU_MAIN);
      return alert('Wrong CPF or password.');
    }
  }

  /** Blocks useSession from recalling login route (we already here) */
  function navigate(route: string) {
    if(route === ROUTE_BU_LOGIN)
      return;
    // @ts-ignore
    navigation.navigate(route);
  }

  function onLogin() {
    setLogging(true);
    dispatch(login({user: document, password, keep}));
  }
  
  return <PageContainer>
    <Header style={styles.header}>Bilhete Único</Header>

    <Text.H5 style={styles.largeSpace}>CPF</Text.H5>
    <InputField style={styles.smallSpace} onType={setUser} value={document} placeholder="123.456.789-01"/>
    <Text.H5 style={styles.largeSpace}>Password</Text.H5>
    <InputField style={styles.smallSpace} onType={setPassword} value={password} placeholder="********" secureTextEntry={true} />
    <View style={[styles.small, styles.largeSpace]}>
      <CheckField onPress={setKeep} value={keep}>Keep my login</CheckField>
      <Text.Link url={`${BU_HOST}${BU_PATH_PASSWORD}`}>forgot my password</Text.Link>
    </View>
    <Button style={styles.button} onPress={onLogin}>Login</Button>
  </PageContainer>;
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 0
  },
  largeSpace: {
    marginTop: 32
  },
  smallSpace: {
    marginTop: 8
  },
  small: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 48
  }
});

export default Login;