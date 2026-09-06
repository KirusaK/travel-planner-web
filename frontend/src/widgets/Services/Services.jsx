import { Link } from "react-router-dom";
import img1 from "../../shared/assets/image/flights.svg";
import img2 from "../../shared/assets/image/hostels.svg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./Services.module.scss";

export const Services = () => {
  return (
    <section className={styles.Services}>
      <div className={styles.Services__container}>
        <div
          className={styles.Services__card}
          style={{ backgroundImage: `url(${img1})` }}
        >
          <h1 className={styles.Services__title}>Flights</h1>
          <p className={styles.Services__par}>
            Search Flights & Places Hire to our most popular destinations
          </p>
          <div className={styles.ButtonServices}>
            <Link className={styles.ButtonServices__container} to="/FindFlight">
              <svg width={16} height={16}>
                <use href={sprite + "#icon-airplane"}></use>
              </svg>
              <p className={styles.ButtonServices__par}>SHOW FILGHTS</p>
            </Link>
          </div>
        </div>
        <div
          className={styles.Services__card}
          style={{ backgroundImage: `url(${img2})` }}
        >
          <h1 className={styles.Services__title}>Hotels</h1>
          <p className={styles.Services__par}>
            Search hotels & Places Hire to our most popular destinations
          </p>
          <div className={styles.ButtonServices}>
            <Link className={styles.ButtonServices__container} to="/FindStays">
              <svg width={16} height={16}>
                <use href={sprite + "#icon-airplane"}></use>
              </svg>
              <p className={styles.ButtonServices__par}>SHOW HOTELS</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
