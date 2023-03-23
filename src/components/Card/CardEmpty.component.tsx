import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CircleButton from '../CircleButton';
import { PlusIcon } from 'react-native-heroicons/outline';

type CardEmptyProps = {
  onPress: () => void
};

function CardEmpty(props: CardEmptyProps) {
  const { onPress } = props;

  return <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.buttonWrapper}>
      <CircleButton style={styles.button} size={48}>
        { PlusIcon }
      </CircleButton>
    </View>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1.916,
    backgroundColor: '#C3AFC0',
    borderRadius: 15,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOpacity: .25,
    elevation: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    width: 72,
    height: 72
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'rgba(255 255 255 / .3)'
  }
});

export default CardEmpty;