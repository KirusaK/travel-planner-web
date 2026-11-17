import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

export const Card = ({ hotel }) => {
  return (
    <div
      className={styles.Card}
      style={{ backgroundImage: `url(${hotel.image})` }}
    >
      <div className={styles.Card__content}>
        <div className={styles.Card__info}>
          <div className={styles.Card__text}>
            <h3 className={styles.Card__title}>{hotel.name}</h3>
            <p className={styles.Card__par}>{hotel.city}</p>
          </div>
          <span className={styles.Card__price}>${hotel.price}</span>
        </div>
        <Link to={hotel.to ?? "/"} className={styles.Card__button}>
          Book Flight
        </Link>
      </div>
    </div>
  );
};
