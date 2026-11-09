import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./ButtonNewAdd.module.scss";

export const ButtonNewAdd = ({onClick, title}) => {
    return (
        <button
            className={styles.btn}
            onClick={onClick}
        >
            <svg width={16} height={16}>
                <use href={sprite + "#icon-Frame7"} />
            </svg>
            {title}
        </button>
    )
}