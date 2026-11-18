import { getHotelById, getHotels } from "../api/hotels.js";
import { useFetchData } from "./useFetchData.js";

const fetchTopRatedHotel = async () => {
  const hotels = await getHotels();
  if (hotels.length === 0) return null;

  const top = hotels.reduce((best, hotel) => {
    const diff = (hotel.rating ?? 0) - (best.rating ?? 0);
    if (diff > 0) return hotel;
    if (diff === 0 && hotel.reviewsCount > best.reviewsCount) return hotel;

    return best;
  });

  return getHotelById(top.id);
};

export const useTopRatedHotel = () => {
  return useFetchData(fetchTopRatedHotel);
};
