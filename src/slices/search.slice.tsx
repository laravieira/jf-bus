import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  value: string,
  focus: boolean
};

const initialState: SearchState = {
  value: '',
  focus: false
}

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state: SearchState, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setFocus: (state: SearchState, action: PayloadAction<boolean>) => {
      state.focus = action.payload
    }
  },
});

export const { setSearch, setFocus } = search.actions;
export default search.reducer;
