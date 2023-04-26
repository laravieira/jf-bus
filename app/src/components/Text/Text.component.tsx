import { StyleSheet, Text as TextComponent, TextProps } from 'react-native';
import TextBold from './TextBold.component';
import Header1 from './Header1.component';
import Header2 from './Header2.component';
import Header3 from './Header3.component';
import Header6 from './Header6.component';
import Header4 from './Header4.component';
import Header5 from './Header5.component';
import Link from './Link.component';

function Text(props: TextProps) {
  const { children, style } = props;

  return <TextComponent style={[styles.text, style]}>
    { children }
  </TextComponent>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter_300Light',
    fontSize: 16,
    color: '#FFF'
  }
});

Text.Bold = TextBold;
Text.H1 = Header1;
Text.H2 = Header2;
Text.H3 = Header3;
Text.H4 = Header4;
Text.H5 = Header5;
Text.H6 = Header6;
Text.Link = Link;

export default Text;