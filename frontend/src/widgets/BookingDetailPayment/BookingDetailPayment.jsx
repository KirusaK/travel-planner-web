import styles from "./BookingDetailPayment.module.scss";
import { useState } from "react";

export const BookingDetailPayment = ({ ticket }) => {
  const { partPayment = {} } = ticket;
  const [paymentType, setPaymentType] = useState("full");

  return (
    <section className={styles.bookingDetailPayment}>
      <div className={styles.bookingDetailPayment_container}>
        <label
          className={`${styles.bookingDetailPayment_option} ${paymentType === "full" ? styles.bookingDetailPayment_option___active : ""}`}
        >
          <div className={styles.bookingDetailPayment_option__content}>
            <h3 className={styles.bookingDetailPayment_option__title}>
              Pay in full
            </h3>
            <p className={styles.bookingDetailPayment_option__description}>
              Pay the total and you are all set
            </p>
          </div>

          <input
            type="radio"
            name="paymentType"
            value="full"
            checked={paymentType === "full"}
            onChange={(e) => setPaymentType(e.target.value)}
            className={styles.bookingDetailPayment_option__radio}
          />
        </label>

        <label
          className={`${styles.bookingDetailPayment_option} ${paymentType === "part" ? styles.bookingDetailPayment_option___active : ""}`}
        >
          <div className={styles.bookingDetailPayment_option__content}>
            <h3 className={styles.bookingDetailPayment_option__title}>
              Pay part now, part later
            </h3>
            <p className={styles.bookingDetailPayment_option__description}>
              Pay {partPayment.initialAmount} now, and the rest (
              {partPayment.remainingAmount}) will be automatically charged to
              the same payment method on {partPayment.dueDate}. No extra fees.
            </p>
          </div>

          <input
            type="radio"
            name="paymentType"
            value="part"
            checked={paymentType === "part"}
            onChange={(e) => setPaymentType(e.target.value)}
            className={styles.bookingDetailPayment_option__radio}
          />
        </label>

        <button type="button" className={styles.bookingDetailPayment__moreInfo}>
          More info
        </button>
      </div>
    </section>
  );
};
