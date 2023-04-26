import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import CircleButton from '../CircleButton';
import { PlusIcon } from 'react-native-heroicons/outline';
import { ROUTE_BU_CARDS, ROUTE_BU_LOGIN } from '../../constants';
import useAppSelector from '../../hooks/useAppSelector.hook';
import { useNavigation } from '@react-navigation/native';

type CardEmptyProps = {
  style?: ViewStyle
};

function CardEmpty(props: CardEmptyProps) {
  const { logged } = useAppSelector(state => state.login)
  const { navigate } = useNavigation();
  const { style } = props;

  function onEmptyQuickCard() {
    if(logged)
      // @ts-ignore
      navigate({name: ROUTE_BU_CARDS});
    else
      // @ts-ignore
      navigate({name: ROUTE_BU_LOGIN});
  }

  return <TouchableOpacity style={[styles.card, style]} onPress={onEmptyQuickCard}>
    <View style={styles.buttonWrapper}>
      <CircleButton style={styles.button} size={48} onPress={onEmptyQuickCard}>
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