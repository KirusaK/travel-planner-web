import logo from "../../shared/assets/image/spanrelative.jpg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminHeader.module.scss";
import {useAuth} from "../../shared/context/AuthContext.jsx";

export const AdminHeader = () => {
  const {user} = useAuth();

  return (
    <header className={styles.header}>
      <button className={styles.header__profile} type="button">
        <div className={styles.header__avatar}>
          {user?.firstName[0]} {user?.lastName[0]}

          <div className={styles.header__circle}></div>
        </div>

        <div className={styles.header__info}>
          <h3 className={styles.header__name}> {user?.firstName} {user?.lastName[0]}.</h3>
          <span className={styles.header__role}>{user?.role}</span>
        </div>

        <svg width={16} height={16} className={styles.header__arrow}>
          <use href={sprite + "#icon-chevron_down"} />
        </svg>
      </button>
    </header>
  );
};