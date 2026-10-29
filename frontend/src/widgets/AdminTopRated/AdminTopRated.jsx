import styles from "./AdminTopRated.module.scss";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import {RatingCard} from "../../shared/ui/RatingCard/RatingCard.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getFlights } from "../../shared/api/flights.js";
import { getHotels } from "../../shared/api/hotels.js";
import { getStars } from "../../shared/lib/format.js";

export const AdminTopRated = () => {
  const {
    data: flights = [],
    loading: flightsLoadnig,
    error: flightsError,
  } = useFetchData(getFlights);
  const {
    data: hotels = [],
    loading: hotelsLoadnig,
    error: hotelsError,
  } = useFetchData(getHotels);

  const topFlight = [...flights]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const topHotels = [...hotels]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const loading = hotelsLoadnig || flightsLoadnig ;
  const error = hotelsError || flightsError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.topRated}>
      <div className={styles.topRated_header}>
        <h3 className={styles.topRated_title}>Top rated</h3>
        <p className={styles.topRated_subtitle}>Best performing inventory</p>
      </div>

      <div className={styles.topRated_group}>
        {topHotels.map((item) => (
          <div key={item.id} className={styles.topRated_item}>
            <div className={styles.topRated_left}>
              <div className={styles.topRated_iconWrapper}>
                <svg width={20} height={20} style={{ "--color1": "#112211" }}>
                  <use href={sprite + "#icon-Frame2"} />
                </svg>
              </div>

              <div className={styles.topRated_details}>
                <h3 className={styles.topRated_itemName}>{item.name}</h3>
                {Array.from({ length: getStars(item.rating) }).map(
                  (_, index) => (
                    <svg key={index} width={16} height={16}>
                      <use href={sprite + "#icon-Star"} />
                    </svg>
                  ),
                )}
              </div>
            </div>

            <span className={styles.topRated_price}>${item.pricePerNight}</span>
          </div>
        ))}
      </div>

      <hr className={styles.topRated_divider} />

      <div className={styles.topRated_group}>
        {topFlight.map((item) => (
          <div key={item.id} className={styles.topRated_item}>
            <div className={styles.topRated_left}>
              <div className={styles.topRated_iconWrapper}>
                <svg width={20} height={20} style={{ "--color1": "#112211" }}>
                  <use href={sprite + "#icon-Frame1"} />
                </svg>
              </div>

              <div className={styles.topRated_details}>
                <h3 className={styles.topRated_itemName}>{item.airlineName}</h3>
                <span className={styles.topRated_route}>{item.from} - {item.to}</span>
              </div>
            </div>

            <RatingCard value={item.rating} />
          </div>
        ))}
      </div>
    </section>
  );
};