import { useState } from "react";
import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./FilterPrice.module.scss";

export const FilterPrice = ({ value, onChange, min = 50, max = 1200 }) => {
  const [inner, setInner] = useState(max);
  const current = value ?? inner;

  const handleChange = (e) => {
    const v = Number(e.target.value);
    setInner(v);
    onChange?.(v);
  };
  return (
    <div>
      <h1 className={styles.filter_price_title}>Filters</h1>

      <section className={styles.filter_price}>
        <div className={styles.filter_price_block}>
          <div className={styles.filter_price_block_info}>
            <h3 className={styles.filter_price_block_info_title}>Price</h3>
            <button className={styles.filter_price_block_info_button}>
              <svg
                width="24"
                height="24"
                className={styles.filter_price_block_info_icon}
              >
                <use href={sprite + "#icon-chevron_down"} />
              </svg>
            </button>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={current}
            onChange={handleChange}
            className={styles.filter_price_input}
          />
          <div className={styles.filter_price_block_range}>
            <p className={styles.filter_price_block_range_min}>${min}</p>
            <p className={styles.filter_price_block_range_max}>${current}</p>
          </div>
        </div>

        <hr className={styles.filter_price_hr} />
      </section>
    </div>
  );
};
