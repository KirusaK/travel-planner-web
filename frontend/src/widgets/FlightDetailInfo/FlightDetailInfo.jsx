import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { FavouritesBtn } from "../../shared/ui/FavouritesBtn/FavouritesBtn.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightDetailInfo.module.scss";

export const FlightDetailInfo = () => {
  return (
    <div className={styles.FlightDetailInfo}>
      <section className={styles.FlightDetailInfo_container}>
        <div className={styles.FlightDetailInfo_block__info}>
          <h2 className={styles.FlightDetailInfo_info_title}>
            Emirates A380 Airbus
          </h2>
          <div className={styles.FlightDetailInfo_info_location}>
            <svg width="18" height="18">
              <use href={sprite + "#icon-Location"} />
            </svg>
            <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
          </div>
          <div className={styles.FlightDetailInfo_info_rating}>
            <RatingCard />
            <p>
              <b>Very Good</b> 54 reviews
            </p>
          </div>
        </div>
        <div className={styles.FlightDetailInfo_block__price}>
          <h2 className={styles.FlightDetailInfo_price_title}>$240</h2>
          <div className={styles.FlightDetailInfo_price_blockBtn}>
            <FavouritesBtn />
            <button className={styles.FlightDetailInfo_price_btnShare}>
              <svg width="20" height="20">
                <use href={sprite + "#icon-Share"} />
              </svg>
            </button>
            <button className={styles.FlightDetailInfo_price_btnBook}>
              Book now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
