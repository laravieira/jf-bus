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
    }
  },
});

export const { setSearch } = search.actions;
export default search.reducer;
