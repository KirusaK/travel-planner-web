import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelDetailLocation.module.scss";

export const HotelDetailLocation = (props) => {
  const { location, googleMapsUrl, mapEmbedUrl } = props;

  return (
    <section className={styles.hotelDetailLocation}>
      <div className={styles.hotelDetailLocation_block}>
        <div className={styles.hotelDetailLocation_block__header}>
          <h2 className={styles.hotelDetailLocation_block__header__title}>
            Location/Map
          </h2>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.hotelDetailLocation_block__header__btn}
          >
            View on google maps
          </a>
        </div>

        <div className={styles.hotelDetailLocation_block__map}>
          <iframe
            title="Hotel Location Map"
            src={mapEmbedUrl}
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: 16 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className={styles.hotelDetailLocation_block__footer}>
          <svg width={18} height={18}>
            <use href={sprite + "#icon-Location"} />
          </svg>
          <p className={styles.hotelDetailLocation_block__footer__par}>
            {location}
          </p>
        </div>

        <hr className={styles.hotelDetailLocation_block__hr} />
      </div>
    </section>
  );
};
