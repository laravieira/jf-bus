import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from 'react';
import { CheckIcon } from 'react-native-heroicons/outline';
import Text from '../Text';

type CheckFieldProps = {
  onPress: (value: boolean) => void,
  value: boolean,
  style?: ViewStyle
} & PropsWithChildren;

function CheckField(props: CheckFieldProps) {
  const { value, onPress, style, children } = props;

  function renderCheckIcon() {
    return <CheckIcon size={20} color="#FFF"/>;
  }

  function renderCheckbox() {
    return <View style={styles.box}>
      { value && renderCheckIcon() }
    </View>;
  }

  return <TouchableWithoutFeedback style={style} onPress={() => onPress(!value)}>
    <View style={styles.field}>
      { renderCheckbox() }
      <Text>{ children }</Text>
    </View>
  </TouchableWithoutFeedback>;
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row'
  },
  box: {
    height: 23,
    width: 23,
    // backgroundColor: 'rgba(217, 217, 217, 0.3)',
    backgroundColor: '#BFA2B2',
    borderRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOpacity: .25,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9
  },
});

export default CheckField;