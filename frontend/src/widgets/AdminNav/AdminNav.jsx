import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminNav.module.scss";
import { NavLink } from "react-router-dom";

export const AdminNav = () => {
  const adminLinks = [
    { id: 1, image: "icon-Frame", title: "Dashboard", to: "/AdminHome" },
    {
      id: 2,
      image: "icon-Frame1",
      title: "Flight Management",
      to: "/AdminFlight",
    },
    {
      id: 3,
      image: "icon-Frame2",
      title: "Hotel Management"
    },
    { id: 4, image: "icon-Frame3", title: "Users"  },
    { id: 5, image: "icon-Frame4", title: "Bookings" },
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
            <NavLink
              key={item.id}
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
              to={item.to}
            >
              <svg width={20} height={20}>
                <use href={sprite + `#${item.image}`} />
              </svg>

              <p className={styles.itemTitle}>{item.title}</p>
            </NavLink>
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