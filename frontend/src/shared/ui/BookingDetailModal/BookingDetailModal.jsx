import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./BookingDetailModal.module.scss";

export const BookingDetailModal = (props) => {
  const { isOpen, onClose } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <section className={styles.bookingDetailModal} onClick={onClose}>
      <div
        className={styles.bookingDetailModal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.bookingDetailModal_header}>
          <h3 className={styles.bookingDetailModal_header__title}>
            Pay part now, part later
          </h3>
          <button
            type="button"
            className={styles.bookingDetailModal_header__closeBtn}
            onClick={onClose}
          >
            <svg width={20} height={20}>
              <use href={sprite + "#icon-cross"} />
            </svg>
          </button>
        </div>

        <hr className={styles.bookingDetailModal_hr} />

        <div className={styles.bookingDetailModal_body}>
          <h3 className={styles.bookingDetailModal_body__subtitle}>
            How partial payments work
          </h3>

          <div className={styles.bookingDetailModal_body__list}>
            <div className={styles.bookingDetailModal_body__item}>
              <p>
                <b>Pay 50% today</b>
                Lock in your flight price today without paying the full amount
                upfront.
              </p>
            </div>

            <div className={styles.bookingDetailModal_body__item}>
              <p>
                <b>Automatic second payment</b>
                The remaining amount will be charged automatically to the same
                card on the due date.
              </p>
            </div>

            <div className={styles.bookingDetailModal_body__item}>
              <p>
                <b>No extra fees</b>
                Enjoy 0% interest and zero hidden service charges.
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.bookingDetailModal_hr} />

        <div className={styles.bookingDetailModal_button}>
          <button
            type="button"
            className={styles.bookingDetailModal_button__submitBtn}
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </section>
  );
};
