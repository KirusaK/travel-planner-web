import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero-FindFlight/Hero";
import { BookingForm } from "../../widgets/BookingForm/BookingForm";
import { TravelMap } from "../../widgets/TravelMap/TravelMap";
import { FallIntoTravel } from "../../widgets/FallIntoTravel/FallIntoTravel";
import { AdventureSection } from "../../widgets/AdventureSection/AdventureSection";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";
import { useTopRatedHotel } from "../../shared/hooks/useTopRatedHotel.js";
import { getRoomPhoto } from "../../shared/lib/formatters.js";

export const FindFlight = () => {
  const { data: hotel, loading, error } = useTopRatedHotel();
  if (loading || error || !hotel?.id) return null;

  const photos = getRoomPhoto(hotel, 4);

  return (
    <>
      <Header />
      <Hero />
      <BookingForm />
      <TravelMap />
      <FallIntoTravel />
      <AdventureSection hotel={hotel} photo={photos} />
      <Subscribe />
      <Footer />
    </>
  );
};
