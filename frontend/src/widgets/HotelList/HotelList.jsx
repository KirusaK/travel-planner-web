import { hotels } from "../../entities/hotel/index.js";
import { HotelCard } from "../HotelCard/HotelCard.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelList.module.scss";

// прибирає регістр і діакритику: "Gümüssuyu" -> "gumussuyu"
const normalize = (str = "") =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const HotelList = ({ destination = "" }) => {
  const query = normalize(destination.trim());

  const filteredHotels = query
    ? hotels.filter(
        (hotel) =>
          normalize(hotel.hotelName).includes(query) ||
          normalize(hotel.location).includes(query),
      )
    : hotels;

  return (
    <div>
      <div className={styles.sorting_results}>
        <p>
          <strong>Showing {filteredHotels.length} of</strong>{" "}
          <span>{hotels.length} places</span>
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
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} item={hotel} />
          ))
        ) : (
          <p>No places found for "{destination}"</p>
        )}
      </section>
    </div>
  );
};
