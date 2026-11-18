import { Link } from "react-router-dom";
import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./Card.module.scss";
import { getStars } from "../../lib/format.js";

export const Card = ({ data }) => {
  const stars = getStars(data.info) || 0;

  return (
    <div
      className={styles.Card}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className={styles.Card__content}>
        <div className={styles.Card__info}>
          <div className={styles.Card__text}>
            <h3 className={styles.Card__title}>{data.name}</h3>
            <div className={styles.Card__par}>
              {Array.from({ length: stars }).map((_, index) => (
                <div key={index}>
                  <svg width={30} height={30}>
                    <use href={sprite + "#icon-ion_star"} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <span className={styles.Card__price}>${data.price}</span>
        </div>
        <Link to={data.to ?? "/"} className={styles.Card__button}>
          Book Now
        </Link>
      </div>
    </div>
  );
};
