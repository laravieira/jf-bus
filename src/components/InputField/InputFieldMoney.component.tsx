import { StyleSheet, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { INPUT_HEIGHT } from './InputField.config';
import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';

type InputFieldMoneyProps = {
  onType: (value: number|null) => void,
  onClear?: () => void,
} & CurrencyInputProps;

function InputFieldMoney(props: InputFieldMoneyProps) {
  const {
    value,
    onType,
    onClear,
    style,
  } = props;

  function renderMoneyInput() {
    return <CurrencyInput
      prefix="R$: "
      delimiter=""
      separator="."
      precision={2}
      minValue={0}
      placeholderTextColor="rgba(255 255 255 / .8)"
      { ...props }
      onChangeValue={onType}
      style={styles.input}/>;
  }

  return <View style={[styles.bar, style]}>
    { renderMoneyInput() }
    <XMarkIcon
      size={32}
      color="rgba(255 255 255 / .6)"
      style={ value ? styles.clear : { display: 'none' }}
      onPress={() => onClear ? onClear() : onType(null)}/>
  </View>;
}

const styles = StyleSheet.create({
  bar: {
    height: INPUT_HEIGHT,
    width: '100%',
    // backgroundColor: 'rgba(217, 217, 217, 0.3)',
    backgroundColor: '#BFA2B2',
    borderRadius: 24,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOpacity: .25,
    elevation: 5
  },
  input: {
    width: '100%',
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16+32,
    fontFamily: 'Inter_300Light',
    fontSize: 18,
    color: '#FFF',
  },
  clear: {
    position: 'absolute',
    right: 12,
    top: (INPUT_HEIGHT-32)/2
  }
});

export default InputFieldMoney;