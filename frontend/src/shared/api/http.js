export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const postJson = async (path, body) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error || "Request failed");
  }

  return response.json();
}

export const deleteRequest = async (path) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

  if (!response.ok) {
    const {error} = await response.json().catch(() => ({}));
    throw new Error(error || "Request failed");
  }

  if (response.status === 204) return null;

  return response.json();
}

export const updateRequest = async (path, body) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error || "Request failed");
  }

  return response.json();
}

export const getRequest = async (path) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error || "Request failed");
  }

  return response.json();
}

export const pathRequest = async (path, body) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error || "Request failed");
  }

  return response.json();
}