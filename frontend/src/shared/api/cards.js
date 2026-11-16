import {deleteRequest, getRequest, postJson} from "./http.js";

export const addCard = (body) => postJson(`/api/cards`, body);
export const getCard = async (userId) => getRequest(`/api/cards?userId=${userId}`);
export const deleteCard = async (id) => deleteRequest(`/api/cards/${id}`);