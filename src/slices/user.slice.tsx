import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Login, { LoginType } from '../handlers/Login.handler';

const initialState: LoginType = {
  logged: false,
  loading: false,
  session: null,
  user: null,
  autoLogged: false
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(userLogin.pending, state => ({ ...state, loading: true }))
    .addCase(userLogin.rejected, (state, action) => ({
      ...state,
      loading: false,
      autoLogged: typeof action.meta.arg.keep === 'undefined'
    }))
    .addCase(userLogin.fulfilled, (state, action) => action.payload)
    .addCase(userLogout.rejected, () => ({
      logged: false,
      loading: false,
      session: null,
      user: null,
      autoLogged: true
    }))
});

export const userLogin = createAsyncThunk('user/login', (
  login: { user?: string, password?: string, keep?: boolean },
  { getState }
): Promise<LoginType> => {
  const { user, password, keep } = login;
  const { user: { logged } } = getState() as RootState;

  if(logged)
    return Promise.reject();
  return Login.login(user, password, keep);
});

export const userLogout = createAsyncThunk('user/logout', (
  ignore,
  { getState }
): Promise<any> => {
  const { user: { logged, session } } = getState() as RootState;

  if(!logged)
    return Promise.reject();
  return Login.logout(session ?? '')
    .then(Promise.reject)
})

export default user.reducer;
