import { Link } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <section className={styles.Footer}>
      <div className={styles.Footer__container}>
        <div className={styles.Footer__icons}>
          <div className={styles.Footer__logo}>
            <svg width={120} height={39}>
              <use href={sprite + "#icon-logo"}></use>
            </svg>
          </div>
          <div className={styles.Footer__media}>
            <svg width={20} height={20}>
              <use href={sprite + "#icon-akar-icons_facebook-fill"}></use>
            </svg>
            <svg width={20} height={20}>
              <use href={sprite + "#icon-akar-icons_twitter-fill"}></use>
            </svg>
            <svg width={20} height={20}>
              <use href={sprite + "#icon-akar-icons_youtube-fill"}></use>
            </svg>
            <svg width={20} height={20}>
              <use href={sprite + "#icon-ant-design_instagram-filled"}></use>
            </svg>
          </div>
        </div>
        <div className={styles.Footer__links}>
          <div className={styles.Footer__destinations}>
            <h2 className={styles.Footer__title}>Our Destinations</h2>
            <div className={styles.Footer__info}>
              <Link to="/">Canada</Link>
              <Link to="/">Alaksa</Link>
              <Link to="/">France</Link>
              <Link to="/">Iceland</Link>
            </div>
          </div>
          <div className={styles.Footer__activities}>
            <h2 className={styles.Footer__title}>Our Activities</h2>
            <div className={styles.Footer__info}>
              <Link to="/">Northern Lights</Link>
              <Link to="/">Cruising & sailing</Link>
              <Link to="/">Multi-activities</Link>
              <Link to="/">Kayaing</Link>
            </div>
          </div>
          <div className={styles.Footer__blogs}>
            <h2 className={styles.Footer__title}>Travel Blogs</h2>
            <div className={styles.Footer__info}>
              <Link to="/">Bali Travel Guide</Link>
              <Link to="/">Sri Lanks Travel Guide</Link>
              <Link to="/">Peru Travel Guide</Link>
              <Link to="/">Bali Travel Guide</Link>
            </div>
          </div>
          <div className={styles.Footer__about}>
            <h2 className={styles.Footer__title}>About Us</h2>
            <div className={styles.Footer__info}>
              <Link to="/">Our Story</Link>
              <Link to="/">Work with us</Link>
            </div>
          </div>
          <div className={styles.Footer__contact}>
            <h2 className={styles.Footer__title}>Contact Us</h2>
            <div className={styles.Footer__info}>
              <Link to="/">Our Story</Link>
              <Link to="/">Work with us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
