import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/search.slice';

export const store = configureStore({
  reducer: {
    search: searchSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
