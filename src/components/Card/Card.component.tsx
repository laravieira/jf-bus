import { Image, StyleSheet, View } from 'react-native';
import BilheteUnico from '../../../assets/bilhete-unico-logo.png';
import Text from '../Text';
import IconButton from '../IconButton';
import { BanknotesIcon } from 'react-native-heroicons/outline';

type CardData = {
  user: string,
  type: number,
  code: string
};

function Card() {
  const card: CardData = {
    user: 'Lara Vieira de Menezes',
    type: 231,
    code: '59.20.00021735-2'
  };

  return <View style={styles.card}>
    <Image source={BilheteUnico} style={styles.image}/>
    <Text.H6>{ card.user }</Text.H6>
    <Text.H6>{ card.code }</Text.H6>
    <IconButton>
      { BanknotesIcon }
    </IconButton>
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
  }
});

export default Card;