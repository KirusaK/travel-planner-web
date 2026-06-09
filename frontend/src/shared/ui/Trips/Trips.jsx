import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Trips.module.scss";

export const Trips = () => {
  const tripsData = [
    { id: "roundtrip", name: "Round Trip" },
    { id: "onway", name: "On Way" },
    { id: "multiCity", name: "Multi-City" },
    { id: "mydatesareflexible", name: "My Dates Are Flexible" },
  ];

  return (
    <div>
      <section className={styles.Trips}>
        <div className={styles.Trips_block}>
          <h3 className={styles.Trips_title}>Trips</h3>
          <button className={styles.Trips_group_button}>
            <svg width="24" height="24" className={styles.Trips_icon}>
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>
        <div className={styles.Trips_buttons}>
          {tripsData.map((item) => (
            <label key={item.id} className={styles.Trips_label}>
              <div className={styles.Trips_checkbox_block}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={styles.Trips_checkbox}
                />
                <span className={styles.Trips_checkbox_span}>{item.name}</span>
              </div>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};
