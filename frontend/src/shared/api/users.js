const API_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) throw new Error("Failed to load users");

  return response.json();
}

export const getUserBookings = async (id) => {
  const response = await fetch(`${API_URL}/bookings?userId=${id}`);

  if (!response.ok) throw new Error("Failed to load bookings");

  return response.json();
}