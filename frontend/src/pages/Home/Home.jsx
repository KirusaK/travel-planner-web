import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero-Home/Hero";
import { BookingForm } from "../../widgets/BookingForm/BookingForm";
import { Destinations } from "../../widgets/Destinations/Destinations";
import { Services } from "../../widgets/Services/Services";

export const Home = () => {
  return (
    <>
      <Header isTransparent={true} />
      <Hero />
      <div style={{ marginTop: "-115px" }}>
        <BookingForm />
      </div>
      <Destinations />
      <Services />
    </>
  );
};
