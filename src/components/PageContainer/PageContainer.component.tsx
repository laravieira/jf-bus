import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';

function PageContainer(props: PropsWithChildren) {
  return <View style={styles.container}>
    <StatusBar style="auto" />
    <LinearGradient
      colors={['#BF849A', '#6FA0BF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    />
    { props.children }
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});

export default PageContainer;