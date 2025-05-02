import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardStyle } from "src/modules/poker/types";

type SettingsState = {
  cardStyle: CardStyle;
  deckColors: 2 | 4;
};

const initialState: SettingsState = {
  cardStyle: CardStyle.SIMPLE,
  deckColors: 2,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCardStyle(state, action: PayloadAction<CardStyle>) {
      state.cardStyle = action.payload;
    },
    setDeckColors(state, action: PayloadAction<2 | 4>) {
      state.deckColors = action.payload;
    },
  },
});

export const { setCardStyle, setDeckColors } = settingsSlice.actions;

export default settingsSlice.reducer;
