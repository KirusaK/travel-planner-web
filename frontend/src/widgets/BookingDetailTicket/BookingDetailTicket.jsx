import styles from "./BookingDetailTicket.module.scss";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { formatDate, formatDuration, formatTime } from "../../shared/lib/format.js";

export const BookingDetailTicket = ({ ticket }) => {
  const { airlineName, price, logo, trips = [] } = ticket;

  return (
    <>
      {trips.map((trip) => (
        <section key={trip.id} className={styles.bookingDetailTicket}>
          <div className={styles.bookingDetailTicket_card}>
            <div className={styles.bookingDetailTicket_header}>
              <h2 className={styles.bookingDetailTicket_header__title}>
                {airlineName} {trip.aircraft}
              </h2>
              <h2 className={styles.bookingDetailTicket_header__price}>
                ${price}
              </h2>
            </div>

            <div className={styles.bookingDetailTicket_subheader}>
              <p className={styles.bookingDetailTicket_subheader__title}>
                {trip.duration} {formatDate(trip.date)}
              </p>
              <p className={styles.bookingDetailTicket_subheader__duration}>
                {formatDuration(trip.durationMinutes)}
              </p>
            </div>

            <div className={styles.bookingDetailTicket_block}>
              <div className={styles.bookingDetailTicket_airline}>
                {logo ? (
                  <div
                    className={styles.bookingDetailTicket_airline__logo}
                    style={{
                      backgroundImage: `url(${logo})`,
                    }}
                  ></div>
                ) : (
                  <div className={styles.bookingDetailTicket__logoPlaceholder}>
                    {airlineName[0]}
                  </div>
                )}
                <div className={styles.bookingDetailTicket_airline__info}>
                  <h2 className={styles.bookingDetailTicket_airline__name}>
                    {airlineName}
                  </h2>
                  <p className={styles.bookingDetailTicket_airline__aircraft}>
                    {trip.aircraft}
                  </p>
                </div>
              </div>

              <div className={styles.bookingDetailTicket_amenities}>
                <div className={styles.bookingDetailTicket_amenities__item}>
                  <svg width={24} height={24}>
                    <use href={sprite + "#icon-airplane"} />
                  </svg>
                </div>
                <div className={styles.bookingDetailTicket_amenities__item}>
                  <svg width={24} height={24}>
                    <use href={sprite + "#icon-Wifi"} />
                  </svg>
                </div>
                <div className={styles.bookingDetailTicket_amenities__item}>
                  <svg width={24} height={24}>
                    <use href={sprite + "#icon-Vector"} />
                  </svg>
                </div>
                <div className={styles.bookingDetailTicket_amenities__item}>
                  <svg width={24} height={24}>
                    <use href={sprite + "#icon-ion_fast-food"} />
                  </svg>
                </div>
                <div className={styles.bookingDetailTicket_amenities__item}>
                  <svg width={24} height={24}>
                    <use
                      href={
                        sprite + "#icon-ic_round-airline-seat-recline-normal"
                      }
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.bookingDetailTicket_timeline}>
              <div className={styles.bookingDetailTicket_timeline__departure}>
                <h2 className={styles.bookingDetailTicket_timeline__time}>
                  {formatTime(trip.departureTime)}
                </h2>
                <p className={styles.bookingDetailTicket_timeline__airport}>
                  {trip.departureAirport} ({trip.departureCode})
                </p>
              </div>

              <div className={styles.bookingDetailTicket_timeline__line}>
                <div className={styles.bookingDetailTicket_timeline__dot}></div>
                <div
                  className={styles.bookingDetailTicket_timeline__dash}
                ></div>
                <svg width={48} height={48}>
                  <use href={sprite + "#icon-airplane"} />
                </svg>
                <div
                  className={styles.bookingDetailTicket_timeline__dash}
                ></div>
                <div className={styles.bookingDetailTicket_timeline__dot}></div>
              </div>

              <div className={styles.bookingDetailTicket_timeline__arrival}>
                <h2 className={styles.bookingDetailTicket_timeline__time}>
                  {formatTime(trip.arrivalTime)}
                </h2>
                <p className={styles.bookingDetailTicket_timeline__airport}>
                  {trip.arrivalAirport} ({trip.arrivalCode})
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
