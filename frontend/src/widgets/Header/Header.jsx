import { Link, NavLink } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_links}>
        <NavLink
          to="/FindFlight"
          className={({ isActive }) =>
            isActive
              ? `${styles.header_link} ${styles.active}`
              : styles.header_link
          }
        >
          <svg width={24} height={24}>
            <use href={sprite + "#icon-airplane"}></use>
          </svg>
          <span className={styles.header_link_text}>Znajdź lot</span>
        </NavLink>
        <NavLink
          to="/FindStays"
          className={({ isActive }) =>
            isActive
              ? `${styles.header_link} ${styles.active}`
              : styles.header_link
          }
        >
          <svg width={24} height={24}>
            <use href={sprite + "#icon-ion_bed"}></use>
          </svg>
          <span className={styles.header_link_text}>Znajdź noclegi</span>
        </NavLink>
      </div>
      <div className={styles.header_logo}>
        <a href="/">
          <svg width={110} height={36}>
            <use href={sprite + "#icon-Logo"}></use>
          </svg>
        </a>
      </div>
      <div className={styles.header_button}>
        <Link to="/" className={styles.header_button_text1}>
          Login
        </Link>
        <Link
          to="/"
          className={`${styles.header_button_text2} ${styles.header_button_decoration}`}
        >
          Sing Up
        </Link>
      </div>
    </div>
  );
};
