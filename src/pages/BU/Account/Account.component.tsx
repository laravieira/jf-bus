import PageContainer from '../../../components/PageContainer';
import Text from '../../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_LOGIN } from '../../../constants';
import Line from '../../../components/Line';
import { StyleSheet } from 'react-native';

function Account() {
  const { logged } = useAppSelector(state => state.user);
  const { navigate } = useNavigation();

  useEffect(() => {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });
  }, [logged]);

  return <PageContainer.Scroll>
    <Text.H3>Account</Text.H3>
    <Line style={styles.smallSpace}/>
  </PageContainer.Scroll>;
}

const styles = StyleSheet.create({
  smallSpace: {
    marginTop: 8
  }
});

export default Account;