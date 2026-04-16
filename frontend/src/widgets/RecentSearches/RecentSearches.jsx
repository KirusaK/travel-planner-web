import styles from "./RecentSearches.module.scss";

export const RecentSearches = () => {
  return (
    <section className={styles.RecentSearches}>
      <div className={styles.RecentSearches__container}>
        <h1 className={styles.RecentSearches__title}>Your recent searches</h1>
        <div className={styles.RecentSearches__card}>
          <div className={styles.RecentSearches__cards}>
            <div className={styles.RecentSearches__photo1}></div>
            <div className={styles.RecentSearches__grup}>
              <h3 className={styles.RecentSearches__text}>Istanbul, Turkey</h3>
              <p className={styles.RecentSearches__par}>325 places</p>
            </div>
          </div>
          <div className={styles.RecentSearches__cards}>
            <div className={styles.RecentSearches__photo2}></div>
            <div className={styles.RecentSearches__grup}>
              <h3 className={styles.RecentSearches__text}>Sydney, Australia</h3>
              <p className={styles.RecentSearches__par}>325 places</p>
            </div>
          </div>
          <div className={styles.RecentSearches__cards}>
            <div className={styles.RecentSearches__photo3}></div>
            <div className={styles.RecentSearches__grup}>
              <h3 className={styles.RecentSearches__text}>Baku, Azerbaijan</h3>
              <p className={styles.RecentSearches__par}>325 places</p>
            </div>
          </div>
          <div className={styles.RecentSearches__cards}>
            <div className={styles.RecentSearches__photo4}></div>
            <div className={styles.RecentSearches__grup}>
              <h3 className={styles.RecentSearches__text}>Malé, Maldives</h3>
              <p className={styles.RecentSearches__par}>325 places</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
