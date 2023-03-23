import useAppSelector from './useAppSelector.hook';
import User from '../handlers/User.handler';

function useUser() {
  const state = useAppSelector(state => state.user);

  return {
    login: (user?: string, password?: string, keep?: boolean): void =>
      state.logged ? undefined : User.login(user, password, keep),
    logout: (): void => state.logged ? User.logout() : undefined,
    ...state
  };
}

export default useUser;