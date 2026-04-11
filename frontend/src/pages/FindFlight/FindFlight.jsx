import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero-FindFlight/Hero";
import { BookingForm } from "../../widgets/BookingForm/BookingForm";
import { TravelMap } from "../../widgets/TravelMap/TravelMap";
import { FallIntoTravel } from "../../widgets/FallIntoTravel/FallIntoTravel";
import { AdventureSection } from "../../widgets/AdventureSection/AdventureSection";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";

export const FindFlight = () => {
  return (
    <>
      <Header />
      <Hero />
      <BookingForm />
      <TravelMap />
      <FallIntoTravel />
      <AdventureSection />
      <Subscribe />
      <Footer />
    </>
  );
};
