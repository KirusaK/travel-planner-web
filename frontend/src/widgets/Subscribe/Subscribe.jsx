import styles from "./Subscribe.module.scss";

export const Subscribe = () => {
  return (
    <section className={styles.Subscribe}>
      <div>
        <div className={styles.Subscribe__container}>
          <div className={styles.Subscribe__info}>
            <h1 className={styles.Subscribe__title}>Subscribe Newsletter</h1>
            <h3 className={styles.Subscribe__text}>The Travel</h3>
            <p className={styles.Subscribe__par}>
              Get inspired! Receive travel discounts, tips and behind the scenes
              stories.
            </p>
            <div className={styles.Subscribe__gmail}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.Subscribe__input}
              />
              <button className={styles.Subscribe__button}>Subscribe</button>
            </div>
          </div>
          <div className={styles.Subscribe__mailbox}></div>
        </div>
      </div>
    </section>
  );
};
