import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

export const Card = (props) => {
  const { title, par, price, image } = props;

  return (
    <div className={styles.Card} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.Card__content}>
        <div className={styles.Card__info}>
          <div className={styles.Card__text}>
            <h3 className={styles.Card__title}>{title}</h3>
            <p className={styles.Card__par}>{par}</p>
          </div>
          <span className={styles.Card__price}>${price}</span>
        </div>
        <Link to="/" className={styles.Card__button}>
          Book Flight
        </Link>
      </div>
    </div>
  );
};
