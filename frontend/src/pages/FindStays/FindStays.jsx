import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero-FindStays/Hero";
import { StaySearch } from "../../widgets/StaySearch/StaySearch";
import { RecentSearches } from "../../widgets/RecentSearches/RecentSearches";
import { FallIntoTravel } from "../../widgets/FallIntoTravel/FallIntoTravel";
import { AdventureSection } from "../../widgets/AdventureSection/AdventureSection";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";
import { getHotelById, getHotels } from "../../shared/api/hotels.js";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import img1 from "../../shared/assets/image/Rectangle4.svg";

const placeholders = [
  { id: "p1", name: "Not name", city: "City", price: "0", image: img1 },
  { id: "p2", name: "Not name", city: "City", price: "0", image: img1 },
  { id: "p3", name: "Not name", city: "City", price: "0", image: img1 },
  { id: "p4", name: "Not name", city: "City", price: "0", image: img1 },
];

const toCard = (hotel) => ({
  id: hotel.id,
  name: hotel.name,
  city: hotel.address,
  price: hotel.pricePerNight,
  image: hotel.cover,
  to: `/hotel-detail/${hotel.id}`,
});

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

export const FindStays = () => {
  const { data: hotel, loading, error } = useFetchData(fetchTopRatedHotel);
  if (loading || error || !hotel?.id) return null;

  const photos = hotel.rooms
    .map((room) => room.imageUrl)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      <Header />
      <Hero />
      <StaySearch />
      <RecentSearches />
      <FallIntoTravel placeholder={placeholders} toCard={toCard} />
      <AdventureSection hotel={hotel} photo={photos} />
      <Subscribe />
      <Footer />
    </>
  );
};
