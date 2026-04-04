import { Link } from "react-router-dom";
import styles from "./TravelMap.module.scss";
import { SeeAll } from "../../shared/ui/ButtonSeeAll/SeeAll";

export const TravelMap = () => {
  return (
    <div className={styles.travelMap}>
      <div className={styles.travelMap__content}>
        <div className={styles.travelMap__text}>
          <h2 className={styles.travelMap__title}>
            Wybierzmy się gdzieś razem
          </h2>
          <p className={styles.travelMap__description}>
            Zapoznaj się z najnowszymi ofertami i aktualnościami i zacznij
            planować swoją kolejną podróż z nami.
          </p>
        </div>
        <SeeAll />
      </div>
      <div className={styles.travelMap__image}></div>
    </div>
  );
};
