import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./ButtonEdit.module.scss";

export const ButtonEdit = ({onClick}) => {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onClick}
    >
      <svg width={16} height={16}>
        <use href={sprite + "#icon-Frame8"} />
      </svg>
    </button>
  );
};