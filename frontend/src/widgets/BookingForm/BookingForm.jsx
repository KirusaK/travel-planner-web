import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { Link } from "react-router-dom";
import styles from "./BookingForm.module.scss";

export const BookingForm = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper_title}>Where are you flying? </h2>

      <div className={styles.wrapper_container}>
        {/* Поле From-To */}
        <div className={styles.wrapper_from}>
          <div className={styles.wrapper_from_input}>
            <label className={styles.wrapper_from_label}>From - To</label>
            <input type="text" className={styles.wrapper_from_input_field} />
            <svg width={24} height={24} className={styles.wrapper_from_icon}>
              <use href={sprite + "#icon-ion_swap-horizontal"}></use>
            </svg>
          </div>
        </div>
        {/* Поле Trip */}
        <div className={styles.wrapper_trip}>
          <div className={styles.wrapper_trip}>
            <label className={styles.wrapper_trip_label}>Trip</label>
            <div className={styles.wrapper_trip_content}>
              <span className={styles.wrapper_trip_content_one}>Return</span>
              <svg width={24} height={24} className={styles.wrapper_trip_icon}>
                <use href={sprite + "#icon-chevron_down"}></use>
              </svg>
            </div>
          </div>
        </div>
        {/* Поле Depart-Return */}
        <div className={styles.wrapper_depart}>
          <div className={styles.wrapper_depart_input}>
            <label className={styles.wrapper_depart_label}>
              Depart- Return
            </label>
            <input type="date" className={styles.wrapper_depart_input_field} />
          </div>
        </div>
        {/* Поле Passengers - Class */}
        <div className={styles.wrapper_passengers}>
          <label className={styles.wrapper_passengers_label}>
            Passenger - Class
          </label>
          <div className={styles.wrapper_passengers_content}>
            <span className={styles.wrapper_passengers_content_text}>
              1 Passenger, Economy
            </span>
            <svg
              width={24}
              height={24}
              className={styles.wrapper_passengers_icon}
            >
              <use href={sprite + "#icon-chevron_down"}></use>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.wrapper_submit_container}>
        <div className={styles.wrapper_submit}>
          <Link className={styles.wrapper_submit_link} to="/">
            <svg width={16} height={16}>
              <use href={sprite + "#icon-Paper-Plane"}></use>
            </svg>
            <span className={styles.wrapper_submit_text}>Pokaż loty</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
