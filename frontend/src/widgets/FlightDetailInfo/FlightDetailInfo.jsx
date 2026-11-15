import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { FavouritesBtn } from "../../shared/ui/FavouritesBtn/FavouritesBtn.jsx";
import { useNavigate } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightDetailInfo.module.scss";
import {getRatingStatus} from "../../shared/lib/format.js";

export const FlightDetailInfo = ({flight}) => {
  const navigate = useNavigate();

  const handleBookDetailFlight = (flightId) => {
    navigate(`/booking-detail-flight/${flightId}`);
  };

  return (
    <div className={styles.FlightDetailInfo}>
      <section className={styles.FlightDetailInfo_container}>
        <div className={styles.FlightDetailInfo_block__info}>
          <h2 className={styles.FlightDetailInfo_info_title}>{flight.airlineName}</h2>
          <div className={styles.FlightDetailInfo_info_location}>
            <svg width="18" height="18">
              <use href={sprite + "#icon-Location"} />
            </svg>
            <p>{flight.airport}</p>
          </div>
          <div className={styles.FlightDetailInfo_info_rating}>
            <RatingCard value={flight.rating} />
            <p>
              <b>{getRatingStatus(flight.rating)}</b> {flight.reviewsCount} {" "} reviews
            </p>
          </div>
        </div>
        <div className={styles.FlightDetailInfo_block__price}>
          <h2 className={styles.FlightDetailInfo_price_title}>${flight.price}</h2>
          <div className={styles.FlightDetailInfo_price_blockBtn}>
            <FavouritesBtn />
            <button className={styles.FlightDetailInfo_price_btnShare}>
              <svg width="20" height="20">
                <use href={sprite + "#icon-Share"} />
              </svg>
            </button>
            <button
              className={styles.FlightDetailInfo_price_btnBook}
              onClick={() => handleBookDetailFlight(flight.id)}
            >
              Book now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
