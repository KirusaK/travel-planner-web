import photo from "../../shared/assets/image/download 1.jpg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./BookingDetailReservations.module.scss";

export const BookingDetailReservations = ({ hotel }) => {
  const { roomType, price, hotelName, location } = hotel;

  return (
    <section className={styles.bookingDetailReservations}>
      <div className={styles.bookingDetailReservations_container}>
        <div className={styles.bookingDetailReservations_header}>
          <h2 className={styles.bookingDetailReservations_roomType}>
            {roomType}
          </h2>
          <div className={styles.bookingDetailReservations_price}>
            ${price}
            <span className={styles.bookingDetailReservations_pricePeriod}>
              /night
            </span>
          </div>
        </div>

        <div className={styles.bookingDetailReservations_hotel}>
          <div
            style={{
              backgroundImage: `url(${photo})`,
              width: "63px",
              height: "63px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className={styles.bookingDetailReservations_hotelInfo}>
            <h3 className={styles.bookingDetailReservations_hotelName}>
              {hotelName}
            </h3>
            <div className={styles.bookingDetailReservations_location}>
              <svg width={18} height={18}>
                <use href={sprite + "#icon-Location"} />
              </svg>
              <p className={styles.bookingDetailReservations_locationText}>
                {location}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bookingDetailReservations_dates}>
          <div className={styles.bookingDetailReservations_dateBox}>
            <h4 className={styles.bookingDetailReservations_dateTitle}>
              Thursday, Dec 8
            </h4>
            <p className={styles.bookingDetailReservations_dateSubtitle}>
              Check-In
            </p>
          </div>

          <div className={styles.bookingDetailReservations_timeline}>
            <div className={styles.bookingDetailReservations_timelineDot} />
            <div className={styles.bookingDetailReservations_timelineLine} />

            <div className={styles.bookingDetailReservations_timelineIcon}>
              <svg width={48} height={48}>
                <use href={sprite + "#icon-building"} />
              </svg>
            </div>

            <div className={styles.bookingDetailReservations_timelineLine} />
            <div className={styles.bookingDetailReservations_timelineDot} />
          </div>

          <div className={styles.bookingDetailReservations_dateBox}>
            <h4 className={styles.bookingDetailReservations_dateTitle}>
              Friday, Dec 9
            </h4>
            <p className={styles.bookingDetailReservations_dateSubtitle}>
              Check-Out
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
