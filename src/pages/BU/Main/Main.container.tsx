import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useAppSelector from '../../../hooks/useAppSelector.hook';
import { ROUTE_BU_ACCOUNT, ROUTE_BU_CARDS, ROUTE_BU_LOGIN, ROUTE_BU_RECHARGES } from '../../../constants';
import { userLogin, userLogout } from '../../../slices/user.slice';
import useAppDispatch from '../../../hooks/useAppDispatch.hook';
import MainComponent from './Main.component';
import { loadQuickCard } from '../../../slices/quickCard.slice';

function Main() {
  const { logged, loading, autoLogged } = useAppSelector(state => state.user);
  const { card } = useAppSelector(state => state.quickCard);
  const { navigate, addListener, removeListener } = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuickCard());

    addListener('focus', onPageFocus);

    return () => removeListener('focus', onPageFocus);
  }, []);

  useEffect(() => {
    if(!logged && !loading && !autoLogged)
      dispatch(userLogin({}))
    if(!logged && !loading && autoLogged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });
  }, [loading, logged]);

  function onPageFocus() {
    if(!logged && !loading && !autoLogged)
      dispatch(userLogin({}))
    if(!logged && !loading && autoLogged)
      // @ts-ignore
      navigate({ name: ROUTE_BU_LOGIN });
  }

  function onPageAccount() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_ACCOUNT })
  }

  function onPageRecharges() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_RECHARGES })
  }

  function onPageCards() {
    // @ts-ignore
    navigate({ name: ROUTE_BU_CARDS })
  }

  function onLogout() {
    dispatch(userLogout());
  }

  const mainComponentProps = {
    card,
    onPageAccount,
    onPageRecharges,
    onPageCards,
    onLogout
  };

  return <MainComponent { ...mainComponentProps }/>;
}

export default Main;