import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    searchParams: {
      destination: "",
      checkIn: "",
      checkOut: "",
      roomsAndGuests: "",
    },
  },
  reducers: {
    setHotelSearch: (state, action) => {
      state.searchParams = action.payload;
    },
  },
});

export const { setHotelSearch } = hotelSlice.actions;
export default hotelSlice.reducer;
