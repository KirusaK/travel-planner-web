import { SeeAll } from "../../shared/ui/ButtonSeeAll/SeeAll";
import { Link } from "react-router-dom";
import img1 from "../../shared/assets/image/Rectangle8.svg";
import img2 from "../../shared/assets/image/Rectangle9.svg";
import img3 from "../../shared/assets/image/Rectangle10.svg";
import img4 from "../../shared/assets/image/Rectangle11.svg";
import styles from "./AdventureSection.module.scss";

export const AdventureSection = () => {
  const galleryImages = [img1, img2, img3, img4];
  return (
    <div className={styles.AdventureSection__container}>
      <div className={styles.AdventureSection}>
        <div className={styles.AdventureSection__header}>
          <div className={styles.AdventureSection__text}>
            <h1 className={styles.AdventureSection__title}>Fall into travel</h1>
            <p className={styles.AdventureSection__p}>
              Going somewhere to celebrate this season? Whether you’re going
              home or somewhere to roam, we’ve got the travel tools to get you
              to your destination.
            </p>
          </div>
          <SeeAll />
        </div>
        <div className={styles.AdventureSection__backpacking}>
          <div className={styles.AdventureSection__backpacking__block}>
            <div className={styles.AdventureSection__backpacking__info}>
              <h1 className={styles.AdventureSection__backpacking__header}>
                Backpacking Sri Lanka
              </h1>
              <div className={styles.AdventureSection__backpacking__cena}>
                <p className={styles.AdventureSection__backpacking__par}>
                  From
                </p>
                <span className={styles.AdventureSection__backpacking__span}>
                  $700
                </span>
              </div>
            </div>
            <div className={styles.AdventureSection__backpacking__more}>
              <p className={styles.AdventureSection__backpacking__text}>
                Traveling is a unique experience as it's the best way to unplug
                from the pushes and pulls of daily life. It helps us to forget
                about our problems, frustrations, and fears at home. During our
                journey, we experience life in different ways. We explore new
                places, cultures, cuisines, traditions, and ways of living.
              </p>
            </div>
            <div className={styles.AdventureSection__backpacking__button}>
              <Link
                to="/"
                className={styles.AdventureSection__backpacking__link}
              >
                Book Flight
              </Link>
            </div>
          </div>
          <div className={styles.AdventureSection__backpacking__gallery}>
            {galleryImages.map((image, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${image})` }}
                className={styles.AdventureSection__backpacking__gallery_item}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
