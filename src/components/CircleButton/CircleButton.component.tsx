import { ColorValue, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { IconProps } from '../Navbar/NavbarIcon.component';

type ButtonProps = {
  onPress?: () => void
  children: (props: IconProps) => JSX.Element,
  style?: ViewStyle,
  size?: number,
  color?: ColorValue
};

function CircleButton(props: ButtonProps) {
  const { onPress, children: Icon, style, size, color } = props;

  return <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Icon size={ size ?? 32 } color={ color ?? '#6FA0BF' }/>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#A9C6D9',
    borderRadius: 28,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 1,
    shadowColor: '#000',
    shadowOpacity: .25,
    elevation: 5
  }
});

export default CircleButton;