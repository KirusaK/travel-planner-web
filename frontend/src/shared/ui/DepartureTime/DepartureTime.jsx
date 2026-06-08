import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./DepartureTime.module.scss";

export const DepartureTime = () => {
  return (
    <div>
      <section>
        <div className={styles.DepartureTime_block}>
          <h3 className={styles.DepartureTime_title}>Departure Time</h3>
          <svg width="24" height="24" className={styles.DepartureTime_icon}>
            <use href={sprite + "#icon-chevron_down"} />
          </svg>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          className={styles.DepartureTime_input}
        />
        <div className={styles.DepartureTime_range}>
          <p className={styles.DepartureTime_time}>12:01Am</p>
          <p className={styles.DepartureTime_time}>11:56Pm</p>
        </div>

        <hr className={styles.DepartureTime_hr} />
      </section>
    </div>
  );
};
