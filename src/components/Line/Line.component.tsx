import { StyleSheet, View, ViewProps } from 'react-native';

function Line(props: ViewProps) {
  return <View style={[styles.separator, props.style]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF'
  }
});

export default Line;