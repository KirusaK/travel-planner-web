import { hotels } from "../../entities/hotel/index.js";
import { useNavigate } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelCard.module.scss";

export const HotelCard = () => {
  const navigate = useNavigate();

  const handleViewDeals = (hotelId) => {
    navigate(`/hotel-detail/${hotelId}`);
  };

  return (
    <div>
      <div className={styles.sorting_results}>
        <p>
          <strong>Showing 4 of</strong> <span>257 places</span>
        </p>
        <div className={styles.sorting_selectWrapper}>
          <p>
            Sort by <strong> Recommended</strong>
          </p>
          <svg width={18} height={18}>
            <use href={sprite + "#icon-chevron_down"} />
          </svg>
        </div>
      </div>

      <section className={styles.hotelCard_container}>
        {hotels.map((item) => (
          <article key={item.id} className={styles.hotelCard}>
            <div className={styles.hotelCard_imageWrapper}>
              <img
                src={item.logo}
                alt={item.hotelName}
                className={styles.hotelCard_image}
              />
            </div>

            <div className={styles.hotelCard_content}>
              <div className={styles.hotelCard_mainRow}>
                <h2 className={styles.hotelCard_title}>{item.hotelName}</h2>

                <div className={styles.hotelCard_priceBlock}>
                  <p className={styles.hotelCard_priceLabel}>starting from</p>
                  <span className={styles.hotelCard_priceValue}>
                    ${item.price}/night
                  </span>
                  <p className={styles.hotelCard_priceTax}>excl. tax</p>
                </div>
              </div>

              <div className={styles.hotelCard_locationRow}>
                <svg
                  width={16}
                  height={16}
                  className={styles.hotelCard_locationIcon}
                >
                  <use href={sprite + "#icon-Location"} />
                </svg>
                <span className={styles.hotelCard_locationText}>
                  {item.location}
                </span>
              </div>

              <div className={styles.hotelCard_infoRow}>
                <div className={styles.hotelCard_infoRow__stars}>
                  {Array.from({ length: item.stars }).map((_, index) => (
                    <svg key={index} width={16} height={16}>
                      <use href={sprite + "#icon-Star"} />
                    </svg>
                  ))}
                  <span className={styles.hotelCard_infoRow__span}>
                    {item.stars} Star {item.type}
                  </span>
                </div>

                <div className={styles.hotelCard_infoRow__aminities}>
                  <svg width={16} height={16}>
                    <use href={sprite + "#icon-cafe"} />
                  </svg>
                  <span className={styles.hotelCard_infoRow__span}>
                    <b>20+</b> Aminities
                  </span>
                </div>
              </div>

              <div className={styles.hotelCard_ratingRow}>
                <span className={styles.hotelCard_ratingRow__span__castom}>
                  {item.rating}
                </span>
                <span className={styles.hotelCard_ratingRow__span}>
                  <b>{item.ratingStatus}</b> {item.countReviews} reviews
                </span>
              </div>

              <hr className={styles.hotelCard_hr} />

              <div className={styles.hotelCard_buttonRow}>
                <button
                  type="button"
                  className={styles.hotelCard_buttonRow__heart}
                >
                  <svg width={20} height={20}>
                    <use href={sprite + "#icon-heart"} />
                  </svg>
                </button>
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
        ))}
      </section>
    </div>
  );
};
