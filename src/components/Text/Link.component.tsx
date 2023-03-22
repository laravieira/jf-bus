import { Linking, StyleSheet, Text as TextComponent, TextProps } from 'react-native';
import React from 'react';

type LinkProps = {
  url: string
} & TextProps

function Link(props: LinkProps) {
  const { children, style, url } = props;

  function onLinkPress() {
    Linking.openURL(url).catch();
  }

  return <TextComponent style={[styles.link, style]} onPress={onLinkPress}>
    { children }
  </TextComponent>;
}

const styles = StyleSheet.create({
  link: {
    fontFamily: 'Inter_300Light',
    fontSize: 16,
    color: '#FFF',
    textDecorationLine: 'underline'
  }
});

export default Link;