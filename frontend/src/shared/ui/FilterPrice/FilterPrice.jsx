import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./FilterPrice.module.scss";

export const FilterPrice = () => {
  return (
    <div>
      <h1 className={styles.filter_price_title}>Filters</h1>

      <section className={styles.filter_price}>
        <div className={styles.filter_price_block}>
          <div className={styles.filter_price_block_info}>
            <h3 className={styles.filter_price_block_info_title}>Price</h3>
            <svg
              width="24"
              height="24"
              className={styles.filter_price_block_info_icon}
            >
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </div>
          <input
            type="range"
            min="50"
            max="1200"
            className={styles.filter_price_input}
          />
          <div className={styles.filter_price_block_range}>
            <p className={styles.filter_price_block_range_min}>$50</p>
            <p className={styles.filter_price_block_range_max}>$1200</p>
          </div>
        </div>

        <hr className={styles.filter_price_hr} />
      </section>
    </div>
  );
};
