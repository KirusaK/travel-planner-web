import {postJson, API_URL, deleteRequest, updateRequest} from "./http.js";

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
export const deleteHotel = async (id) => deleteRequest(`/api/hotels/${id}`);
export const updateHotel = async (id, hotel) => updateRequest(`/api/hotels/${id}`, hotel);