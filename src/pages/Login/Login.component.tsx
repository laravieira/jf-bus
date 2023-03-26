import PageContainer from '../../components/PageContainer';
import Text from '../../components/Text';
import Line from '../../components/Line';
import InputField from '../../components/InputField';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CheckField from '../../components/CheckField';
import { BU_HOST, BU_PATH_PASSWORD, ROUTE_RECHARGE } from '../../constants';
import Button from '../../components/Button';
import useAppSelector from '../../hooks/useAppSelector.hook';
import useAppDispatch from '../../hooks/useAppDispatch.hook';
import { userLogin } from '../../slices/user.slice';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const { logged, loading, autoLogged } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const { navigate, addListener, removeListener } = useNavigation();

  const [document, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keep, setKeep] = useState<boolean>(true);

  useEffect(() => {
    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  useEffect(() => {
    if(logged && !loading)
      // @ts-ignore
      navigate({ name: ROUTE_RECHARGE });
    if(!logged && !loading && !autoLogged)
      alert('Did u type something wrong?');
  }, [logged, loading]);

  function onPageFocus() {
    if(!logged && !loading && document.length)
      dispatch(userLogin({}))
  }

  function onLogin() {
    dispatch(userLogin({user: document, password, keep}));
  }
  
  return <PageContainer>
    <Text.H3>Bilhete Único</Text.H3>
    <Line style={styles.smallSpace}/>

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