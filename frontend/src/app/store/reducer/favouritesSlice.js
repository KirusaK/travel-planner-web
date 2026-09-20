import { createSlice } from "@reduxjs/toolkit";

const loadFavouritesFromStorage = () => {
  try {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Ошибка при чтении localStorage:", err);
    return [];
  }
};

const saveFavouritesToStorage = (items) => {
  try {
    localStorage.setItem("favourites", JSON.stringify(items));
  } catch (e) {
    console.error("Ошибка при записи в localStorage:", e);
  }
};

const initialState = {
  items: loadFavouritesFromStorage(), // Исправлено: items вместо item
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

      saveFavouritesToStorage(state.items);
    },

    removeFavourite: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);

      saveFavouritesToStorage(state.items);
    },
  },
});

export const { toggleFavourite, removeFavourite } = favouritesSlice.actions;

export const selectFavourites = (state) => state.favourites.items;
export const selectIsFavourite = (id) => (state) =>
  state.favourites.items.some((item) => item.id === id);

export default favouritesSlice.reducer;
