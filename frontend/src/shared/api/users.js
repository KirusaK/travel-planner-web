import {API_URL, deleteRequest} from "./http.js";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/api/users`);

  if (!response.ok) throw new Error("Failed to load users");

  return response.json();
}

export const getBookings = async (limit) => {
  const url = limit ? `${API_URL}/api/bookings?limit=${limit}` : `${API_URL}/api/bookings`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to load bookings");

  return response.json();
}

export const deleteUser = (id) => deleteRequest(`/api/users/${id}`);