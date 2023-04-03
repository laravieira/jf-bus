import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import BilheteUnico from '../../../assets/bilhete-unico-logo.png';
import Text from '../Text';
import CircleButton from '../CircleButton';
import { BanknotesIcon, HomeIcon, ListBulletIcon, LockClosedIcon, LockOpenIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolidIcon } from 'react-native-heroicons/solid';
import CardEmpty from './CardEmpty.component';
import { IconProps } from '../Navbar/NavbarIcon.component';
import useAppSelector from '../../hooks/useAppSelector.hook';
import useAppDispatch from '../../hooks/useAppDispatch.hook';
import { setQuickCard } from '../../slices/quickCard.slice';
import { Owner } from '../../handlers/Owners.handler';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_BU_CARD } from '../../constants';

type CardProps = {
  owner: Owner,
  showLock?: boolean,
  showHome?: boolean,
  showRecharge?: boolean,
  showDetails?: boolean,
  style?: ViewStyle
};

function Card(props: CardProps) {
  const {
    owner,
    showLock,
    showHome,
    showRecharge,
    showDetails,
    style
  } = props;
  const { card } = useAppSelector(state => state.quickCard);
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  function onPressHome() {
    dispatch(setQuickCard(owner))
  }

  function onPressLock() {

  }

  function onPressRecharge() {

  }

  function onPressDetails() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_CARD, params: { owner }});
  }

  function renderButton(icon: (props: IconProps) => JSX.Element, onPress: () => void) {
    return <CircleButton onPress={onPress}>{ icon }</CircleButton>;
  }

  function renderButtons() {
    return <View style={styles.buttons}>
      { showHome ? renderButton(card?.card.number === owner.card.number ? HomeSolidIcon : HomeIcon, onPressHome) : null }
      { showLock ? renderButton(owner.card.status === 'Ativo' ? LockOpenIcon : LockClosedIcon, onPressLock) : null }
      { showRecharge ? renderButton(BanknotesIcon, onPressRecharge) : null }
      { showDetails ? renderButton(ListBulletIcon, onPressDetails) : null }
    </View>;
  }

  return <View style={[styles.card, style]}>
    <Image source={BilheteUnico} style={styles.image}/>
    <View style={styles.details}>
      <Text>{ owner.name }</Text>
      <Text>{ owner.card.number }</Text>
    </View>
    { renderButtons() }
  </View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1.916,
    backgroundColor: '#6FA0BF',
    borderRadius: 15,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOpacity: .25,
    elevation: 5,
    paddingVertical: 21,
    paddingLeft: 23
  },
  image: {
    width: '67.2%',
    borderWidth: 1
  },
  details: {
    position: 'absolute',
    bottom: 21,
    left: 23
  },
  buttons: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    gap: 16
  }
});

Card.Empty = CardEmpty;

export default Card;