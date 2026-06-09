import { Header } from "../../widgets/Header/Header";
import { CompactBookingForm } from "../../widgets/CompactBookingForm/CompactBookingForm";
import { FlightFilters } from "../../widgets/FlightFilters/FlightFilters";
import { Othersort } from "../../widgets/Othersort/Othersort";
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
          </div>
        </main>
      </div>
    </div>
  );
};
