import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero-Home/Hero";
import { BookingForm } from "../../widgets/BookingForm/BookingForm";

export const Home = () => {
  return (
    <>
      <Header isTransparent={true} />
      <Hero />
      <div style={{ marginTop: "-115px" }}>
        <BookingForm />
      </div>
    </>
  );
};
