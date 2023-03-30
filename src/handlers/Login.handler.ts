import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import CookieManager, { Cookies } from '@react-native-cookies/cookies';
import {
  BU_COOKIE_LOGGED,
  BU_COOKIE_SESSION,
  BU_PATH_LOGIN,
  BU_PATH_LOGOUT,
  BU_STORE_PASSWORD,
  BU_STORE_USER
} from '../constants';
import useAxios from '../hooks/useAxios.hook';

export type Login = {
  user: string,
  password: string,
  keep?: boolean
}

export type LoginType = {
  logged: boolean,
  loading: boolean,
  session: string|null,
  user: string|null,
  autoLogged: boolean
};

function saveUser(user: string, password: string): void {
  Promise.all([
    setItemAsync(BU_STORE_USER, user),
    setItemAsync(BU_STORE_PASSWORD, password)
  ]).catch(console.warn);
}

function unsaveUser(): void {
  Promise.all([
    deleteItemAsync(BU_STORE_USER),
    deleteItemAsync(BU_STORE_PASSWORD)
  ]).catch(console.warn);
}

function restoreUser(): Promise<Login> {
  return Promise.all([
    getItemAsync(BU_STORE_USER),
    getItemAsync(BU_STORE_PASSWORD)
  ]).then(credentials => {
    if(credentials[0] && credentials[1])
      return {
        user: credentials[0],
        password: credentials[1]
      } as Login;
    return Promise.reject();
  });
}

function loginUser(user: string, password: string, keep?: boolean): Promise<LoginType> {
  const query = new URLSearchParams({
    doc: user,
    pass: password
  });

  return useAxios().get(`${BU_PATH_LOGIN}?${query}`)
    .then(response => {
      if(response.status > 299)
        return Promise.reject();
      return response.request.responseURL ?? '';
    })
    .then(CookieManager.get)
    .then((cookies: Cookies) => {
      const session: string|null = cookies[BU_COOKIE_SESSION].value ?? null;
      const logged: boolean = cookies[BU_COOKIE_LOGGED].value === user;

      if(logged && keep)
        saveUser(user, password);

      return {
        loading: false,
        session,
        logged,
        user,
        autoLogged: typeof keep === 'undefined'
      } as LoginType;
    });
}

function logoutUser(session: string): Promise<void> {
  return CookieManager.clearAll()
    .then(unsaveUser)
    .then(() => useAxios(session).get(`${BU_PATH_LOGOUT}`))
}

function login(user?: string, password?: string, keep?: boolean): Promise<LoginType> {
  if(user && password)
    return loginUser(user, password, keep);
  else
    return restoreUser()
      .then(({ user, password }) => loginUser(user, password, keep))
      .catch(() => ({
        loading: false,
        session: null,
        logged: false,
        user: null,
        autoLogged: typeof keep === 'undefined'
      } as LoginType));
}

const Login = {
  logout: logoutUser,
  login
};

export default Login;
