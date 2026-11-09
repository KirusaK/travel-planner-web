import styles from "./Tabs.module.scss";

export const Tabs = ({tabs, active, onChange}) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((item) => (
        <button type="button" key={item.id} className={`${styles.tab} ${active === item.id ? styles.active : ""}`} onClick={() => onChange(item.id)}>
          {item.title}
        </button>
      ))}
    </div>
  );
}