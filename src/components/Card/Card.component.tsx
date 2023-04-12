import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import BilheteUnico from '../../../assets/bilhete-unico-logo.png';
import ValeTransporte from '../../../assets/vale-transporte-logo.png';
import Text from '../Text';
import CircleButton from '../CircleButton';
import { BanknotesIcon, HomeIcon, ListBulletIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolidIcon } from 'react-native-heroicons/solid';
import CardEmpty from './CardEmpty.component';
import { IconProps } from '../Navbar/NavbarIcon.component';
import useAppSelector from '../../hooks/useAppSelector.hook';
import useAppDispatch from '../../hooks/useAppDispatch.hook';
import { setQuickCard } from '../../slices/quickCard.slice';
import { Card as CardModel, CardDesign, CardStatus } from '../../models/Card.model';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_BU_CARD, ROUTE_BU_RECHARGE } from '../../constants';

type CardProps = {
  card: CardModel,
  showHome?: boolean,
  showRecharge?: boolean,
  showDetails?: boolean,
  style?: ViewStyle
};

function Card(props: CardProps) {
  const {
    card,
    showHome,
    showRecharge,
    showDetails,
    style
  } = props;
  const { card: quickCard } = useAppSelector(state => state.quickCard);
  const { session } = useAppSelector(state => state.login);
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  function onPressHome() {
    dispatch(setQuickCard({
      session: session ?? '',
      owner: card.owner,
      card: card.number
    }))
  }

  function onPressRecharge() {
    // @ts-ignore
    navigate(ROUTE_BU_RECHARGE, { card });
  }

  function onPressDetails() {
    // @ts-ignore
    navigate(ROUTE_BU_CARD, { owner: card.owner });
  }

  function renderButton(icon: (props: IconProps) => JSX.Element, onPress: () => void) {
    return <CircleButton onPress={onPress}>{ icon }</CircleButton>;
  }

  function renderButtons() {
    const status = card.status ?? CardStatus.ACTIVE;

    return <View style={styles.buttons}>
      { showHome ? renderButton(quickCard?.number === card.number ? HomeSolidIcon : HomeIcon, onPressHome) : null }
      { showRecharge ? renderButton(status === CardStatus.ACTIVE ? BanknotesIcon : LockClosedIcon, onPressRecharge) : null }
      { showDetails ? renderButton(ListBulletIcon, onPressDetails) : null }
    </View>;
  }

  function renderLogo() {
    if(card.design !== CardDesign.BILLHETE_UNICO)
      return <Image source={ ValeTransporte } style={ styles.imageVT }/>;
    return <Image source={ BilheteUnico } style={ styles.imageBU }/>;
  }

  return <View style={[styles.card, style]}>
    { renderLogo() }
    <View style={styles.details}>
      <Text>{ card.name }</Text>
      <Text>{ card.number }</Text>
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
    paddingBottom: 21,
    overflow: 'hidden'
  },
  imageBU: {
    width: '67.2%',
    borderWidth: 1,
    marginTop: 21,
    marginLeft: 23
  },
  imageVT: {
    position: 'absolute',
    borderWidth: 1,
    width: '60%',
    height: '90%'
  },
  details: {
    position: 'absolute',
    bottom: 21,
    left: 23
  },
  buttons: {
    position: 'absolute',
    bottom: 16,
    right: 24,
    gap: 10
  }
});

Card.Empty = CardEmpty;

export default Card;