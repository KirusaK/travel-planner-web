import { postJson, API_URL } from "./http.js";

export const getHotels = async () => {
  const response = await fetch(`${API_URL}/api/hotels`)

  if (!response.ok) {
    throw new Error("Failed to load hotels");
  }

  return response.json();
};

export const getHotelById = async (id) => {
  const response = await fetch(`${API_URL}/api/hotels/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load hotel");
  }

  return response.json();
}

export const createHotel = async (hotel) => postJson("/api/hotels", hotel);