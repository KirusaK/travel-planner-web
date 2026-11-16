import { FilterPrice } from "../../shared/ui/FilterPrice/FilterPrice";
import { DepartureTime } from "../../shared/ui/DepartureTime/DepartureTime";
import { Rating } from "../../shared/ui/Rating/Rating";
import { Airlines } from "../../shared/ui/Airlines/Airlines";
import { Trips } from "../../shared/ui/Trips/Trips";
import styles from "./FlightFilters.module.scss";

export const FlightFilters = ({ filters, onChange }) => {
  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <div>
      <section className={styles.FlightFilters}>
        <FilterPrice
          value={filters.price?.[1]}
          onChange={(max) => update({ price: [0, max] })}
        />
        <DepartureTime
          value={filters.departureTime}
          onChange={(departureTime) => update({ departureTime })}
        />
        <Rating
          value={filters.rating}
          onChange={(rating) => update({ rating })}
        />
        <Airlines
          value={filters.airlines}
          onChange={(airlines) => update({ airlines })}
        />
        <Trips value={filters.trips} onChange={(trips) => update({ trips })} />
      </section>
    </div>
  );
};
