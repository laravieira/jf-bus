import PageContainer from '../../components/PageContainer';
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useAppSelector from '../../hooks/useAppSelector.hook';
import { ROUTE_LOGIN } from '../../constants';

function Recharge() {
  const { logged } = useAppSelector(state => state.user);
  const { navigate, addListener, removeListener } = useNavigation();

  useEffect(() => {
    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  function onPageFocus() {
    if(!logged)
      // @ts-ignore
      navigate({ name: ROUTE_LOGIN });
  }

  return <PageContainer>
    <Text>Recharge Page</Text>
  </PageContainer>;
}

export default Recharge;