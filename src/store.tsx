import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/search.slice';
import loginSlice from './slices/login.slice';
import quickCardSlice from './slices/quickCard.slice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    login: loginSlice,
    quickCard: quickCardSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
