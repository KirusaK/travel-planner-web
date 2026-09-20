import { Link, NavLink, useLocation } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import defaultAvatar from "../../shared/assets/image/Ellipse 1.jpg";
import styles from "./Header.module.scss";
import { useState } from "react";
import { MyAccountModal } from "../MyAccountModal/MyAccountModal.jsx";

export const Header = ({ isTransparent, hasShadow }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((prev) => !prev);
  const handleModalClose = () => setModalOpen(false);

  const isFlightActive =
    location.pathname === "/FindFlight" ||
    location.pathname === "/FlightsPage" ||
    location.pathname.includes("/flight-detail");

  const isHotelActive =
    location.pathname === "/HotelPage" ||
    location.pathname === "/FindStays" ||
    location.pathname.includes("/hotel-detail");

  const isFavouriteActive =
    location.pathname === "/Favourites";

  console.log("Current user in Header:", user);

  return (
    <section>
      <div
        className={`${styles.header} ${isTransparent ? styles.transparent : ""} ${hasShadow ? styles.with_shadow : ""}`}
      >
        <div className={styles.header_links}>
          <NavLink
            to="/FindFlight"
            className={
              isFlightActive
                ? `${styles.header_link} ${styles.active}`
                : styles.header_link
            }
          >
            <svg width={24} height={24}>
              <use href={sprite + "#icon-airplane"}></use>
            </svg>
            <span className={styles.header_link_text}>Find Flight</span>
          </NavLink>
          <NavLink
            to="/FindStays"
            className={
              isHotelActive
                ? `${styles.header_link} ${styles.active}`
                : styles.header_link
            }
          >
            <svg width={24} height={24}>
              <use href={sprite + "#icon-ion_bed"}></use>
            </svg>
            <span className={styles.header_link_text}>Find Stays</span>
          </NavLink>
        </div>
        <div className={styles.header_logo}>
          <Link to="/">
            <svg width={110} height={36}>
              <use href={sprite + "#icon-Logo"}></use>
            </svg>
          </Link>
        </div>
        {user ? (
          <div className={styles.header_user_menu}>
            <Link
              to="/Favourites"
              className={
                isFavouriteActive
                  ? `${styles.header_favourites} ${styles.active}`
                  : styles.header_favourites
              }
            >
              <svg width={24} height={24}>
                <use href={sprite + "#icon-heart"} />
              </svg>

              <span>Favorites</span>
            </Link>

            <div className={styles.header_divider}>|</div>

            <button className={styles.header_profile} onClick={toggleModal}>
              <img
                src={defaultAvatar}
                alt="User Avatar"
                className={styles.header_avatar}
              />

              <span>
                {user.firstName || user.lastName}{" "}
                {user.firstName?.[0] || user.lastName?.[0]}.
              </span>
            </button>
          </div>
        ) : (
          <div className={styles.header_button}>
            <Link to="/Login" className={styles.header_button_text1}>
              Login
            </Link>
            <Link
              to="/SignUp"
              className={`${styles.header_button_text2} ${styles.header_button_decoration}`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <MyAccountModal isOpen={isModalOpen} onClose={handleModalClose} onLogout={() => {logout(); handleModalClose();}}/>
    </section>
  );
};
