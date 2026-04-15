import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { Link } from "react-router-dom";
import styles from "./StaySearch.module.scss";

export const StaySearch = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper_title}>Where are you flying? </h2>

      <div className={styles.wrapper_container}>
        {/* Поле Enter Destination */}
        <div className={styles.wrapper_from}>
          <div className={styles.wrapper_from_input}>
            <label className={styles.wrapper_from_label}>
              Enter Destination
            </label>
            <input type="text" className={styles.wrapper_from_input_field} />
            <svg width={24} height={24} className={styles.wrapper_from_icon}>
              <use href={sprite + "#icon-ion_bed"}></use>
            </svg>
          </div>
        </div>
        {/* Поле Check In */}
        <div className={styles.wrapper_trip}>
          <div className={styles.wrapper_trip}>
            <label className={styles.wrapper_trip_label}>Check In</label>
            <input type="date" className={styles.wrapper_depart_input_field} />
          </div>
        </div>
        {/* Поле Check Out */}
        <div className={styles.wrapper_depart}>
          <div className={styles.wrapper_depart_input}>
            <label className={styles.wrapper_depart_label}>Check Out</label>
            <input type="date" className={styles.wrapper_depart_input_field} />
          </div>
        </div>
        {/* Поле Rooms & Guests */}
        <div className={styles.wrapper_passengers}>
          <label className={styles.wrapper_passengers_label}>
            Rooms & Guests
          </label>
          <div className={styles.wrapper_passengers_content}>
            <svg
              width={24}
              height={24}
              className={styles.wrapper_passengers_icon_left}
            >
              <use href={sprite + "#icon-User"}></use>
            </svg>
            <span className={styles.wrapper_passengers_content_text}>
              1 room, 2 guests
            </span>
            <svg
              width={24}
              height={24}
              className={styles.wrapper_passengers_icon_right}
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
              <use href={sprite + "#icon-building"}></use>
            </svg>
            <span className={styles.wrapper_submit_text}>Show Places</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
