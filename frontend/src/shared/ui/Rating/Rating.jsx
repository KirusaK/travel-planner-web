import { useState } from "react";
import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Rating.module.scss";

const OPTIONS = [0, 1, 2, 3, 4];

export const Rating = ({ value, onChange }) => {
  const [inner, setInner] = useState(value ?? 0);
  const current = value ?? inner;

  const select = (n) => {
    setInner(n);
    onChange?.(n);
  };

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
          {OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => select(n)}
              className={`&{styles.Rating_button} ${current === n ? styles.Rating_button_active : ""}`}
            >
              {n}+
            </button>
          ))}
        </div>

        <hr className={styles.Rating_hr} />
      </section>
    </div>
  );
};
