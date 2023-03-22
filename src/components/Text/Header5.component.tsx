import { StyleSheet, Text, TextProps } from 'react-native';

function Header5(props: TextProps) {
  const { children, style } = props;

  return <Text style={[styles.header5, style]}>
    { children }
  </Text>;
}

const styles = StyleSheet.create({
  header5: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: '#FFF'
  }
});

export default Header5;