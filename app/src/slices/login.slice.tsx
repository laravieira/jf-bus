import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Login from '../handlers/Login.handler';
import { LoginState } from '../models/LoginState.model';

const initialState: LoginState = {
  logged: false,
  loading: false,
  session: null,
  user: null,
  autoLogged: false,
  since: Date.now()
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (ignore, action: PayloadAction<LoginState>) => action.payload
  },
  extraReducers: builder => builder
    .addCase(login.pending, state => ({ ...state, loading: true }))
    .addCase(login.rejected, (state, action) => ({
      ...state,
      loading: false,
      autoLogged: typeof action.meta.arg.keep === 'undefined'
    }))
    .addCase(login.fulfilled, (state, action) => action.payload)
    .addCase(logout.rejected, () => ({
      logged: false,
      loading: false,
      session: null,
      user: null,
      autoLogged: true,
      since: Date.now()
    }))
});

export const login = createAsyncThunk('login/login', (
  login: { user: string, password: string, keep: boolean }
): Promise<LoginState> => {
  const { user, password, keep } = login;

  // If not logged or logged but expired
  return Login.login(user, password, keep);
});

export const logout = createAsyncThunk('login/logout', (
  ignore,
  { getState }
): Promise<any> => {
  const { login: { logged, session } } = getState() as RootState;

  if(!logged)
    return Promise.reject();
  return Login.logout(session ?? '')
    .then(Promise.reject)
})

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
