import { Link } from "react-router-dom";
import styles from "./AdventureSection.module.scss";

export const AdventureSection = ({ hotel, photo }) => {
  if (!hotel) return null;

  return (
    <div className={styles.AdventureSection__container}>
      <div className={styles.AdventureSection}>
        <div className={styles.AdventureSection__header}>
          <div className={styles.AdventureSection__text}>
            <h1 className={styles.AdventureSection__title}>Fall into travel</h1>
            <p className={styles.AdventureSection__p}>
              Looking for a place to stay this season? Whether it's a quiet city
              hotel or a cozy countryside retreat, we've picked a top-rated stay
              to make your next trip comfortable and easy.
            </p>
          </div>
        </div>
        <div className={styles.AdventureSection__backpacking}>
          <div className={styles.AdventureSection__backpacking__block}>
            <div className={styles.AdventureSection__backpacking__info}>
              <h1 className={styles.AdventureSection__backpacking__header}>
                {hotel.name}
              </h1>
              <div className={styles.AdventureSection__backpacking__cena}>
                <p className={styles.AdventureSection__backpacking__par}>
                  From
                </p>
                <span className={styles.AdventureSection__backpacking__span}>
                  ${hotel.pricePerNight}
                </span>
              </div>
            </div>
            <div className={styles.AdventureSection__backpacking__more}>
              <p className={styles.AdventureSection__backpacking__text}>
                {hotel.description}
              </p>
            </div>
            <div className={styles.AdventureSection__backpacking__button}>
              <Link
                to={`/hotel-detail/${hotel.id}`}
                className={styles.AdventureSection__backpacking__link}
              >
                Book Hotel
              </Link>
            </div>
          </div>
          <div className={styles.AdventureSection__backpacking__gallery}>
            {photo.map((image, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${image})` }}
                className={styles.AdventureSection__backpacking__gallery_item}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
