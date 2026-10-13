import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminNav.module.scss";
import { Link } from "react-router-dom";

export const AdminNav = () => {
  const adminLinks = [
    { image: "icon-Frame", title: "Dashboard" },
    { image: "icon-Frame1", title: "Flight Management" },
    { image: "icon-Frame2", title: "Hotel Management" },
    { image: "icon-Frame3", title: "Users" },
    { image: "icon-Frame4", title: "Bookings" },
  ];

  return (
    <div className={styles.nav}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <svg width={36} height={36}>
            <use href={sprite + "#icon-spanflex"} />
          </svg>

          <span className={styles.logoText}>golobe</span>
        </div>

        <nav className={styles.menu}>
          <p className={styles.menuTitle}>Menu</p>

          {adminLinks.map((item) => (
            <Link key={item.id} className={styles.item}>
              <svg width={20} height={20}>
                <use href={sprite + `#${item.image}`} />
              </svg>

              <p className={styles.itemTitle}>{item.title}</p>
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <button className={styles.signOut}>
          <svg width={16} height={16}>
            <use href={sprite + "#icon-Frame5"} />
          </svg>
          Sing out
        </button>
      </div>
    </div>
  );
};