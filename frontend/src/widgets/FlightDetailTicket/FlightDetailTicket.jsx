import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightDetailTicket.module.scss";
import { formatDate, formatDuration, formatTime } from "../../shared/lib/format.js";

export const FlightDetailTicket = (props) => {
  const { airlineName, logo, trips = [] } = props;

  return (
    <>
      {trips.map((trip) => (
        <section key={trip.id} className={styles.flightDetailTicket}>
          <div className={styles.flightDetailTicket_header}>
            <h2 className={styles.flightDetailTicket_header__title}>
              {trip.direction} {formatDate(trip.date)}
            </h2>
            <p className={styles.flightDetailTicket_header__text}>
              {formatDuration(trip.durationMinutes)}
            </p>
          </div>
          <div className={styles.flightDetailTicket_main}>
            <div className={styles.flightDetailTicket_main__place}>
              {logo ? (
                <div
                  className={styles.flightDetailTicket_main__logo}
                  style={{
                    backgroundImage: `url(${logo})`,
                  }}
                ></div>
              ) : (
                <div className={styles.flightDetailTicket_logoPlaceholder}>
                  {airlineName[0]}
                </div>
              )}
              <div className={styles.flightDetailTicket_main__place__info}>
                <h2
                  className={styles.flightDetailTicket_main__place__info__title}
                >
                  {airlineName}
                </h2>
                <p
                  className={styles.flightDetailTicket_main__place__info__text}
                >
                  {trip.aircraft}
                </p>
              </div>
            </div>
            <div className={styles.flightDetailTicket_main__services}>
              <div className={styles.flightDetailTicket_main__services__item}>
                <svg
                  className={
                    styles.flightDetailTicket_main__services__item__svg
                  }
                  width={24}
                  height={24}
                >
                  <use href={sprite + "#icon-airplane"} />
                </svg>
              </div>
              <div className={styles.flightDetailTicket_main__services__item}>
                <svg
                  className={
                    styles.flightDetailTicket_main__services__item__svg
                  }
                  width={24}
                  height={24}
                >
                  <use href={sprite + "#icon-Wifi"} />
                </svg>
              </div>
              <div className={styles.flightDetailTicket_main__services__item}>
                <svg
                  className={
                    styles.flightDetailTicket_main__services__item__svg
                  }
                  width={24}
                  height={24}
                >
                  <use href={sprite + "#icon-Vector"} />
                </svg>
              </div>
              <div className={styles.flightDetailTicket_main__services__item}>
                <svg
                  className={
                    styles.flightDetailTicket_main__services__item__svg
                  }
                  width={24}
                  height={24}
                >
                  <use href={sprite + "#icon-ion_fast-food"} />
                </svg>
              </div>
              <div className={styles.flightDetailTicket_main__services__item}>
                <svg
                  className={
                    styles.flightDetailTicket_main__services__item__svg
                  }
                  width={24}
                  height={24}
                >
                  <use
                    href={sprite + "#icon-ic_round-airline-seat-recline-normal"}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.flightDetailTicket_footer}>
            <div className={styles.flightDetailTicket_footer__block}>
              <h2 className={styles.flightDetailTicket_footer__block__title}>
                {formatTime(trip.departureTime)}
              </h2>
              <p className={styles.flightDetailTicket_footer__block__text}>
                {trip.departureAirport} ({trip.departureCode})
              </p>
            </div>
            <div className={styles.flightDetailTicket_footer__divider}>
              <div
                className={styles.flightDetailTicket_footer__divider__dot}
              ></div>
              <div
                className={styles.flightDetailTicket_footer__divider__line}
              ></div>
              <svg width={24} height={24}>
                <use href={sprite + "#icon-airplane"} />
              </svg>
              <div
                className={styles.flightDetailTicket_footer__divider__line}
              ></div>
              <div
                className={styles.flightDetailTicket_footer__divider__dot}
              ></div>
            </div>
            <div className={styles.flightDetailTicket_footer__block}>
              <h2 className={styles.flightDetailTicket_footer__block__title}>
                {formatTime(trip.arrivalTime)}
              </h2>
              <p className={styles.flightDetailTicket_footer__block__text}>
                {trip.arrivalAirport} ({trip.arrivalCode})
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
