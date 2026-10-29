const API_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) throw new Error("Failed to load users");

  return response.json();
}

export const getBookings = async (limit) => {
  const url = limit ? `${API_URL}/bookings?limit=${limit}` : `${API_URL}/bookings`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to load bookings");

  return response.json();
}