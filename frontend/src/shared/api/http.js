export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const postJson = async (path, body) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
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
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const {error} = await response.json().catch(() => ({}));
    throw new Error(error || "Request failed");
  }

  return response.json();
}

export const updateRequest = async (path, body) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
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