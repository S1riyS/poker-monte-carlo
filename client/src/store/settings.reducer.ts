import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupportedLanguage } from "src/i18n";
import { CardStyle } from "src/modules/poker/types";

type SettingsState = {
  cardStyle: CardStyle;
  deckColors: 2 | 4;
  language: SupportedLanguage;
};

const initialState: SettingsState = {
  cardStyle: CardStyle.SIMPLE,
  deckColors: 2,
  language: "en",
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
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.language = action.payload;
    },
  },
});

export const { setCardStyle, setDeckColors, setLanguage } =
  settingsSlice.actions;

export default settingsSlice.reducer;
