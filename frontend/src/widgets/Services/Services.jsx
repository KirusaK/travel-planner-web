import { Link } from "react-router-dom";
import { ButtonServices } from "../../shared/ui/ButtonServices/ButtonServices";
import img1 from "../../shared/assets/image/flights.svg";
import img2 from "../../shared/assets/image/hostels.svg";
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
          <Link>
            <ButtonServices />
          </Link>
        </div>
        <div
          className={styles.Services__card}
          style={{ backgroundImage: `url(${img2})` }}
        >
          <h1 className={styles.Services__title}>Hotels</h1>
          <p className={styles.Services__par}>
            Search hotels & Places Hire to our most popular destinations
          </p>
          <Link>
            <ButtonServices />
          </Link>
        </div>
      </div>
    </section>
  );
};
