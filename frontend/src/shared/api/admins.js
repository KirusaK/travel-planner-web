import {API_URL, postJson} from "./http.js";

export const getAdmins = async () => {
    const response = await fetch(`${API_URL}/api/admins`);

    if (!response.ok) {
        throw new Error("Failed to fetch admins");
    }

    return response.json();
}

export const createAdmin = async (adminData) => postJson("/api/admins", adminData);