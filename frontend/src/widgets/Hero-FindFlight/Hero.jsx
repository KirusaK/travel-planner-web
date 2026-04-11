import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_container}>
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>
            Make your travel whishlist, we`ll do the rest
          </h1>
          <p className={styles.hero_text}>Special offers to suit your plan</p>
        </div>
      </div>
    </div>
  );
};
