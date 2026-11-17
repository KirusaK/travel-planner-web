import sprite from "../../../../shared/assets/icons/symbol-defs.svg";
import styles from "./ReviewCard.module.scss";

export const ReviewCard = (props) => {
  const { title, text, rating, authorName } = props;

  return (
    <section className={styles.ReviewCard}>
      <div className={styles.ReviewCard__container}>
        <div className={styles.ReviewCard__card}>
          <h2 className={styles.ReviewCard__title}>{title}</h2>
          <p className={styles.ReviewCard__par}>{text}</p>
          <div className={styles.ReviewCard__rating}>
            {Array(rating)
              .fill(null)
              .map((_, index) => (
                <svg key={index} width={24} height={24}>
                  <use href={sprite + "#icon-ion_star"}></use>
                </svg>
              ))}
          </div>
          <h3 className={styles.ReviewCard__author}>{authorName}</h3>
        </div>
      </div>
    </section>
  );
};
