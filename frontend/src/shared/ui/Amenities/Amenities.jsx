import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Amenities.module.scss";

export const Amenities = () => {
  const amenitiesData = [
    { id: "24hrfrontdesk", name: "24hr front desk" },
    { id: "airconditioned", name: "Air-conditioned" },
    { id: "fitness", name: "Fitness" },
    { id: "pool", name: "Pool" },
  ];

  return (
    <div>
      <section className={styles.amenities}>
        <div className={styles.amenities_header}>
          <h3 className={styles.amenities_header__title}>Amenities</h3>
          <button className={styles.amenities_header__btn}>
            <svg
              width={24}
              height={24}
              className={styles.amenities_header__icon}
            >
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>
        <div className={styles.amenities_info}>
          {amenitiesData.map((item) => (
            <label key={item.id} className={styles.amenities_info__label}>
              <div className={styles.amenities_info__block}>
                <input
                  id={item.id}
                  type="checkbox"
                  className={styles.amenities_info__input}
                />
                <sapn className={styles.amenities_info__span}>{item.name}</sapn>
              </div>
            </label>
          ))}
        </div>
        <button type="button" className={styles.amenities_btn}>
          +24 more
        </button>
      </section>
    </div>
  );
};
