import PageContainer from '../../components/PageContainer';
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useAppSelector from '../../hooks/useAppSelector.hook';
import { ROUTE_LOGIN } from '../../constants';
import { userLogin } from '../../slices/user.slice';
import useAppDispatch from '../../hooks/useAppDispatch.hook';

function Recharge() {
  const { logged, loading, autoLogged } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const { navigate, addListener, removeListener } = useNavigation();

  useEffect(() => {
    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  useEffect(() => {
    if(!loading && !logged && autoLogged)
      // @ts-ignore
      navigate({ name: ROUTE_LOGIN });
  }, [logged, loading]);

  function onPageFocus() {
    if(!loading && !logged && !autoLogged)
      dispatch(userLogin({}))
  }

  return <PageContainer>
    <Text>Recharge Page</Text>
  </PageContainer>;
}

export default Recharge;