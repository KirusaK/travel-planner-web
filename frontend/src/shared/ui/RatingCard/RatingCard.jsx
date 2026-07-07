import styles from "./RatingCard.module.scss";

export const RatingCard = ({ value }) => {
  return <span className={styles.RatingCard}>{value}</span>;
};
