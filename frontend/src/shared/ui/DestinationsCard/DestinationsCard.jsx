import styles from "./DestinationsCard.module.scss";

export const DestinationsCard = (props) => {
  const { city, country, img } = props;

  return (
    <section className={styles.DestinationsCard}>
      <div className={styles.DestinationsCard__container}>
        <div
          className={styles.DestinationsCard__img}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className={styles.DestinationsCard__info}>
          <h1 className={styles.DestinationsCard__title}>
            {city}, {country}
          </h1>
          <p className={styles.DestinationsCard__par}>
            Flights <span className={styles.DestinationsCard__span}>.</span>{" "}
            Hotels <span className={styles.DestinationsCard__span}>.</span>{" "}
            Resorts
          </p>
        </div>
      </div>
    </section>
  );
};
