const API_URL = "http://localhost:5000/api";

export const getFlights = async () => {
  const response = await fetch(`${API_URL}/flights`);

  if (!response.ok) {
    throw new Error("Failed to load flights");
  }

  return response.json();
}

export const getFlightById = async (id) => {
  const response = await fetch(`${API_URL}/flights/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load flight");
  }

  return response.json();
}