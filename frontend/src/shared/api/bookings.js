import {getRequest, postJson} from "./http.js";

export const getBookings = async (limit) => {
    const url = limit ? `/api/bookings?limit=${limit}` : `/api/bookings`;
    return await getRequest(url);
}

export const createBookings = (body) => postJson("/api/bookings", body);
export const getBookingById = (id) => getRequest(`/api/bookings/${id}`);