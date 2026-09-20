import defaultAvatar from "../../shared/assets/image/Ellipse 1.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./MyAccountModal.module.scss";


export const MyAccountModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <section className={styles.myAccountModal}>
      <div className={styles.myAccountModal_overlay} onClick={onClose}>
        <div
          className={styles.myAccountModal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.myAccountModal_user}>
            <img
              src={defaultAvatar}
              alt="User Avatar"
              className={styles.myAccountModal_avatar}
            />

            <span className={styles.myAccountModal_name}>
              {user.firstName || user.lastName}{" "}
              {user.firstName?.[0] || user.lastName?.[0]}.
            </span>
          </div>

          <hr className={styles.myAccountModal_divider} />

          <Link className={styles.myAccountModal_item__account}>
            <div className={styles.myAccountModal_item__account__user}>
              <svg
                width={18}
                height={18}
                className={styles.myAccountModal_icon}
              >
                <use href={sprite + "#icon-User"} />
              </svg>

              <p className={styles.myAccountModal_text}>My account</p>
            </div>

            <svg
              width={16}
              height={16}
              className={styles.myAccountModal_chevron}
            >
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </Link>

          <hr className={styles.myAccountModal_divider} />

          <button className={styles.myAccountModal_item__logout}>
            <svg width={18} height={18} className={styles.myAccountModal_icon}>
              <use href={sprite + "#icon-Logout"} />
            </svg>

            <p className={styles.myAccountModal_text}>Logout</p>
          </button>
        </div>
      </div>
    </section>
  );
};
