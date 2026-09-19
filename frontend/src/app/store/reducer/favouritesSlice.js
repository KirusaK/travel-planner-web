import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Исправлено: items вместо item
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const item = action.payload;
      const exists = state.items.some((i) => i.id === item.id);

      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        state.items.push(item); // Исправлено: пушим весь объект item, а не только id
      }
    },

    removeFavourite: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
  },
});

export const { toggleFavourite, removeFavourite } = favouritesSlice.actions;

export const selectFavourites = (state) => state.favourites.items;
export const selectIsFavourite = (id) => (state) =>
  state.favourites.items.some((item) => item.id === id);

export default favouritesSlice.reducer;
