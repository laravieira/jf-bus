import { LoginState } from '../models/LoginState.model';
import { BU_COOKIE_TIMEOUT, ROUTE_BU_LOGIN } from '../constants';
import Login from '../handlers/Login.handler';
import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';

export function useSession(
  state: LoginState,
  dispatch: (action: PayloadAction<LoginState, "login/setLogin">) => void,
  set: ActionCreatorWithPayload<LoginState, "login/setLogin">,
  navigation: {
    navigate: (route: string) => void,
    removeListener(event: string, callback: () => void): void,
    addListener(event: string, callback: () => void): () => void
  },
  onSessionOrFocus?: () => void
): () => Promise<string> {
  useEffect(() => {
    const { addListener, removeListener } = navigation;

    if(onSessionOrFocus)
      addListener('focus', onSessionOrFocus);

    return onSessionOrFocus
      ? () => removeListener('focus', onSessionOrFocus)
      : undefined;
  }, []);

  useEffect(
    onSessionOrFocus ?? (() => undefined),
    [state.loading, state.logged]
  );

  function session(): Promise<string> {
    const { logged, loading, autoLogged, since, session } = state;
    const { navigate } = navigation;

    // If loading
    if(loading)
      return Promise.reject('Loading session.');

    // If logged and not expired
    if(logged && Date.now() - since < BU_COOKIE_TIMEOUT)
      return Promise.resolve(session ?? '');

    // If logged but expired
    if(logged)
      return Login.login()
        .then(login => {
          dispatch(set(login));
          if(login.session)
            return login.session;
          navigate(ROUTE_BU_LOGIN);
          return Promise.reject('Session expired.');
        });

    // If autologged failed or is disebled
    if(autoLogged) {
      navigate(ROUTE_BU_LOGIN);
      return Promise.reject('Not logged.');
    }

    // If not logged but can try
    return Login.login()
      .then(login => {
        dispatch(set(login));
        if(login.session)
          return login.session;
        navigate(ROUTE_BU_LOGIN);
        return Promise.reject('Unable to login.');
      });
  }

  return session;
}