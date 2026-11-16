import {deleteRequest, getRequest, postJson} from "./http.js";

export const getFavourites = async (type) => getRequest(type ? `/api/favorites?type=${type}` : `/api/favorites`);
export const addFavourites = async (itemType, itemId) => postJson("/api/favorites", {itemType, itemId});
export const deleteFavourite = async (itemType, itemId) => deleteRequest(`/api/favorites/${itemType}/${itemId}`);