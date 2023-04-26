import { StyleSheet, Text, TextProps } from 'react-native';

function Header1(props: TextProps) {
  const { children, style } = props;

  return <Text style={[styles.header1, style]}>
    { children }
  </Text>;
}

const styles = StyleSheet.create({
  header1: {
    fontFamily: 'Inter_300Light',
    fontSize: 48,
    color: '#FFF'
  }
});

export default Header1;