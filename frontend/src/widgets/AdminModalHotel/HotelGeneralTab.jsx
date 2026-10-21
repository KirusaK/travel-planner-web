import styles from "./HotelGeneralTab.module.scss";

export const HotelGeneralTab = () => {
  return (
    <div className={styles.hotelGeneral}>
      <h3 className={styles.hotelGeneral__mainTitle}>Property</h3>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__hotekName}>
          <div className={styles.hotelGeneral__fieldGroup}>
            <label htmlFor="hotelName" className={styles.hotelGeneral__label}>
              Hotel Name
            </label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              className={styles.hotelGeneral__input}
            />
          </div>
          <div className={styles.hotelGeneral__fieldGroup}>
            <label htmlFor="shortName" className={styles.hotelGeneral__label}>
              Short Name
            </label>
            <input
              type="text"
              id="shortName"
              name="shortName"
              className={styles.hotelGeneral__input}
            />
          </div>
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__fieldGroup}>
          <label htmlFor="location" className={styles.hotelGeneral__label}>
            Location / Address
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className={styles.hotelGeneral__input}
          />
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__maps}>
          <div className={styles.hotelGeneral__fieldGroup}>
            <label htmlFor="maps" className={styles.hotelGeneral__label}>
              Google Maps URL
            </label>
            <input
              type="text"
              id="maps"
              name="maps"
              className={styles.hotelGeneral__input}
            />
          </div>
          <div className={styles.hotelGeneral__fieldGroup}>
            <label htmlFor="embed" className={styles.hotelGeneral__label}>
              Google Maps Embed URL
            </label>
            <input
              type="text"
              id="embed"
              name="embed"
              className={styles.hotelGeneral__input}
            />
          </div>
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__fieldGroup}>
          <label htmlFor="priceperNight" className={styles.hotelGeneral__label}>
            Price per Night (USD)
          </label>
          <input
            type="text"
            id="priceperNight"
            name="priceperNight"
            className={`${styles.hotelGeneral__input} ${styles.hotelGeneral__input__price}`}
          />
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__block}>
          <div className={styles.hotelGeneral__subHeader}>
            <h3 className={styles.hotelGeneral__subTitle}>Part payment</h3>
            <p className={styles.hotelGeneral__subDescription}>
              Remaining amount auto-fills from the nightly price.
            </p>
          </div>

          <div className={styles.hotelGeneral__row}>
            <div className={styles.hotelGeneral__fieldGroup}>
              <label
                htmlFor="initialAmount"
                className={styles.hotelGeneral__label}
              >
                Initial Amount
              </label>
              <input
                type="text"
                id="initialAmount"
                name="initialAmount"
                className={styles.hotelGeneral__input}
              />
            </div>
            <div className={styles.hotelGeneral__fieldGroup}>
              <label htmlFor="amount" className={styles.hotelGeneral__label}>
                Remaining Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                className={styles.hotelGeneral__input}
              />
            </div>
            <div className={styles.hotelGeneral__fieldGroup}>
              <label htmlFor="date" className={styles.hotelGeneral__label}>
                Due Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={styles.hotelGeneral__input}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__block}>
          <h3 className={styles.hotelGeneral__subTitle}>Overview</h3>

          <div className={styles.hotelGeneral__fieldGroup}>
            <label htmlFor="description" className={styles.hotelGeneral__label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the property, location highlights and what makes it special..."
              className={styles.hotelGeneral__textarea}
            />
          </div>
        </div>
      </section>
    </div>
  );
}