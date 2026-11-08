import {API_URL, deleteRequest, getRequest, postJson, updateRequest} from "./http.js";

export const getAdmins = async () => {
    return await getRequest("/api/admins");
}

export const getAdminById = async (id) => {
    return await getRequest(`/api/admins/${id}`);
}

export const createAdmin = async (adminData) => postJson("/api/admins", adminData);
export const deleteAdmin = async (adminId) => deleteRequest(`/api/admins/${adminId}`);
export const updateAdmin = async (id, admin) => updateRequest(`/api/admins/${id}`, admin);