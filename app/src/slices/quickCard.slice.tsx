import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import QuickCard from '../handlers/QuickCard.handler';
import { Card } from '../models/Card.model';
import Owner from '../handlers/Owner.handler';

type QuickCardState = {
  card: Card|null
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
  data: {
    session: string,
    owner: number,
    card: string
  },
  { getState }
): Promise<QuickCardState> => {
  const { quickCard: { card: state } } = getState() as RootState;
  const { session, owner, card: number } = data;

  if(number === state?.number)
    return QuickCard.unsaveCard()
      .then(() => ({ card: null }));

  return Owner(session, owner)
    .then(({ card }) => QuickCard.saveCard(card))
    .then(card => ({ card }))
});

export const loadQuickCard = createAsyncThunk('quick-card/load', (
  ignore,
  { getState }
): Promise<QuickCardState> => {
  const { quickCard: { card } } = getState() as RootState;

  if(card)
    return Promise.reject();
  return QuickCard.restoreCard()
    .then(card => ({ card }));
});

export default quickCard.reducer;
