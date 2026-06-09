import { FilterPrice } from "../../shared/ui/FilterPrice/FilterPrice";
import { DepartureTime } from "../../shared/ui/DepartureTime/DepartureTime";
import { Rating } from "../../shared/ui/Rating/Rating";
import { Airlines } from "../../shared/ui/Airlines/Airlines";
import { Trips } from "../../shared/ui/Trips/Trips";
import styles from "./FlightFilters.module.scss";

export const FlightFilters = () => {
  return (
    <div>
      <section className={styles.FlightFilters}>
        <FilterPrice />
        <DepartureTime />
        <Rating />
        <Airlines />
        <Trips />
      </section>
    </div>
  );
};
