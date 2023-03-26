import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import Line from '../../../components/Line';
import { StyleSheet, View } from 'react-native';
import Card from '../../../components/Card';
import Menu from '../../../components/Menu';
import { PAGE_HORIZONTAL_PADDING } from '../../../components/PageContainer/PageContainer.config';
import { ArrowUturnRightIcon, CreditCardIcon, NewspaperIcon, UserIcon } from 'react-native-heroicons/outline';

type MainComponentProps = {
  card: any //TODO Add proper type to this card,
  onPageAccount: () => void,
  onPageRecharges: () => void,
  onPageCards: () => void,
  onLogout: () => void
};

function MainComponent(props: MainComponentProps) {
  const {
    card,
    onPageAccount,
    onPageRecharges,
    onPageCards,
    onLogout
  } = props;

  function renderMenu() {
    return <Menu>
      <Menu.Button icon={UserIcon} onPress={onPageAccount}>Account</Menu.Button>
      <Menu.Button icon={NewspaperIcon} onPress={onPageRecharges}>Recharges</Menu.Button>
      <Menu.Button icon={CreditCardIcon} onPress={onPageCards}>Cards</Menu.Button>
      <Menu.Button icon={ArrowUturnRightIcon} onPress={onLogout}>Logout</Menu.Button>
    </Menu>;
  }

  return <PageContainer.Scroll style={styles.container}>
    { renderMenu() }
    <View style={styles.content}>
      <Card style={styles.mediumSpace} data={card} showLock/>
      <Text.H3 style={styles.largeSpace}>Last Recharges</Text.H3>
      <Line style={styles.smallSpace}/>
      {/* TODO Implement last rechages on the BU Main page */}
    </View>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
  content: {
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  largeSpace: {
    marginTop: 32
  },
  mediumSpace: {
    marginTop: 24,
  },
  smallSpace: {
    marginTop: 8
  },
  small: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default MainComponent;