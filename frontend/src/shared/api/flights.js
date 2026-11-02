import { postJson, API_URL } from "./http.js";

export const getFlights = async () => {
  const response = await fetch(`${API_URL}/api/flights`);

  if (!response.ok) {
    throw new Error("Failed to load flights");
  }

  return response.json();
}

export const getFlightById = async (id) => {
  const response = await fetch(`${API_URL}/api/flights/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load flight");
  }

  return response.json();
}

export const createFlight = async (flight) => postJson("/api/flights", flight);