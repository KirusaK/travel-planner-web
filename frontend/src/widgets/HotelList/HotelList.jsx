import { hotels } from "../../entities/hotel/index.js";
import {HotelCard} from "../HotelCard/HotelCard.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelList.module.scss";

export const HotelList = () => {
  return (
    <div>
      <div className={styles.sorting_results}>
        <p>
          <strong>Showing 4 of</strong> <span>257 places</span>
        </p>
        <div className={styles.sorting_selectWrapper}>
          <p>
            Sort by <strong> Recommended</strong>
          </p>
          <svg width={18} height={18}>
            <use href={sprite + "#icon-chevron_down"} />
          </svg>
        </div>
      </div>

      <section className={styles.hotelCard_container}>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} item={hotel} />
        ))}
      </section>
    </div>
  );
};