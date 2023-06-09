import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { INPUT_HEIGHT } from './InputField.config';
import InputFieldMoney from './InputFieldMoney.component';

type InputFieldProps = {
  onType: (value: string) => void,
  onClear?: () => void,
  value: string
} & TextInputProps;

function InputField(props: InputFieldProps) {
  const { value, onType, onClear, style, placeholder } = props;

  function renderTextInput() {
    return <TextInput
      placeholder={placeholder}
      placeholderTextColor="rgba(255 255 255 / .8)"
      onChangeText={onType}
      { ...props }
      style={styles.input}
    />;
  }

  return <View style={[styles.bar, style]}>
    { renderTextInput() }
    <XMarkIcon
      size={32}
      color="rgba(255 255 255 / .6)"
      style={ value.length ? styles.clear : { display: 'none' }}
      onPress={() => onClear ? onClear() : onType('')}/>
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

InputField.Money = InputFieldMoney;

export default InputField;