import sprite from "../../../../shared/assets/icons/symbol-defs.svg";
import styles from "./ReviewCard.module.scss";

export const ReviewCard = (props) => {
  const { title, par, rating, authorname, location, photo } = props;

  return (
    <section className={styles.ReviewCard}>
      <div className={styles.ReviewCard__container}>
        <div className={styles.ReviewCard__card}>
          <h2 className={styles.ReviewCard__title}>{title}</h2>
          <p className={styles.ReviewCard__par}>{par}</p>
          <div className={styles.ReviewCard__button}>
            <button className={styles.ReviewCard__btn}>View more</button>
          </div>
          <div className={styles.ReviewCard__rating}>
            {Array(rating)
              .fill(null)
              .map((_, index) => (
                <svg width={24} height={24}>
                  <use href={sprite + "#icon-ion_star"}></use>
                </svg>
              ))}
          </div>
          <h3 className={styles.ReviewCard__author}>{authorname}</h3>
          <p className={styles.ReviewCard__location}>{location}</p>
          <div className={styles.ReviewCard__google}>
            <svg width={24} height={24}>
              <use href={sprite + "#icon-google"}></use>
            </svg>
            <p>Google</p>
          </div>
          <div className={styles.ReviewCard__ggg}>
            <div
              className={styles.ReviewCard__photo}
              style={{ backgroundImage: `url(${photo})` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
