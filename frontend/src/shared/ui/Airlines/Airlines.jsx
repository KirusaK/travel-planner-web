import { useState } from "react";
import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Airlines.module.scss";

const AIRLINES_LIST = ["Emirated", "Fly Dubai", "Qatar", "Etihad"];

export const Airlines = ({ options = AIRLINES_LIST, value, onChange }) => {
  const [inner, setInner] = useState(value ?? []);
  const current = value ?? inner;

  const toggle = (name) => {
    const newSelection = current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name];
    setInner(newSelection);
    onChange?.(newSelection);
  };

  return (
    <div>
      <section className={styles.Airlines}>
        <div className={styles.Airlines_block}>
          <h3 className={styles.Airlines_title}>Airlines</h3>
          <button className={styles.Airlines_group_button}>
            <svg width="24" height="24" className={styles.Airlines_icon}>
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>
        <div className={styles.Airlines_buttons}>
          {options.map((name) => (
            <label key={name} className={styles.Airlines_label}>
              <div className={styles.Airlines_checkbox_block}>
                <input
                  type="checkbox"
                  checked={current.includes(name)}
                  onChange={() => toggle(name)}
                  className={styles.Airlines_checkbox}
                />
                <span className={styles.Airlines_span}>{name}</span>
              </div>
            </label>
          ))}
        </div>

        <hr className={styles.Airlines_hr} />
      </section>
    </div>
  );
};
