import {postJson, API_URL, deleteRequest, updateRequest} from "./http.js";

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
export const deleteFlight = async (id) => deleteRequest(`/api/flights/${id}`);
export const updateFlight = async (id, flight) => updateRequest(`/api/flights/${id}`, flight);
