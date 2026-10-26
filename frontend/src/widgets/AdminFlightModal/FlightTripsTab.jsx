import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightTripsTab.module.scss";

export const FlightTripsTab = () => {
  return (
    <div className={styles.tripsTab}>
      <section className={styles.tripsTab__trip}>
        <div className={styles.tripsTab__head}>
          <div className={styles.tripsTab__title}>
            <div className={styles.tripsTab__block__number}>
              <span className={styles.tripsTab__number}>1</span>
            </div>

            <h3 className={styles.tripsTab__name}>Depart</h3>
          </div>

          <div className={styles.tripsTab__actions}>
            <button className={styles.tripsTab__iconBtn}>
              <svg
                width={16}
                height={16}
                className={styles.tripsTab__icon__arrow}
              >
                <use href={sprite + "#icon-chevron_down"} />
              </svg>
            </button>
            <button className={styles.tripsTab__iconBtn}>
              <svg width={16} height={16}>
                <use href={sprite + "#icon-chevron_down"} />
              </svg>
            </button>
            <button className={styles.tripsTab__iconBtn}>
              <svg width={16} height={16}>
                <use href={sprite + "#icon-Frame9"} />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.tripsTab__row}>
          <div className={styles.tripsTab__field}>
            <label className={styles.tripsTab__label} htmlFor="segmentLabel">
              Segment Label
            </label>
            <select
              className={styles.tripsTab__input}
              id="segmentLabel"
              name="segmentLabel"
            >
              <option value="Depart">Depart</option>
              <option value="Return">Return</option>
            </select>
          </div>
          <div className={styles.tripsTab__field}>
            <label htmlFor="departureTime" className={styles.tripsTab__label}>
              {" "}
              Departure Time
            </label>
            <input
              id="departureTime"
              name="departureTime"
              type="time"
              placeholder="12:00 pm"
              className={styles.tripsTab__input}
            />
          </div>
          <div className={styles.tripsTab__field}>
            <label htmlFor="arrivalTime" className={styles.tripsTab__label}>
              {" "}
              Arrival Time
            </label>
            <input
              id="arrivalTime"
              name="arrivalTime"
              type="time"
              placeholder="01:28 pm"
              className={styles.tripsTab__input}
            />
          </div>
        </div>

        <div className={styles.tripsTab__row}>
          <div className={styles.tripsTab__field}>
            <label
              htmlFor="departureAirport"
              className={styles.tripsTab__label}
            >
              {" "}
              Departure Airport
            </label>
            <input
              id="departureAirport"
              name="departureAirport"
              type="text"
              placeholder="Ezeiza International (EZE)"
              className={styles.tripsTab__input}
            />
          </div>
          <div className={styles.tripsTab__field}>
            <label htmlFor="arrivalAirport" className={styles.tripsTab__label}>
              {" "}
              Arrival Airport
            </label>
            <input
              id="arrivalAirport"
              name="arrivalAirport"
              type="text"
              placeholder="Istanbul Airport (IST)"
              className={styles.tripsTab__input}
            />
          </div>
          <div className={styles.tripsTab__field}>
            <label htmlFor="route" className={styles.tripsTab__label}>
              {" "}
              Date
            </label>
            <input
              id="route"
              name="route"
              type="date"
              placeholder="EZE-IST"
              className={styles.tripsTab__input}
            />
          </div>
        </div>

        <div className={styles.tripsTab__row}>
          <div className={styles.tripsTab__field}>
            <label htmlFor="flightType" className={styles.tripsTab__label}>
              Flight Type
            </label>
            <select
              id="flightType"
              name="flightType"
              className={styles.tripsTab__input}
            >
              <option value="non stop">non stop</option>
              <option value="1 stop">1 stop</option>
              <option value="2+ stop">2+ stop</option>
            </select>
          </div>

          <div className={styles.tripsTab__field}>
            <label htmlFor="status" className={styles.tripsTab__label}>
              Status
            </label>
            <select
              id="status"
              name="status"
              className={styles.tripsTab__input}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="On time">On time</option>
              <option value="Delayed">Delayed</option>
              <option value="Boarding">Boarding</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className={styles.tripsTab__field}>
            <label htmlFor="aircraftType" className={styles.tripsTab__label}>
              Aircraft Type
            </label>
            <input
              id="aircraftType"
              name="aircraftType"
              type="text"
              className={styles.tripsTab__input}
            />
          </div>
        </div>
      </section>

      <button type="button" className={styles.tripsTab__addBtn}>
        + Add room
      </button>
    </div>
  );
}