import { FilterPrice } from "../../shared/ui/FilterPrice/FilterPrice";
import { DepartureTime } from "../../shared/ui/DepartureTime/DepartureTime";
import { Rating } from "../../shared/ui/Rating/Rating";
import styles from "./FlightFilters.module.scss";

export const FlightFilters = () => {
  return (
    <div>
      <section className={styles.FlightFilters}>
        <FilterPrice />
        <DepartureTime />
        <Rating />
      </section>
    </div>
  );
};
