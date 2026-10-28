const API_URL = "http://localhost:5000/api"

export const getHotels = async () => {
  const response = await fetch(`${API_URL}/hotels`)

  if (!response.ok) {
    throw new Error("Failed to load hotels");
  }

  return response.json();
};

export const getHotelById = async (id) => {
  const response = await fetch(`${API_URL}/hotels/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load hotel");
  }

  return response.json();
}