import { StyleSheet, Text, TextProps } from 'react-native';

function Header4(props: TextProps) {
  const { children, style } = props;

  return <Text style={[styles.header4, style]}>
    { children }
  </Text>;
}

const styles = StyleSheet.create({
  header4: {
    fontFamily: 'Inter_500Medium',
    fontSize: 24,
    color: '#FFF'
  }
});

export default Header4;