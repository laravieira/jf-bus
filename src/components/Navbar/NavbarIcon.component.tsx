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

  return <Icon color="#FFF" size={ hasFocus ? 42 : 32 } style={ hasFocus ? styles.active : {}} />;
}

const styles = StyleSheet.create({
  active: {
    transform: [{
      translateY: -3
    }]
  }
});

export default NavbarIcon;