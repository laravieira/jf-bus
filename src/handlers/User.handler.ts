import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import useAppDispatch from '../hooks/useAppDispatch.hook';
import { setUser, setUserLoading } from '../slices/user.slice';
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

function loginUser(user: string, password: string, keep?: boolean): void {
  const dispatch = useAppDispatch();
  dispatch(setUserLoading(true));

  const query = new URLSearchParams({
    doc: user,
    pass: password
  });

  fetch(`${BU_HOST}${BU_PATH_LOGIN}?${query}`)
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

      if(!logged || !session)
        return Promise.reject();

      dispatch(setUser({
        loading: false,
        session,
        logged,
        user
      }))
    })
    .then(() => keep && saveUser(user, password))
    .catch(() => dispatch(setUserLoading(false)))
}

function logoutUser(): void {
  const dispatch = useAppDispatch();

  fetch(`${BU_HOST}${BU_PATH_LOGOUT}`)
    .then(unsaveUser)
    .catch()
    .finally(() => dispatch(setUser({
      logged: false,
      loading: false,
      session: null,
      user: null
    })));
}

function login(user?: string, password?: string, keep?: boolean): void {
  if(user && password)
    loginUser(user, password, keep);
  else
    restoreUser()
      .then(({ user, password }) => loginUser(user, password, keep))
      .catch();
}

const User = {
  logout: logoutUser,
  login
};

export default User;
