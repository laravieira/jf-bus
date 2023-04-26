import { StyleSheet, Text, TextProps } from 'react-native';

function Header6(props: TextProps) {
  const { children, style } = props;

  return <Text style={[styles.header6, style]}>
    { children }
  </Text>;
}

const styles = StyleSheet.create({
  header6: {
    fontFamily: 'Inter_300Light',
    fontSize: 20,
    color: '#FFF'
  }
});

export default Header6;