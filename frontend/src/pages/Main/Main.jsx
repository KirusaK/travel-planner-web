import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero/Hero";
import { BookingForm } from "../../widgets/BookingForm/BookingForm";
import { TravelMap } from "../../widgets/TravelMap/TravelMap";
import { FallIntoTravel } from "../../widgets/FallIntoTravel/FallIntoTravel";
import { AdventureSection } from "../../widgets/AdventureSection/AdventureSection";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";

export const Main = () => {
  return (
    <>
      <Header />
      <Hero />
      <BookingForm />
      <TravelMap />
      <FallIntoTravel />
      <AdventureSection />
      <Subscribe />
    </>
  );
};
