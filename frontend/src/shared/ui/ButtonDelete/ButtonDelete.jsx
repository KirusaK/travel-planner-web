import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./ButtonDelete.module.scss";

export const ButtonDelete = () => {
  return (
    <button
      type="button"
      className={styles.btn}
    >
      <svg width={16} height={16}>
        <use href={sprite + "#icon-Frame9"} />
      </svg>
    </button>
  );
}