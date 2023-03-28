import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Owner } from '../handlers/Owners.handler';
import { RootState } from '../store';
import QuickCard from '../handlers/QuickCard.handler';

type QuickCardState = {
  card: Owner|null
};

const initialState: QuickCardState = {
  card: null
}

const quickCard = createSlice({
  name: 'quickCard',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(setQuickCard.fulfilled, (state, action: PayloadAction<QuickCardState>) => ({ ...action.payload }))
    .addCase(loadQuickCard.fulfilled, (state, action: PayloadAction<QuickCardState>) => ({ ...action.payload }))
});

export const setQuickCard = createAsyncThunk('quick-card/set', (
  onwer: Owner,
  { getState }
): Promise<QuickCardState> => {
  const { quickCard: { card: state } } = getState() as RootState;
  const { card: { number } } = onwer;

  if(number === state?.card.number)
    return QuickCard.unsaveCard()
      .then(() => ({ card: null }));

  return QuickCard.saveCard(onwer)
    .then(() => ({ card: onwer }))
});

export const loadQuickCard = createAsyncThunk('quick-card/load', (
  ignore,
  { getState }
): Promise<QuickCardState> => {
  const { quickCard: { card } } = getState() as RootState;

  if(card)
    return Promise.reject();
  return QuickCard.restoreCard()
    .then(owner => ({ card: owner }));
});

export default quickCard.reducer;
