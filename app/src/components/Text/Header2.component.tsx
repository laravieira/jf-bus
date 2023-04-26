import { StyleSheet, Text, TextProps } from 'react-native';

function Header2(props: TextProps) {
  const { children, style } = props;

  return <Text style={[styles.header2, style]}>
    { children }
  </Text>;
}

const styles = StyleSheet.create({
  header2: {
    fontFamily: 'Inter_300Light',
    fontSize: 36,
    color: '#FFF'
  }
});

export default Header2;