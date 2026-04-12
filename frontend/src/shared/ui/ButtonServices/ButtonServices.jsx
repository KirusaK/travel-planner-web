import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./ButtonServices.module.scss";

export const ButtonServices = () => {
  return (
    <section className={styles.ButtonServices}>
      <div className={styles.ButtonServices__container}>
        <svg width={16} height={16}>
          <use href={sprite + "#icon-airplane"}></use>
        </svg>
        <p className={styles.ButtonServices__par}>SHOW FILGHTS</p>
      </div>
    </section>
  );
};
