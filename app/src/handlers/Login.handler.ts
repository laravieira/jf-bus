import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import CookieManager, { Cookies } from '@react-native-cookies/cookies';
import {
  BU_COOKIE_LOGGED,
  BU_COOKIE_SESSION, BU_PATH_ISLOGGED,
  BU_PATH_LOGIN,
  BU_PATH_LOGOUT,
  BU_STORE_PASSWORD,
  BU_STORE_USER
} from '../constants';
import useAxios from '../hooks/useAxios.hook';
import { Login as LoginModel } from '../models/Login.model';
import { LoginState } from '../models/LoginState.model';

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

function restoreUser(): Promise<LoginModel> {
  return Promise.all([
    getItemAsync(BU_STORE_USER),
    getItemAsync(BU_STORE_PASSWORD)
  ]).then(credentials => {
    if(credentials[0] && credentials[1])
      return {
        user: credentials[0],
        password: credentials[1]
      } as LoginModel;
    return Promise.reject();
  });
}

function loginUser(user: string, password: string, keep?: boolean): Promise<LoginState> {
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
      } as LoginState;
    });
}

/** Destroy session and deleted saved credentials
 * @param session The key of a valid logged session
 */
function logoutUser(session: string): Promise<void> {
  return CookieManager.clearAll()
    .then(unsaveUser)
    .then(() => useAxios(session).get(`${BU_PATH_LOGOUT}`))
}

/** Validate if user is logged
 * @param session The key of a valid logged session
 */
function isLogged(session: string): Promise<boolean> {
  return useAxios(session).get(BU_PATH_ISLOGGED)
    .then(data => data.data.includes('wfm_default.aspx'));
}

/** Try to log in a new user
 * @param user The only number CPF to login
 * @param password The password to login
 * @param [keep] If auto login will be enabled (save credentials and auto login whenever is needed)
 */
function login(user?: string, password?: string, keep?: boolean): Promise<LoginState> {
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
      } as LoginState));
}

const Login = {
  logout: logoutUser,
  login,
  isLogged
};

export default Login;
