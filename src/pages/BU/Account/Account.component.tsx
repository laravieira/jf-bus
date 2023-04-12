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
import { StyleSheet, View } from 'react-native';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import CheckField from '../../../components/CheckField';
import { Address } from '../../../models/Address.model';

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

  function renderLine(key: string, value: string|number|undefined, link?: string) {
    return <View style={styles.line}>
      <Text.Bold>{ key }</Text.Bold>
      { link ? <Text.Link url={link}>{ value }</Text.Link> : <Text>{ value }</Text> }
    </View>;
  }

  function renderAddress(address: Address, key: number) {
    return <View key={key}>
      <Text.Bold style={styles.line}>Logradouro:</Text.Bold>
      <Text style={styles.line}>{ address.street }</Text>
      { renderLine('Number:', address.number) }
      { renderLine('Complement:', address.complement) }
      { renderLine('Neighborhood:', address.district) }
      { renderLine('City:', address.city) }
      { renderLine('State:', address.state?.name) }
      { renderLine('CEP:', address.cep) }
    </View>;
  }

  return <PageContainer.Scroll style={styles.page}>
    <Header style={styles.header} length={user?.id}>User Details</Header>
    { renderLine('Name:', user?.name) }
    { renderLine('CPF:', user?.cpf) }
    { renderLine('Email:', user?.email, `mailto:${user?.email}`) }
    { renderLine('Phone:', `(${user?.phone.ddd}) ${user?.phone.number}`, `tel:${user?.phone.ddd}${user?.phone.number}`) }
    { renderLine('Website:', user?.site, `${user?.site}`) }
    <View style={styles.checkbox}>
      <CheckField onPress={() => null} value={user?.newsletter ?? false}>
        Assign to Bilhete Único Newsletter
      </CheckField>
    </View>
    <Header style={styles.header} length={user?.address.length}>Addresses</Header>
    <View style={styles.addresses}>
      { user?.address.map(renderAddress) }
    </View>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  header: {
    paddingHorizontal: 0
  },
  line: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4
  },
  checkbox: {
    marginTop: 10,
    marginBottom: 48
  },
  addresses: {
    gap: 20
  }
});

export default Account;