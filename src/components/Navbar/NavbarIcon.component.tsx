import { StyleSheet } from 'react-native';
import { NumberProp, SvgProps } from 'react-native-svg';

export type IconProps = SvgProps & {
  size?: NumberProp;
}

type NavbarIconProps = {
  icon: (props: IconProps) => JSX.Element,
  hasFocus: boolean
}

function NavbarIcon(props: NavbarIconProps) {
  const { icon: Icon, hasFocus } = props;

  return <Icon color="#FFF" size={ hasFocus ? 42 : 32 } style={ hasFocus ? styles.active : styles.normal } />;
}

const styles = StyleSheet.create({
  // Switching styles dinamicaly onPress causes the app to try to read
  // style properies even if these are none. As transform is an array
  // it tryes to read the array, and that returns an error. That's why
  // this empty array needs to stay here, so its array can de read.
  normal: {
    transform: []
  },
  active: {
    transform: [{
      translateY: -3
    }]
  }
});

export default NavbarIcon;