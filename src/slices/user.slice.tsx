import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User, { UserType } from '../handlers/User.handler';
import { RootState } from '../store';

const initialState: UserType = {
  logged: false,
  loading: false,
  session: null,
  user: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(userLogin.pending, state => ({ ...state, loading: true }))
    .addCase(userLogin.rejected, state => ({ ...state, loading: false }))
    .addCase(userLogin.fulfilled, (state, action) => action.payload)
    .addCase(userLogout.rejected, state => state)
    .addCase(userLogout.fulfilled, (state, action) => action.payload)
});

export const userLogin = createAsyncThunk('user/login', (
  login: { user?: string, password?: string, keep?: boolean },
  { getState }
): Promise<UserType> => {
  const { user, password, keep } = login;
  const { user: { logged } } = getState() as RootState;


  if(logged)
    return Promise.reject();
  return User.login(user, password, keep);
});

export const userLogout = createAsyncThunk('user/logout', (
  ignore,
  { getState }
): Promise<UserType> => {
  const { user: state } = getState() as RootState;

  if(!state.logged)
    return Promise.reject();
  return User.logout()
    .then(Promise.reject)
    .catch(() => ({
      logged: false,
      loading: false,
      session: null,
      user: null
    }));
})

export default user.reducer;
