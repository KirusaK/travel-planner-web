import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./reducer/hotelSlice.js";
import flightReducer from "./reducer/flightSlice.js";
import favouritesReducer from "./reducer/favouritesSlice.js"; // Исправлено имя импорта

export const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    flight: flightReducer,
    favourites: favouritesReducer,
  },
});
