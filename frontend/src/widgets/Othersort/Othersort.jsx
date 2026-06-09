import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./Othersort.module.scss";

export const Othersort = () => {
  const sortOptions = [
    { id: "cheapest", title: "Cheapest", price: "$99", duration: "2h 18m" },
    { id: "best", title: "Best", price: "$99", duration: "2h 18m" },
    { id: "quickest", title: "Quickest", price: "$99", duration: "2h 18m" },
  ];

  return (
    <div>
      <section className={styles.Othersort}>
        {sortOptions.map((item, index) => (
          <button
            key={item.id}
            className={`${styles.Othersort_button} ${index === 0 ? styles.Othersort_button__active : ""}`}
          >
            <div className={styles.Othersort_button__block}>
              <h3 className={styles.Othersort_button__title}>{item.title}</h3>
              <span className={styles.Othersort_button__info}>
                {item.price} . {item.duration}
              </span>
            </div>
          </button>
        ))}
        <button className={styles.Othersort_buttons}>
          <div className={styles.Othersort_buttons__block}>
            <svg width={24} height={24} className={styles.Othersort_icon}>
              <use href={sprite + "#icon-menu"} />
            </svg>
            <span className={styles.Othersort_buttons__span}>Other sort</span>
          </div>
        </button>
      </section>
    </div>
  );
};
