import image from "../../shared/assets/image/Ellipse 1.jpg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminFlightsTable.module.scss";
import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { ButtonEdit } from "../../shared/ui/ButtonEdit/ButtonEdit.jsx";
import { ButtonDelete } from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";
import { Badge } from "../../shared/ui/Badge/Badge.jsx";
import { getFlights } from "../../shared/api/flights.js";
import {getRatingStatus} from "../../shared/lib/format.js";
import {useFetchData} from "../../shared/hooks/useFetchData.js";

export const AdminFlightsTable = () => {
  const {data: flights, loading, error} = useFetchData(getFlights);

  if (loading) return <p>Loading flights...</p>;
  if (error) return <p>{error}</p>;

  const classVariant  = {
    Economy: "neutral",
    Business: "success",
    First: "dark",
    Premium: "success",
  };

  return (
    <section className={styles.flightsTable}>
      <div className={styles.flightsTable__header}>
        <span className={styles.flightsTable__headerCol}>Airline Name</span>
        <span className={styles.flightsTable__headerCol}>Rating</span>
        <span className={styles.flightsTable__headerCol}>Price</span>
        <span className={styles.flightsTable__headerCol}>From - To</span>
        <span className={styles.flightsTable__headerCol}>Class</span>
        <span className={styles.flightsTable__headerCol}>Trips</span>
        <span
          className={`${styles.flightsTable__headerCol} ${styles.flightsTable__headerColRight}`}
        >
          Actions
        </span>
      </div>

      <div className={styles.flightsTable__list}>
        {flights.map((item) => (
          <div key={item.id} className={styles.flightsTable__row}>
            {/* 1. Airline */}
            <div className={styles.flightsTable__airline}>
              <img src={image} alt="" className={styles.flightsTable__logo} />
              <div className={styles.flightsTable__airlineInfo}>
                <h3 className={styles.flightsTable__airlineName}>
                  {item.airlineName}
                </h3>
                <span className={styles.flightsTable__airlineReviews}>
                  {item.reviewsCount} reviews
                </span>
              </div>
            </div>

            {/* 2. Rating */}
            <div className={styles.flightsTable__ratingGroup}>
              <RatingCard value={item.rating} />
              <span className={styles.flightsTable__ratingStatus}>
                {getRatingStatus(item.rating)}
              </span>
            </div>

            {/* 3. Price */}
            <span className={styles.flightsTable__price}>${item.price}</span>

            {/* 4. From - To */}
            <div className={styles.flightsTable__routeCodes}>
              <div className={styles.flightsTable__routeCodes__block}>
                <span className={styles.flightsTable__routePoint}>
                  {item.from}
                </span>
                <svg
                  width={14}
                  height={14}
                  className={styles.flightsTable__arrow}
                >
                  <use href={sprite + "#icon-Frame6"} />
                </svg>
                <span className={styles.flightsTable__routePoint}>
                  {item.to}
                </span>
              </div>
              <span className={styles.flightsTable__routeAirport}>
                {item.airport}
              </span>
            </div>

            {/* 5. Class */}
            <div>
              <Badge variant={classVariant[item.flightClass]}>
                {item.flightClass}
              </Badge>
            </div>

            {/* 6. Trips */}
            <span className={styles.flightsTable__trips}>
              {item.tripsCount} {item.tripsCount === 1 ? "segment" : "segments"}
            </span>

            {/* 7. Actions */}
            <div className={styles.flightsTable__btnGroup}>
              <ButtonEdit />
              <ButtonDelete />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};