import styles from "./HotelGeneralTab.module.scss";

export const HotelGeneralTab = ({formData, onChange}) => {
  return (
    <div className={styles.hotelGeneral}>
      <h3 className={styles.hotelGeneral__mainTitle}>Property</h3>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__fieldGroup}>
          <label htmlFor="name" className={styles.hotelGeneral__label}>
            Hotel Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className={styles.hotelGeneral__input}
          />
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__fieldGroup}>
          <label htmlFor="address" className={styles.hotelGeneral__label}>
            Location / Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            className={styles.hotelGeneral__input}
          />
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__maps}>
          <div className={styles.hotelGeneral__fieldGroup}>
            <label
              htmlFor="googleMapsUrl"
              className={styles.hotelGeneral__label}
            >
              Google Maps URL
            </label>
            <input
              type="text"
              id="googleMapsUrl"
              name="googleMapsUrl"
              value={formData.googleMapsUrl}
              onChange={onChange}
              className={styles.hotelGeneral__input}
            />
          </div>
          <div className={styles.hotelGeneral__fieldGroup}>
            <label htmlFor="mapEmbedUrl" className={styles.hotelGeneral__label}>
              Google Maps Embed URL
            </label>
            <input
              type="text"
              id="mapEmbedUrl"
              name="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={onChange}
              className={styles.hotelGeneral__input}
            />
          </div>
        </div>
      </section>

      <section className={styles.hotelGeneral__section}>
        <div className={styles.hotelGeneral__fieldGroup}>
          <label htmlFor="pricePerNight" className={styles.hotelGeneral__label}>
            Price per Night (USD)
          </label>
          <input
            type="text"
            id="pricePerNight"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={onChange}
            className={`${styles.hotelGeneral__input} ${styles.hotelGeneral__input__price}`}
          />
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
              value={formData.description}
              onChange={onChange}
              placeholder="Describe the property, location highlights and what makes it special..."
              className={styles.hotelGeneral__textarea}
            />
          </div>
        </div>
      </section>
    </div>
  );
}