import { StyleSheet, Text, TextProps } from 'react-native';

function Header3(props: TextProps) {
  const { children, style } = props;

  return <Text style={[styles.header3, style]}>
    { children }
  </Text>;
}

const styles = StyleSheet.create({
  header3: {
    fontFamily: 'Inter_300Light',
    fontSize: 32,
    color: '#FFF'
  }
});

export default Header3;