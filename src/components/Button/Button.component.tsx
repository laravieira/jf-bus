import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from '../Text';

function Button(props: TouchableOpacityProps) {
  const { children, style } = props;

  return <TouchableOpacity { ...props } style={[styles.button, style]}>
    <Text.H6>{ children }</Text.H6>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    // backgroundColor: 'rgba(217, 217, 217, 0.3)',
    backgroundColor: '#6FA0BF',
    borderRadius: 12,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOpacity: .25,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Button;