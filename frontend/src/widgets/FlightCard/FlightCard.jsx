import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { FavouritesBtn } from "../../shared/ui/FavouritesBtn/FavouritesBtn.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./FlightCard.module.scss";

export const FlightCard = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const handleViewDeals = (ticketId) => {
    navigate(`/flight-detail/${ticketId}`);
  };

  return (
    <article className={styles.flightCard}>
      <div className={styles.flightCard_logoBlock}>
        <img
          src={item.logo}
          alt={item.airlineName}
          className={styles.flightCard_logo}
        />
      </div>
      <div className={styles.flightCard_content}>
        <div className={styles.flightCard_header}>
          <div className={styles.flightCard_ratingBlock}>
            <RatingCard value={item.rating} />
            <span className={styles.flightCard_ratingText}>
              <strong>{item.ratingStatus}</strong>
              {item.reviewsCount}
            </span>
          </div>
          <div className={styles.flightCard_priceBlock}>
            <span className={styles.flightCard_priceLabel}>starting from</span>
            <h2 className={styles.flightCard_priceValue}>{item.price}</h2>
          </div>
        </div>

        <div className={styles.flightCard_trips}>
          {item.trips?.map((trip) => (
            <div key={trip.id} className={styles.flightCard_tripRow}>
              <input type="checkbox" className={styles.flightCard_checkbox} />
              <div className={styles.flightCard_tripRow_info}>
                <div className={styles.flightCard_tripTimeInfo}>
                  <span className={styles.flightCard_tripTime}>
                    <strong>{trip.time}</strong>
                  </span>
                  <span className={styles.flightCard_tripAirline}>
                    {item.airlineName}
                  </span>
                </div>
                <div className={styles.flightCard_tripTypeBlock}>
                  <span className={styles.flightCard_tripType}>
                    {trip.type}
                  </span>
                </div>
                <div className={styles.flightCard_tripDurationBlock}>
                  <span className={styles.flightCard_tripDuration}>
                    {trip.duration}
                  </span>
                  <span className={styles.flightCard_tripRoute}>
                    {trip.route}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className={styles.flightCard_hr} />

        <div className={styles.flightCard_footer}>
          <FavouritesBtn item={item} />
          <button
            type="button"
            className={styles.flightCard_dealsBtn}
            onClick={() => handleViewDeals(item.id)}
          >
            View Deals
          </button>
        </div>
      </div>
    </article>
  );
};
