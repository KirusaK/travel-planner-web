import { useNavigate } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { FavouritesBtn } from "../../shared/ui/FavouritesBtn/FavouritesBtn.jsx";
import styles from "./HotelCard.module.scss";
import { getRatingStatus, getStars } from "../../shared/lib/format.js";

export const HotelCard = ({item}) => {
  const navigate = useNavigate();

  if (!item) return null;

  const stars = getStars(item.rating);

  const handleViewDeals = (hotelId) => {
    navigate(`/hotel-detail/${hotelId}`);
  };

  return (
    <article className={styles.hotelCard}>
      <div className={styles.hotelCard_imageWrapper}>
        {item.cover ? (
          <img
            src={item.cover}
            alt={item.name}
            className={styles.hotelCard_image}
          />
        ) : (
          <div className={styles.hotelCard_notLogo}>{item.name[0]}</div>
        )}
      </div>

      <div className={styles.hotelCard_content}>
        <div className={styles.hotelCard_mainRow}>
          <h2 className={styles.hotelCard_title}>{item.name}</h2>

          <div className={styles.hotelCard_priceBlock}>
            <p className={styles.hotelCard_priceLabel}>starting from</p>
            <span className={styles.hotelCard_priceValue}>
              ${item.pricePerNight}/night
            </span>
            <p className={styles.hotelCard_priceTax}>excl. tax</p>
          </div>
        </div>

        <div className={styles.hotelCard_locationRow}>
          <svg width={16} height={16} className={styles.hotelCard_locationIcon}>
            <use href={sprite + "#icon-Location"} />
          </svg>
          <span className={styles.hotelCard_locationText}>{item.address}</span>
        </div>

        <div className={styles.hotelCard_infoRow}>
          <div className={styles.hotelCard_infoRow__stars}>
            {Array.from({ length: stars }).map((_, index) => (
              <svg key={index} width={16} height={16}>
                <use href={sprite + "#icon-Star"} />
              </svg>
            ))}
            {stars > 0 && (
              <span className={styles.hotelCard_infoRow__span}>
                {stars} Star Hotel
              </span>
            )}
          </div>

          <div className={styles.hotelCard_infoRow__aminities}>
            <svg width={16} height={16}>
              <use href={sprite + "#icon-cafe"} />
            </svg>
            <span className={styles.hotelCard_infoRow__span}>
              <b>{item.amenitiesCount}</b> Amenities
            </span>
          </div>
        </div>

        <div className={styles.hotelCard_ratingRow}>
          <span className={styles.hotelCard_ratingRow__span__castom}>
            {item.rating}
          </span>
          <span className={styles.hotelCard_ratingRow__span}>
            <b>{getRatingStatus(item.rating)}</b> {item.reviewsCount} reviews
          </span>
        </div>

        <hr className={styles.hotelCard_hr} />

        <div className={styles.hotelCard_buttonRow}>
          <FavouritesBtn item={item} />
          <button
            type="button"
            className={styles.hotelCard_buttonRow__btn}
            onClick={() => handleViewDeals(item.id)}
          >
            View Place
          </button>
        </div>
      </div>
    </article>
  );
};
