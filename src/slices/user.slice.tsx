import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  logged: boolean,
  loading: boolean,
  session: string|null,
  user: string|null
};

const initialState: UserState = {
  logged: false,
  loading: false,
  session: null,
  user: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state: UserState, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload
    }),

    setUser: (state: UserState, action: PayloadAction<UserState>) => action.payload
  }
});

export const { setUserLoading, setUser } = user.actions;
export default user.reducer;
