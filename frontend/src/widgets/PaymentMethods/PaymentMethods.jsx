import styles from "./PaymentMethods.module.scss";
import deleteIcon from "../../shared/assets/image/deleteIcon.svg";
import visaIcon from "../../shared/assets/image/visaIcon.svg";

const cards = [
  {
    id: "card-1",
    last4: "4321",
    validThru: "02/27",
    brandIcon: visaIcon,
  },
];

export const PaymentMethods = () => {
  return (
    <section className={styles.payment}>
      <h2 className={styles.payment__title}>Payment methods</h2>

      <div className={styles.payment__section}>
        <div className={styles.payment__grid}>
          {cards.map(({ id, last4, validThru, brandIcon }) => (
            <div className={styles.payment__card} key={id}>
              <button
                type="button"
                className={styles.payment__deleteButton}
                onClick={() => console.log(`Delete card ${id}`)}
                aria-label="Delete card"
              >
                <img src={deleteIcon} alt="" className={styles.payment__icon} />
              </button>

              <div className={styles.payment__number}>
                <span className={styles.payment__mask}>**** **** ****</span>
                <span className={styles.payment__digits}>{last4}</span>
              </div>

              <div className={styles.payment__bottom}>
                <div className={styles.payment__validThru}>
                  <span className={styles.payment__label}>Valid Thru</span>
                  <span className={styles.payment__value}>{validThru}</span>
                </div>

                <div className={styles.payment__brand}>
                  <img src={brandIcon} alt="Visa" />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.payment__addCard}
            onClick={() => console.log("Add new card clicked")}
          >
            <span className={styles.payment__addIcon}>+</span>
            Add a new card
          </button>
        </div>
      </div>
    </section>
  );
};
