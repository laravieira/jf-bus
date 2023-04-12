import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from 'react-native';
import Text from '../Text';
import Line from '../Line';
import { IconProps } from '../Navbar/NavbarIcon.component';
import { PAGE_HORIZONTAL_PADDING } from '../PageContainer/PageContainer.config';

type HeaderProps = {
  length?: number,
  total?: number,
  button?: (props: IconProps) => JSX.Element
} & ViewProps & TouchableOpacityProps;

function Header(props: HeaderProps) {
  const { children, length, total } = props;

  function renderButton() {
    const { button: Icon } = props;

    if(!Icon)
      return;

    return <TouchableOpacity { ...props } style={styles.button}>
      <Icon size={32} color="#FFF"/>
    </TouchableOpacity>;
  }

  return <View style={[styles.header, props.style]}>
    <View style={styles.title}>
      <Text.H3>{ children }</Text.H3>
      <View style={styles.right}>
        { length && total ? <Text>{ `${length}/${total}` }</Text> : null }
        { length && !total ? <Text>{ `${length}` }</Text> : null }
        { renderButton() }
      </View>
    </View>
    <Line style={styles.separator}/>
  </View>;
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: PAGE_HORIZONTAL_PADDING
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
    gap: 16
  },
  button: {
    marginBottom: 4,
    paddingHorizontal: 8
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF'
  }
});

export default Header;