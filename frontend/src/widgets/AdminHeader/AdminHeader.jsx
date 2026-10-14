import logo from "../../shared/assets/image/spanrelative.jpg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminHeader.module.scss";

export const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <button className={styles.header__profile} type="button">
        <img className={styles.header__avatar} src={logo} alt="logo" />

        <div className={styles.header__info}>
          <h3 className={styles.header__name}>John D.</h3>
          <span className={styles.header__role}>Admin</span>
        </div>

        <svg width={16} height={16} className={styles.header__arrow}>
          <use href={sprite + "#icon-chevron_down"} />
        </svg>
      </button>
    </header>
  );
};