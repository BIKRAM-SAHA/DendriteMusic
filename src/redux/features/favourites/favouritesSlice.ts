import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type itemId = string;
type favourites = itemId[];

export const initialState: favourites = [];

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourite(state, action: PayloadAction<itemId>) {
      state.push(action.payload);
    },
    removeFromFavourite(state, action: PayloadAction<itemId>) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
