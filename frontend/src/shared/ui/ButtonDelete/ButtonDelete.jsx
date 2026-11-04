import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./ButtonDelete.module.scss";

export const ButtonDelete = ({onClick}) => {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
    >
      <svg width={16} height={16}>
        <use href={sprite + "#icon-Frame9"} />
      </svg>
    </button>
  );
}