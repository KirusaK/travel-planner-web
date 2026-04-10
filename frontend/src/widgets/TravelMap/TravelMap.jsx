import { Link } from "react-router-dom";
import styles from "./TravelMap.module.scss";
import { SeeAll } from "../../shared/ui/ButtonSeeAll/SeeAll";

export const TravelMap = () => {
  return (
    <div className={styles.travelMap}>
      <div className={styles.travelMap__content}>
        <div className={styles.travelMap__text}>
          <h2 className={styles.travelMap__title}>Let's go places together</h2>
          <p className={styles.travelMap__description}>
            Discover the latest offers and news and start planning your next
            trip with us.
          </p>
        </div>
        <SeeAll />
      </div>
      <div className={styles.travelMap__image}></div>
    </div>
  );
};
