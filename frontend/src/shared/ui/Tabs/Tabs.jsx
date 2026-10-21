import styles from "./Tabs.module.scss";

export const Tabs = ({tabs}) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((item) => (
        <button type="button" key={item.id} className={styles.tab}>
          {item.title}
        </button>
      ))}
    </div>
  );
}