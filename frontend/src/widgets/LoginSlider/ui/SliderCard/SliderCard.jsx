import styles from "./SliderCard.module.scss";

export const SliderCard = (props) => {
  const { image } = props;
  return (
    <section className={styles.SliderCard}>
      <div
        className={styles.SliderCard_image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </section>
  );
};
