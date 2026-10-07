import styles from "./ProfileTabs.module.scss";

export const ProfileTabs = ({ activeTab, onTabChange }) => {
  return (
    <nav className={styles.tabs}>
      <button
        className={`${styles.tabs__item} ${
          activeTab === "account" ? styles.tabs__itemActive : ""
        }`}
        onClick={() => onTabChange("account")}
      >
        Account
      </button>

      <button
        className={`${styles.tabs__item} ${
          activeTab === "history" ? styles.tabs__itemActive : ""
        }`}
        onClick={() => onTabChange("history")}
      >
        History
      </button>

      <button
        className={`${styles.tabs__item} ${
          activeTab === "payment" ? styles.tabs__itemActive : ""
        }`}
        onClick={() => onTabChange("payment")}
      >
        Payment methods
      </button>
    </nav>
  );
};
