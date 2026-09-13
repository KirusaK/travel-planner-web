import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightPolicies.module.scss";

export const FlightPolicies = () => {
  return (
    <section className={styles.flightPolicies}>
      <div className={styles.flightPolicies_block}>
        <h2 className={styles.flightPolicies_block__title}>
          Emirates Airlines Policies
        </h2>
        <div className={styles.flightPolicies_block__info}>
          <div className={styles.flightPolicies_block__info__teg}>
            <svg width={24} height={24}>
              <use href={sprite + "#icon-Vector"} />
            </svg>
            <span className={styles.flightPolicies_block__info__teg__span}>
              Pre-flight cleaning, installation of cabin HEPA filters.
            </span>
          </div>
          <div className={styles.flightPolicies_block__info__teg}>
            <svg width={24} height={24}>
              <use href={sprite + "#icon-Vector"} />
            </svg>
            <span className={styles.flightPolicies_block__info__teg__span}>
              Pre-flight health screening questions.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
