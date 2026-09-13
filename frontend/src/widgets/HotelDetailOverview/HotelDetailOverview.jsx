import styles from "./HotelDetailOverview.module.scss";
import sprite from "../../shared/assets/icons/symbol-defs.svg";

export const HotelDetailOverview = (props) => {
  const { description, rating, ratingStatus, countReviews, features } = props;

  return (
    <section className={styles.hotelDetailOverview}>
      <div className={styles.hotelDetailOverview_info}>
        <h2 className={styles.hotelDetailOverview_info__title}>Overview</h2>
        <p className={styles.hotelDetailOverview_info__text}>{description}</p>
      </div>

      <div className={styles.hotelDetailOverview_highlights}>
        <div className={styles.hotelDetailOverview_highlights__block}>
          <h2 className={styles.hotelDetailOverview_highlights__fix__title}>
            {rating}
          </h2>
          <div className={styles.hotelDetailOverview_highlights__fix__info}>
            <p className={styles.hotelDetailOverview_highlights__fix__status}>
              <b>{ratingStatus}</b>
            </p>
            <p className={styles.hotelDetailOverview_highlights__fix__reviews}>
              {countReviews} reviews
            </p>
          </div>
        </div>

        {features.map((item, index) => (
          <div
            key={index}
            className={styles.hotelDetailOverview_highlights__other}
          >
            <svg width={32} height={32}>
              <use href={sprite + "#icon-Stars"} />
            </svg>

            <h3 className={styles.hotelDetailOverview_highlights__other__item}>
              {item}
            </h3>
          </div>
        ))}
      </div>

      <hr className={styles.hotelDetailOverview_hr} />
    </section>
  );
};
