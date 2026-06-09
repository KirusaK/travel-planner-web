import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Rating.module.scss";

export const Rating = () => {
  return (
    <div>
      <section className={styles.Rating}>
        <div className={styles.Rating_block}>
          <h3 className={styles.Rating_title}>Rating</h3>
          <button className={styles.Rating_group_button}>
            <svg width="24" height="24" className={styles.Rating_icon}>
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>
        <div className={styles.Rating_buttons}>
          <button className={styles.Rating_button}>0+</button>
          <button className={styles.Rating_button}>1+</button>
          <button className={styles.Rating_button}>2+</button>
          <button className={styles.Rating_button}>3+</button>
          <button className={styles.Rating_button}>4+</button>
        </div>

        <hr className={styles.Rating_hr} />
      </section>
    </div>
  );
};
