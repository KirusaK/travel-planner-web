import { useState } from "react";
import { Header } from "../../widgets/Header/Header";
import { CompactBookingForm } from "../../widgets/CompactBookingForm/CompactBookingForm";
import { FlightFilters } from "../../widgets/FlightFilters/FlightFilters";
import { Othersort } from "../../widgets/Othersort/Othersort";
import { FlightList } from "../../widgets/FlightList/FlightList.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";
import styles from "./FlightsPage.module.scss";

export const FlightsPage = () => {
  const [filters, setFilters] = useState({
    price: null,
    departureTime: null,
    rating: 0,
    airlines: [],
    trips: [],
  });

  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <CompactBookingForm />
        <main className={styles.main}>
          <FlightFilters filters={filters} onChange={setFilters} />
          <div>
            <Othersort />
            <FlightList filters={filters} />
          </div>
        </main>
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};
