import {API_URL, deleteRequest, getRequest} from "./http.js";

export const getUsers = async () => {
  return await getRequest("/api/users");
}

export const deleteUser = (id) => deleteRequest(`/api/users/${id}`);