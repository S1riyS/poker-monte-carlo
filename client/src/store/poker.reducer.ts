// store/pokerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card as CardType } from "src/modules/poker/types";

interface CardsState {
  holeCards: [CardType | null, CardType | null];
  communityCards: (CardType | null)[];
}

const initialState: CardsState = {
  holeCards: [null, null],
  communityCards: Array(5).fill(null),
};

const pokerSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setHoleCard: (
      state,
      action: PayloadAction<{ index: 0 | 1; card: CardType | null }>,
    ) => {
      state.holeCards[action.payload.index] = action.payload.card;
    },
    setCommunityCard: (
      state,
      action: PayloadAction<{ index: number; card: CardType | null }>,
    ) => {
      state.communityCards[action.payload.index] = action.payload.card;
    },
    resetCommunityCards: (state) => {
      state.communityCards = Array(5).fill(null);
    },
  },
});

export const { setHoleCard, setCommunityCard, resetCommunityCards } =
  pokerSlice.actions;
export default pokerSlice.reducer;
