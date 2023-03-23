import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import {
  BU_COOKIE_LOGGED,
  BU_COOKIE_SESSION,
  BU_HOST,
  BU_PATH_LOGIN,
  BU_PATH_LOGOUT,
  BU_STORE_PASSWORD,
  BU_STORE_USER
} from '../constants';

export type Login = {
  user: string,
  password: string,
  keep?: boolean
}

export type UserType = {
  logged: boolean,
  loading: boolean,
  session: string|null,
  user: string|null
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


  return fetch(`${BU_HOST}${BU_PATH_LOGIN}?${query}`)
    .then(response => {
      if(!response.ok)
        return Promise.reject();

      // Set session and if user is logged in
      let session: string|null = null;
      let logged: boolean = false;
      response.headers.forEach((value:string, key:string) => {
        if(key.toLowerCase() !== 'set-cookie')
          return;
        const cookie = value.split(';')[0].split('=');
        if(cookie[0] === BU_COOKIE_SESSION)
          session = cookie[1];
        if(cookie[0] === BU_COOKIE_LOGGED && cookie[1] === user)
          logged = true;
      });

      if(!logged)
        return {
          loading: false,
          session,
          logged,
          user
        } as UserType;

      keep && saveUser(user, password);

      return {
        loading: false,
        session,
        logged,
        user
      } as UserType;
    });
}

function logoutUser(): Promise<void> {
  return fetch(`${BU_HOST}${BU_PATH_LOGOUT}`)
    .then(unsaveUser)
}

function login(user?: string, password?: string, keep?: boolean): Promise<UserType> {
  if(user && password)
    return loginUser(user, password, keep);
  else
    return restoreUser()
      .then(({ user, password }) => loginUser(user, password, keep));
}

const User = {
  logout: logoutUser,
  login
};

export default User;
