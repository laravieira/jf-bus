import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import BilheteUnico from '../../../assets/bilhete-unico-logo.png';
import Text from '../Text';
import CircleButton from '../CircleButton';
import { BanknotesIcon, LockClosedIcon, LockOpenIcon } from 'react-native-heroicons/outline';
import CardEmpty from './CardEmpty.component';
import { IconProps } from '../Navbar/NavbarIcon.component';

type CardData = {
  user: string,
  type: number,
  code: string,
  active: boolean
};

type CardProps = {
  data: CardData,
  showLock?: boolean,
  style: ViewStyle
};

function Card(props: CardProps) {
  const {
    data: {
      user,
      code,
      active
    },
    showLock,
    style
  } = props;

  function renderButton(icon: (props: IconProps) => JSX.Element) {
    return <CircleButton>{ icon }</CircleButton>;
  }

  function renderButtons() {
    return <View style={styles.buttons}>
      { showLock ? renderButton(active ? LockClosedIcon : LockOpenIcon) : null }
      { renderButton(BanknotesIcon) }
    </View>;
  }

  return <View style={[styles.card, style]}>
    <Image source={BilheteUnico} style={styles.image}/>
    <Text.H6>{ user }</Text.H6>
    <Text.H6>{ code }</Text.H6>
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
  buttons: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    gap: 16
  }
});

Card.Empty = CardEmpty;

export default Card;