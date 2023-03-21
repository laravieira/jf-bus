import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

type ButtonProps = {
  hasFocus: boolean,
  label: string | undefined,
  id: string | undefined,
  icon: ((props: {focused: boolean, color: string, size: number}) => React.ReactNode) | undefined,
  onButtonPress: () => void
};

function NavbarButton(props: ButtonProps) {
  const {hasFocus, label, id, icon, onButtonPress} = props;

  return <TouchableOpacity
    accessibilityRole="button"
    accessibilityState={ hasFocus ? { selected: true } : {} }
    accessibilityLabel={ label }
    testID={ id }
    onPress={ onButtonPress }
    style={styles.bottom}
  >
    { icon ? icon({ focused: hasFocus, color: '', size: 0 }) : null }
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  bottom: {
    width: '20%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NavbarButton;