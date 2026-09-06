import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={styles.Hero}>
      <div className={styles.Hero__container}>
        <div className={styles.Hero__info}>
          <h2 className={styles.Hero__text}>Helping Others</h2>
          <h1 className={styles.Hero__title}>LIVE & TRAVEL</h1>
          <p className={styles.Hero__par}>Special offers to suit your plan</p>
        </div>
      </div>
    </section>
  );
};
