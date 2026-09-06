import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { FavouritesBtn } from "../../shared/ui/FavouritesBtn/FavouritesBtn.jsx";
import { useNavigate } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelDetailInfo.module.scss";

export const HotelDetailInfo = (props) => {
  const {
    id,
    name,
    stars,
    price,
    location,
    rating,
    ratingStatus,
    countReviews,
  } = props;

  const navigate = useNavigate();

  const handleBookDetailHotel = (hotelId) => {
    navigate(`/booking-detail-hotel/${hotelId}`);
  };

  return (
    <section className={styles.hotelDetailInfo}>
      <div className={styles.hotelDetailInfo_header}>
        <div className={styles.hotelDetailInfo_header__block}>
          <div className={styles.hotelDetailInfo_header__blocks}>
            <h2 className={styles.hotelDetailInfo_header__blocks__title}>
              {name}
            </h2>
            <div className={styles.hotelDetailInfo_header__blocks__stars}>
              {Array.from({ length: Number(stars) || 0 }).map((_, index) => (
                <svg key={index} width={16} height={16}>
                  <use href={sprite + "#icon-Star"} />
                </svg>
              ))}
              <span>{stars} Star Hotel</span>
            </div>
          </div>
          <h2 className={styles.hotelDetailInfo_header__price}>
            ${price}
            <span>/night</span>
          </h2>
        </div>

        <div className={styles.hotelDetailInfo_location}>
          <svg width="18" height="18">
            <use href={sprite + "#icon-Location"} />
          </svg>
          <span className={styles.hotelDetailInfo_location__span}>
            {location}
          </span>
        </div>

        <div className={styles.hotelDetailInfo_footer}>
          <div className={styles.hotelDetailInfo_footer__rating}>
            <RatingCard value={rating} />
            <span>
              <b>{ratingStatus}</b>
            </span>
            <span>{countReviews} reviews</span>
          </div>
          <div className={styles.hotelDetailInfo_footer__btn}>
            <FavouritesBtn />
            <button className={styles.hotelDetailInfo_footer__btn__btnShare}>
              <svg width="20" height="20">
                <use href={sprite + "#icon-Share"} />
              </svg>
            </button>
            <button
              className={styles.hotelDetailInfo_footer__btn__btnBook}
              onClick={() => handleBookDetailHotel(id)}
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
