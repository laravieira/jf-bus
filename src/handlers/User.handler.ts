import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import CookieManager, { Cookies } from '@react-native-cookies/cookies';
import {
  BU_COOKIE_LOGGED,
  BU_COOKIE_SESSION,
  BU_HOST,
  BU_PATH_LOGIN,
  BU_PATH_LOGOUT,
  BU_STORE_PASSWORD,
  BU_STORE_USER
} from '../constants';
import axios from 'axios';

export type Login = {
  user: string,
  password: string,
  keep?: boolean
}

export type UserType = {
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

function loginUser(user: string, password: string, keep?: boolean): Promise<UserType> {
  const query = new URLSearchParams({
    doc: user,
    pass: password
  });

  return axios.get(`${BU_HOST}${BU_PATH_LOGIN}?${query}`, { withCredentials: true })
    .then(response => {
      if(response.status > 299)
        return Promise.reject();
      return response.config.url ?? '';
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
      } as UserType;
    });
}

function logoutUser(): Promise<void> {
  return CookieManager.clearAll()
    .then(unsaveUser)
    .then(() => axios.get(`${BU_HOST}${BU_PATH_LOGOUT}`))
}

function login(user?: string, password?: string, keep?: boolean): Promise<UserType> {
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
      } as UserType));
}

const User = {
  logout: logoutUser,
  login
};

export default User;
