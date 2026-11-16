import { postJson } from "./http.js";

export const addReview = (body) => postJson("/api/reviews", body);
