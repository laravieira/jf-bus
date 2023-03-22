import { StyleSheet, TouchableOpacity } from 'react-native';
import { IconProps } from '../Navbar/NavbarIcon.component';

type ButtonProps = {
  onPress?: () => void
  children: (props: IconProps) => JSX.Element
};

function IconButton(props: ButtonProps) {
  const { onPress, children: Icon } = props;

  return <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon size={32} color="#6FA0BF"/>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 28,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#A9C6D9',
    borderRadius: 28
  }
});

export default IconButton;