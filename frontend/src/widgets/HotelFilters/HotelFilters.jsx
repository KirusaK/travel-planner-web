import { FilterPrice } from "../../shared/ui/FilterPrice/FilterPrice.jsx";
import { Rating } from "../../shared/ui/Rating/Rating.jsx";
import { Freebies } from "../../shared/ui/Freebies/Freebies.jsx";
import { Amenities } from "../../shared/ui/Amenities/Amenities.jsx";
import styles from "./HotelFilters.module.scss";

export const HotelFilters = () => {
  return (
    <div>
      <section className={styles.HotelFilters}>
        <FilterPrice />
        <Rating />
        <Freebies />
        <Amenities />
      </section>
    </div>
  );
};
