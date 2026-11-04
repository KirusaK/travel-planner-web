import { useState } from "react";
import { BookingDetailModal } from "../../shared/ui/BookingDetailModal/index.js";
import styles from "./BookingDetailHotelPayment.module.scss";

export const BookingDetailHotelPayment = ({ hotel }) => {
  const [paymentType, setPaymentType] = useState("full");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initial = Math.round(hotel.pricePerNight / 2) * 100 / 100;
  const remaining = Math.round((hotel.pricePerNight - initial) * 100) / 100;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              Pay ${initial} now, and the rest ($
              {remaining}) will be automatically charged to
              the same payment method on {hotel.partDueDate} No extra fees.
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

        <button
          type="button"
          className={styles.bookingDetailPayment__moreInfo}
          onClick={handleOpenModal}
        >
          More info
        </button>

        <BookingDetailModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </section>
  );
};
