import styles from "./FlightPricingTab.module.scss";

export const FlightPricingTab = () => {
  return (
    <div className={styles.pricingTab}>
      {/* Base price */}
      <section className={styles.pricingTab__section}>
        <div className={styles.pricingTab__sectionHead}>
          <h2 className={styles.pricingTab__sectionTitle}>Base price</h2>
          <p className={styles.pricingTab__sectionHint}>
            Starting price per passenger in USD.
          </p>
        </div>
        <div className={styles.pricingTab__field}>
          <label className={styles.pricingTab__label} htmlFor="basePrice">
            Base Price (USD)
          </label>
          <input
            className={styles.pricingTab__input}
            type="number"
            id="basePrice"
            name="basePrice"
            min="0"
            step="0.5"
          />
        </div>
      </section>

      {/* Part payment */}
      <section className={styles.pricingTab__section}>
        <div className={styles.pricingTab__sectionHead}>
          <h3 className={styles.pricingTab__sectionTitle}>Part payment</h3>
          <p className={styles.pricingTab__sectionHint}>
            Let customers pay part now and the rest later. Remaining amount
            auto-fills.
          </p>
        </div>

        <div className={styles.pricingTab__row}>
          <div className={styles.pricingTab__field}>
            <label className={styles.pricingTab__label} htmlFor="initialAmount">
              Initial Amount
            </label>
            <input
              className={styles.pricingTab__input}
              type="number"
              id="initialAmount"
              name="initialAmount"
            />
          </div>
          <div className={styles.pricingTab__field}>
            <label
              className={styles.pricingTab__label}
              htmlFor="remainingAmount"
            >
              Remaining Amount
            </label>
            <input
              className={styles.pricingTab__input}
              type="number"
              id="remainingAmount"
              name="remainingAmount"
            />
          </div>
          <div className={styles.pricingTab__field}>
            <label className={styles.pricingTab__label} htmlFor="dueDate">
              Due Date
            </label>
            <input
              className={styles.pricingTab__input}
              type="date"
              id="dueDate"
              name="dueDate"
            />
          </div>
        </div>
      </section>

      {/*Summaty*/}
      <section className={styles.pricingTab__summary}>
        <h3 className={styles.pricingTab__summaryLabel}>Customer pays today</h3>

        <div className={styles.pricingTab__summaryValue}>
          <h3 className={styles.pricingTab__summaryPrice}>$0</h3>
          <p className={styles.pricingTab__summaryLater}>then $0 later</p>
        </div>
      </section>
    </div>
  );
}