import {API_URL, deleteRequest, postJson, updateRequest} from "./http.js";

export const getAdmins = async () => {
    const response = await fetch(`${API_URL}/api/admins`);

    if (!response.ok) {
        throw new Error("Failed to fetch admins");
    }

    return response.json();
}

export const getAdminById = async (id) => {
    const response = await fetch(`${API_URL}/api/admins/${id}`);

    if (!response.ok) {
        throw new Error("Failed to load admin");
    }

    return response.json();
}

export const createAdmin = async (adminData) => postJson("/api/admins", adminData);
export const deleteAdmin = async (adminId) => deleteRequest(`/api/admins/${adminId}`);
export const updateAdmin = async (id, admin) => updateRequest(`/api/admins/${id}`, admin);