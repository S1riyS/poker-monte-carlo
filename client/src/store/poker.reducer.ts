// store/pokerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RunSimulationResponse } from "src/modules/poker/services/api/types";
import { Card as CardType } from "src/modules/poker/types";

interface PokerState {
  holeCards: [CardType | null, CardType | null];
  communityCards: (CardType | null)[];
  simulationResult: RunSimulationResponse | null;
}

const initialState: PokerState = {
  holeCards: [null, null],
  communityCards: Array(5).fill(null),
  simulationResult: null,
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
    setSimulationResult(
      state,
      action: PayloadAction<RunSimulationResponse | null>,
    ) {
      state.simulationResult = action.payload;
    },
  },
});

export const {
  setHoleCard,
  setCommunityCard,
  resetCommunityCards,
  setSimulationResult,
} = pokerSlice.actions;
export default pokerSlice.reducer;
