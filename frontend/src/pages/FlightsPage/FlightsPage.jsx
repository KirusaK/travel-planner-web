import { Header } from "../../widgets/Header/Header";
import { CompactBookingForm } from "../../widgets/CompactBookingForm/CompactBookingForm";
import { FlightFilters } from "../../widgets/FlightFilters/FlightFilters";
import { Othersort } from "../../widgets/Othersort/Othersort";
import { FlightCard } from "../../widgets/FlightCard/FlightCard";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";
import styles from "./FlightsPage.module.scss";

export const FlightsPage = () => {
  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <CompactBookingForm />
        <main className={styles.main}>
          <FlightFilters />
          <div>
            <Othersort />
            <FlightCard />
          </div>
        </main>
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};
