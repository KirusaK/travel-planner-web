import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    searchParams: {
      from: "",
      to: "",
      trip: "",
      depart: "",
      return: "",
      passenger: "",
      flightClass: "",
    },
  },
  reducers: {
    setFlightSearch: (state, action) => {
      state.searchParams = action.payload;
    },
  },
});

export const { setFlightSearch } = flightSlice.actions;
export default flightSlice.reducer;
