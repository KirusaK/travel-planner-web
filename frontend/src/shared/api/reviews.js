import { getRequest, postJson } from "./http.js";

export const getReviews = async (limit = 10) => {
  return await getRequest(`/api/reviews?limit=${limit}`);
};

export const addReview = (body) => postJson("/api/reviews", body);
