import { StyleSheet, Text as TextComponent, TextProps } from 'react-native';

function TextBold(props: TextProps) {
  const { children, style } = props;

  return <TextComponent style={[styles.bold, style]}>
    { children }
  </TextComponent>;
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#FFF'
  }
});

export default TextBold;