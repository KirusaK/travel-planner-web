import styles from "./Badge.module.scss";

export const Badge = ({ variant = "neutral", children }) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
};