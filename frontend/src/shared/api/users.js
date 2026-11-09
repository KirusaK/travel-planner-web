import {API_URL, deleteRequest, getRequest} from "./http.js";

export const getUsers = async () => {
  return await getRequest("/api/users");
}

export const getBookings = async (limit) => {
  const url = limit ? `/api/bookings?limit=${limit}` : `/api/bookings`;
  return await getRequest(url);
}

export const deleteUser = (id) => deleteRequest(`/api/users/${id}`);