import { HotelCard } from "../HotelCard/HotelCard.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelList.module.scss";
import { useEffect, useState } from "react";
import { getHotels } from "../../shared/api/hotels.js";

export const HotelList = () => {
  const [allHotels, setAllHotels] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHotels()
      .then((data) => {
        setAllHotels(data);
        setFilteredTickets(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {

  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className={styles.sorting_results}>
        <p>
          <strong>Showing {filteredTickets.length} of</strong>{" "}
          <span>{allHotels.length} places</span>
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
        {filteredTickets.map((hotel) => (
          <HotelCard key={hotel.id} item={hotel} />
        ))}
      </section>
    </div>
  );
};
