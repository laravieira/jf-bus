import PageContainer from '../../../components/PageContainer';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_CARD } from '../../../constants';
import Owner from '../../../handlers/Owner.handler';
import { Owner as OwnerModel, OwnerStatus } from '../../../models/Owner.model';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootParamsList } from '../../../navigation/Navigation.config';
import Header from '../../../components/Header';
import { useSession } from '../../../hooks/useSession.hook';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import { setLogin } from '../../../slices/login.slice';
import Text from '../../../components/Text';
import { StyleSheet, View } from 'react-native';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import { CardDesign, CardStatus } from '../../../models/Card.model';

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

  function renderCardStatus(status?: CardStatus) {
    let name;

    switch(status) {
      case CardStatus.WAITING: name = 'Waiting'; break;
      case CardStatus.ACTIVE: name = 'Active'; break;
      case CardStatus.RESTRICTED: name = 'restricted'; break;
      default: name = 'Unknow';
    }

    return renderLine('Status:', name);
  }

  function renderCardDesign(design?: CardDesign) {
    let name;

    switch(design) {
      case CardDesign.TRANSPORT_TICKET: name = `Transport Ticket (04)`; break;
      case CardDesign.COMMON: name = `Common (09)`; break;
      case CardDesign.BILLHETE_UNICO: name = `Unique Ticket (20)`; break;
      default: name = 'Unknow';
    }

    return renderLine('Design:', name);
  }

  function renderOwnerStatus(status?: OwnerStatus) {
    let name;

    switch(status) {
      case OwnerStatus.ACTIVE: name = `Active`; break;
      case OwnerStatus.INACTIVE: name = `Inactive`; break;
      case OwnerStatus.FIRED: name = `Fired`; break;
      default: name = 'Unknow';
    }

    return renderLine('Status:', name);
  }

  function renderLine(key: string, value: string|number|undefined, link?: string) {
    return <View style={styles.line}>
      <Text.Bold>{ key }</Text.Bold>
      { link ? <Text.Link url={link}>{ value }</Text.Link> : <Text>{ value }</Text> }
    </View>;
  }

  return <PageContainer.Scroll style={styles.page}>
    {/* Card data */}
    <Header style={styles.header} length={owner?.card.number}>Card</Header>
    { renderCardStatus(owner?.card.status) }
    { renderCardDesign(owner?.card.design) }

    {/* Owner company data */}
    <Header style={[styles.header, styles.space]} length={owner?.id}>Owner</Header>
    { renderOwnerStatus(owner?.status) }
    { renderLine('Company ID:', owner?.class) }
    { renderLine('Group:', owner?.group) }
    { renderLine('Daily Bus Spend:', `R$: ${ owner?.daily?.toFixed(2) ?? '0.00' }`) }

    {/* Owner documents */}
    <View style={styles.paragraph}>
      { renderLine('Name:', owner?.name) }
      { renderLine('Birthday:', `${owner?.birthday?.getDay()}/${1+(owner?.birthday?.getMonth() ?? 0)}/${owner?.birthday?.getFullYear()}`) }
      { renderLine('CPF:', owner?.cpf) }
      { renderLine('RG:', owner?.rg) }
    </View>

    {/* Owner address */}
    <View style={styles.paragraph}>
      <Text.Bold style={styles.line}>Logradouro:</Text.Bold>
      <Text style={styles.line}>{ owner?.address?.street }</Text>
      { renderLine('Number:', owner?.address?.number) }
      { renderLine('Complement:', owner?.address?.complement) }
      { renderLine('Neighborhood:', owner?.address?.district) }
      { renderLine('City:', owner?.address?.city) }
      { renderLine('State:', owner?.address?.state?.name) }
      { renderLine('CEP:', owner?.address?.cep) }
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
  space: {
    marginTop: 32
  },
  paragraph: {
    marginTop: 24
  },
  checkbox: {
    marginTop: 10,
    marginBottom: 48
  },
  addresses: {
    gap: 20
  }
});

export default Card;