import styles from "./HotelDetailGallery.module.scss";

export const HotelDetailGallery = ({ photos = [] }) => {
  const [main, ...rest] = photos;
  const small = rest.slice(0, 4);

  return (
    <section className={styles.hotelDetailGallery}>
      <div className={styles.hotelDetailGallery_block}>
        <div
          className={styles.hotelDetailGallery_block__homePhoto}
          style={{ backgroundImage: `url(${main})` }}
        ></div>
        {small.length > 0 && (
          <div className={styles.hotelDetailGallery_block__morePhoto}>
            {small.map((src, index) => (
              <div
                key={index}
                className={styles.hotelDetailGallery_block__morePhoto__item}
                style={{ backgroundImage: `url(${src})` }}
              ></div>
            ))}

            <button className={styles.hotelDetailGallery_block__morePhoto__btn}>
              View all photos
            </button>
          </div>
        )}
      </div>
      <hr className={styles.hotelDetailGallery_hr} />
    </section>
  );
};
