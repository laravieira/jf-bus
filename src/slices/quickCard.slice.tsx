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
  reducers: {
    setQuickCard: (rawState: QuickCardState, action: PayloadAction<Owner>) => {
      const { card: state } = rawState;
      const { card: { number } } = action.payload;

      if(number === state?.card.number) {
        QuickCard.unsaveCard();
        return { loading: false, card: null };
      }

      QuickCard.saveCard(action.payload);
      return { loading: false, card: action.payload }
    }
  },
  extraReducers: builder => builder
    .addCase(loadQuickCard.pending, (state) => ({...state, loading: true}))
});

export const loadQuickCard = createAsyncThunk('quick-card/load', (
  ignore,
  { getState }
): Promise<QuickCardState> => {
  const { quickCard: { card } } = getState() as RootState;

  if(card)
    return Promise.reject();
  return QuickCard.restoreCard()
    .then(owner => ({
      card: owner,
      loading: false
    }));
});

export const { setQuickCard } = quickCard.actions;
export default quickCard.reducer;
