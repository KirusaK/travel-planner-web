import {postJson, API_URL, deleteRequest, updateRequest, getRequest} from "./http.js";

export const getHotels = async () => {
  return await getRequest("/api/hotels")
};

export const getHotelById = async (id) => {
  return await getRequest(`/api/hotels/${id}`);
}

export const createHotel = async (hotel) => postJson("/api/hotels", hotel);
export const deleteHotel = async (id) => deleteRequest(`/api/hotels/${id}`);
export const updateHotel = async (id, hotel) => updateRequest(`/api/hotels/${id}`, hotel);