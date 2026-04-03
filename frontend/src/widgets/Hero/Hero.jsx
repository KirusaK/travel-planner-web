import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_container}>
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>
            Stwórz swoją listę marzeń dotyczących podróży, a my zajmiemy się
            resztą
          </h1>
          <p className={styles.hero_text}>
            Oferty specjalne dopasowane do Twojego planu
          </p>
        </div>
      </div>
    </div>
  );
};
