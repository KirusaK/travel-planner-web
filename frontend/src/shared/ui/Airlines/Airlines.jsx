import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./Airlines.module.scss";

export const Airlines = () => {
  const airlinesData = [
    { id: "emiratd", name: "Emirated" },
    { id: "flydubai", name: "Fly Dubai" },
    { id: "qatar", name: "Qatar" },
    { id: "etihad", name: "Etihad" },
  ];

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
          {airlinesData.map((item) => (
            <label key={item.id} className={styles.Airlines_label}>
              <div className={styles.Airlines_checkbox_block}>
                <input
                  type="checkbox"
                  id={item.id}
                  className={styles.Airlines_checkbox}
                />
                <span className={styles.Airlines_span}>{item.name}</span>
              </div>
            </label>
          ))}
        </div>

        <hr className={styles.Airlines_hr} />
      </section>
    </div>
  );
};
