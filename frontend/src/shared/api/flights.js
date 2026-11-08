import {postJson, API_URL, deleteRequest, updateRequest, getRequest} from "./http.js";

export const getFlights = async () => {
  return await getRequest("/api/flights");
}

export const getFlightById = async (id) => {
  return await getRequest(`/api/flights/${id}`);
}

export const createFlight = async (flight) => postJson("/api/flights", flight);
export const deleteFlight = async (id) => deleteRequest(`/api/flights/${id}`);
export const updateFlight = async (id, flight) => updateRequest(`/api/flights/${id}`, flight);
