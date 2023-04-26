import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { IconProps } from '../Navbar/NavbarIcon.component';
import { PropsWithChildren } from 'react';
import Text from '../Text';

type MenuButtonProps = {
  icon: (props: IconProps) => JSX.Element,
  onPress: () => void,
  disabled?: boolean,
  style?: ViewStyle
} & PropsWithChildren;

function MenuButton(props: MenuButtonProps) {
  const { icon: Icon, onPress, children, disabled, style } = props;

  return <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
    <Icon size={32} color="#FFF"/>
    <Text style={[styles.text, style]}>{ children }</Text>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  text: {
    fontSize: 14
  }
});

export default MenuButton;