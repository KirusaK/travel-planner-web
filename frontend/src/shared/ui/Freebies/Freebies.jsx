import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Freebies.module.scss";

export const Freebies = () => {
  const freebiesData = [
    { id: "freebreakfast", name: "Free Breakfast" },
    { id: "freeparking", name: "Free parking" },
    { id: "freeinternet", name: "Free Internet" },
    { id: "freeairportshuttle", name: "Free airport shuttle" },
    { id: "freecancellation", name: "Free cancellation" },
  ];

  return (
    <div>
      <section className={styles.freebies}>
        <div className={styles.freebies_header}>
          <h3 className={styles.freebies_header__title}>Freebies</h3>
          <button className={styles.freebies_header__btn}>
            <svg
              width={24}
              height={24}
              className={styles.freebies_header__icon}
            >
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>
        <div className={styles.freebies_info}>
          {freebiesData.map((item) => (
            <label key={item.id} className={styles.freebies_info__label}>
              <div className={styles.freebies_info__block}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={styles.freebies_info__input}
                />
                <span className={styles.freebies_info__span}>{item.name}</span>
              </div>
            </label>
          ))}
        </div>

        <hr className={styles.freebies_hr} />
      </section>
    </div>
  );
};
