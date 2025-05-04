// store/pokerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RunSimulationResponse } from "src/modules/poker/services/api/types";
import { Card as CardType } from "src/modules/poker/types";

interface PokerState {
  holeCards: [CardType | null, CardType | null];
  communityCards: (CardType | null)[];
  simulationResult: RunSimulationResponse | null;
  playerCount: number;
  iterationCount: number;
}

const initialState: PokerState = {
  holeCards: [null, null],
  communityCards: Array(5).fill(null),
  simulationResult: null,
  playerCount: 3,
  iterationCount: 1000,
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
    setHoleCards: (
      state,
      action: PayloadAction<{ holeCards: [CardType | null, CardType | null] }>,
    ) => {
      state.holeCards = action.payload.holeCards;
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
    removeIthComminityCard: (state, action: PayloadAction<number>) => {
      state.communityCards[action.payload] = null;
      if (state.communityCards.filter((e) => !!e).length >= 3) {
        state.communityCards = state.communityCards.filter((e) => !!e);
        state.communityCards = state.communityCards.concat(
          Array(5 - state.communityCards.length).fill(null),
        );
      }
    },
    setSimulationResult(
      state,
      action: PayloadAction<RunSimulationResponse | null>,
    ) {
      state.simulationResult = action.payload;
    },
    setPlayerCount(state, action: PayloadAction<number>) {
      state.playerCount = action.payload;
    },
    setIterationCount(state, action: PayloadAction<number>) {
      state.iterationCount = action.payload;
    },
  },
});

export const {
  setHoleCard,
  setHoleCards,
  setCommunityCard,
  resetCommunityCards,
  setSimulationResult,
  setIterationCount,
  setPlayerCount,
  removeIthComminityCard,
} = pokerSlice.actions;
export default pokerSlice.reducer;
