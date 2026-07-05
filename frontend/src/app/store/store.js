import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./reducer/hotelSlice.js";
import flightReducer from "./reducer/flightSlice.js";

export const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    flight: flightReducer,
  },
});
