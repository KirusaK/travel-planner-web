import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero/Hero";
import { BookingForm } from "../../widgets/BookingForm/BookingForm";
import { TravelMap } from "../../widgets/TravelMap/TravelMap";
import { FallIntoTravel } from "../../widgets/FallIntoTravel/FallIntoTravel";

export const Main = () => {
  return (
    <>
      <Header />
      <Hero />
      <BookingForm />
      <TravelMap />
      <FallIntoTravel />
    </>
  );
};
