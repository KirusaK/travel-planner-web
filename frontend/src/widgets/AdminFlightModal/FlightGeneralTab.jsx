import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightGeneralTab.module.scss";

export const FlightGeneralTab = ({formData, onChange}) => {
  return (
    <div className={styles.generalTab}>
      <section className={styles.generalTab__sectionHead}>
        <h3 className={styles.generalTab__sectionTitle}>Airline</h3>
        <p className={styles.generalTab__sectionHint}>
          How the airline appears on search results.
        </p>
      </section>

      <section className={styles.generalTab__row}>
        <div className={styles.generalTab__field}>
          <label className={styles.generalTab__label} htmlFor="airlineName">
            Airline Name
          </label>
          <input
            className={styles.generalTab__input}
            type="text"
            id="airlineName"
            name="airlineName"
            value={formData.airlineName}
            onChange={onChange}
          />
        </div>
        <div className={styles.generalTab__field}>
          <label className={styles.generalTab__label} htmlFor="flightClass">
            Flight Class
          </label>
          <select
            className={styles.generalTab__input}
            id="flightClass"
            name="flightClass"
            value={formData.flightClass}
            onChange={onChange}
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
      </section>

      <section className={styles.generalTab__logo}>
        <div className={styles.generalTab__logoPreview}>
          <span className={styles.generalTab__logoPreview__title}>
            Airline Logo
          </span>
          <button className={styles.generalTab__logoPreview__btn}>
            <svg width={24} height={24}>
              <use href={sprite + "#icon-Frame11"} />
            </svg>
          </button>
        </div>

        <div className={styles.generalTab__logoControls}>
          <button className={styles.generalTab__uploadBtn}>Upload image</button>
          <input
            className={styles.generalTab__input}
            type="text"
            name="airlineLogo"
            placeholder="or paste image URL"
            value={formData.airlineLogo}
            onChange={onChange}
          />
        </div>
      </section>

      <section className={styles.generalTab__section}>
        <div className={styles.generalTab__sectionHead}>
          <h3 className={styles.generalTab__sectionTitle}>Route</h3>
          <p className={styles.generalTab__sectionHint}>
            Main route shown in listings.
          </p>
        </div>

        <div
          className={`${styles.generalTab__row} ${styles.generalTab__row__three}`}
        >
          <div className={styles.generalTab__field}>
            <label
              className={styles.generalTab__label}
              htmlFor="airportLocation"
            >
              Airport / Location
            </label>
            <input
              className={styles.generalTab__input}
              type="text"
              id="airportLocation"
              name="airportLocation"
              value={formData.airportLocation}
              onChange={onChange}
            />
          </div>
          <div className={styles.generalTab__field}>
            <label className={styles.generalTab__label} htmlFor="fromAirport">
              From (airport code)
            </label>
            <input
              className={styles.generalTab__input}
              type="text"
              id="fromAirport"
              name="fromAirport"
              value={formData.fromAirport}
              onChange={onChange}
            />
          </div>
          <div className={styles.generalTab__field}>
            <label className={styles.generalTab__label} htmlFor="toAirport">
              To (airport code)
            </label>
            <input
              className={styles.generalTab__input}
              type="text"
              id="toAirport"
              name="toAirport"
              value={formData.toAirport}
              onChange={onChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}