import imgLogo from "../../shared/assets/image/airplane.jpg";
import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import styles from "./BookingDetailTotal.module.scss";

export const BookingDetailTotal = ({ ticket }) => {
  const {
    trips = [],
    airlineName,
    rating,
    ratingStatus,
    reviewsCount,
    price,
    flightClass = "Economy",
  } = ticket;

  // 👈 Достаем первый рейс из массива
  const firstTrip = trips[0] || {};

  return (
    <section className={styles.bookingDetailTotal}>
      <div className={styles.bookingDetailTotal_card}>
        <div className={styles.bookingDetailTotal_flight}>
          <div
            className={styles.bookingDetailTotal_flight__image}
            style={{
              backgroundImage: `url(${imgLogo})`,
              width: "120px",
              height: "120px",
              borderRadius: "12px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className={styles.bookingDetailTotal_flight__info}>
            <p className={styles.bookingDetailTotal_flight__class}>
              {flightClass || firstTrip.type}
            </p>
            <h2 className={styles.bookingDetailTotal_flight__title}>
              {airlineName} {firstTrip.aircraft}
            </h2>

            <div className={styles.bookingDetailTotal_flight__rating}>
              <RatingCard value={rating} />
              <p className={styles.bookingDetailTotal_flight__ratingText}>
                <b>{ratingStatus}</b> {reviewsCount}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bookingDetailTotal_protection}>
          <hr className={styles.bookingDetailTotal_protection__hr} />
          <p className={styles.bookingDetailTotal_protection__text}>
            Your booking is protected by <b>golobe</b>
          </p>
          <hr className={styles.bookingDetailTotal_protection__hr} />
        </div>

        <div className={styles.bookingDetailTotal_price}>
          <h3 className={styles.bookingDetailTotal_price__title}>
            Price Detail
          </h3>

          <div className={styles.bookingDetailTotal_price__list}>
            <div className={styles.bookingDetailTotal_price__row}>
              <p className={styles.bookingDetailTotal_price__label}>
                Base Fare
              </p>
              <p className={styles.bookingDetailTotal_price__value}>{price}</p>
            </div>
            <div className={styles.bookingDetailTotal_price__row}>
              <p className={styles.bookingDetailTotal_price__label}>Discount</p>
              <p className={styles.bookingDetailTotal_price__value}>{price}</p>
            </div>
            <div className={styles.bookingDetailTotal_price__row}>
              <p className={styles.bookingDetailTotal_price__label}>Taxes</p>
              <p className={styles.bookingDetailTotal_price__value}>{price}</p>
            </div>
            <div className={styles.bookingDetailTotal_price__row}>
              <p className={styles.bookingDetailTotal_price__label}>
                Service Fee
              </p>
              <p className={styles.bookingDetailTotal_price__value}>{price}</p>
            </div>
          </div>

          <hr className={styles.bookingDetailTotal_price__hr} />
        </div>

        <div className={styles.bookingDetailTotal_total}>
          <p className={styles.bookingDetailTotal_total__label}>Total</p>
          <p className={styles.bookingDetailTotal_total__value}>{price}</p>
        </div>
      </div>
    </section>
  );
};
