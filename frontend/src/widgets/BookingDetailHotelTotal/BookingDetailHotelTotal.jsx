import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import styles from "./BookingDetailHotelTotal.module.scss";
import { getRatingStatus } from "../../shared/lib/format.js";

export const BookingDetailHotelTotal = ({ hotel }) => {
  const room = hotel.rooms?.[0];
  const word = "Hotel";
  const index = hotel.name.indexOf(word);
  let hotelPartName = hotel.name;

  if (index !== -1) {
    hotelPartName = hotel.name.slice(0, index).trim();
  }

  return (
    <section className={styles.bookingDetailHotelTotal}>
      <div className={styles.bookingDetailHotelTotal_card}>
        <div className={styles.bookingDetailHotelTotal_hotel}>
          <div
            className={styles.bookingDetailHotelTotal_hotel__image}
            style={{
              backgroundImage: `url(${room.imageUrl})`,
              width: "120px",
              height: "120px",
              borderRadius: "12px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className={styles.bookingDetailHotelTotal_hotel__info}>
            <p className={styles.bookingDetailHotelTotal_hotel__class}>
              {hotelPartName}...
            </p>
            <h2 className={styles.bookingDetailHotelTotal_hotel__title}>
              {room.title}
            </h2>

            <div className={styles.bookingDetailHotelTotal_hotel__rating}>
              <RatingCard value={hotel.rating} />
              <p className={styles.bookingDetailHotelTotal_hotel__ratingText}>
                <b>{getRatingStatus(hotel.rating)}</b> {hotel.reviewsCount}{" "}
                reviews
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bookingDetailHotelTotal_protection}>
          <hr className={styles.bookingDetailHotelTotal_protection__hr} />
          <p className={styles.bookingDetailHotelTotal_protection__text}>
            Your booking is protected by <b>golobe</b>
          </p>
          <hr className={styles.bookingDetailHotelTotal_protection__hr} />
        </div>

        <div className={styles.bookingDetailHotelTotal_price}>
          <h3 className={styles.bookingDetailHotelTotal_price__title}>
            Price Detail
          </h3>

          <div className={styles.bookingDetailHotelTotal_price__list}>
            <div className={styles.bookingDetailHotelTotal_price__row}>
              <p className={styles.bookingDetailHotelTotal_price__label}>
                Base Fare
              </p>
              <p className={styles.bookingDetailHotelTotal_price__value}>
                ${hotel.pricePerNight}
              </p>
            </div>
            <div className={styles.bookingDetailHotelTotal_price__row}>
              <p className={styles.bookingDetailHotelTotal_price__label}>
                Discount
              </p>
              <p className={styles.bookingDetailHotelTotal_price__value}>$0</p>
            </div>
            <div className={styles.bookingDetailHotelTotal_price__row}>
              <p className={styles.bookingDetailHotelTotal_price__label}>
                Taxes
              </p>
              <p className={styles.bookingDetailHotelTotal_price__value}>$0</p>
            </div>
            <div className={styles.bookingDetailHotelTotal_price__row}>
              <p className={styles.bookingDetailHotelTotal_price__label}>
                Service Fee
              </p>
              <p className={styles.bookingDetailHotelTotal_price__value}>$0</p>
            </div>
          </div>

          <hr className={styles.bookingDetailHotelTotal_price__hr} />
        </div>

        <div className={styles.bookingDetailHotelTotal_total}>
          <p className={styles.bookingDetailHotelTotal_total__label}>Total</p>
          <p className={styles.bookingDetailHotelTotal_total__value}>
            ${hotel.pricePerNight}
          </p>
        </div>
      </div>
    </section>
  );
};
