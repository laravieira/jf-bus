import PageContainer from '../../components/PageContainer';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';

function Schedules() {
  const data = [1,2,3,4,5,6,7,8,9];

  function renderItem(data: any) {
    return <View style={styles.item}>
      <Text.H2>{ data.item }</Text.H2>
    </View>;
  }

  return <PageContainer.List data={data} renderItem={renderItem}/>;
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 32,
    borderBottomWidth: 1,
  }
});

export default Schedules;