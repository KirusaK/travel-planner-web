import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AddCardModal.module.scss";

export const AddCardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <section className={styles.addCardModal}>
      <div className={styles.addCardModal_overlay} onClick={onClose}>
        <div
          className={styles.addCardModal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={styles.addCardModal_closeBtn}
            onClick={onClose}
          >
            <svg width={14} height={14}>
              <use href={sprite + "#icon-close"} />
            </svg>
          </button>

          <h2 className={styles.addCardModal_title}>Add a new Card</h2>

          <form className={styles.addCardModal_form}>
            <div className={styles.addCardModal_inputGroup}>
              <label className={styles.addCardModal_label}>Card Number</label>
              <input
                type="text"
                placeholder="4321 4321 4321 4321"
                className={styles.addCardModal_input}
              />
            </div>

            <div className={styles.addCardModal_row}>
              <div className={styles.addCardModal_inputGroup}>
                <label className={styles.addCardModal_label}>Exp. Date</label>
                <input
                  type="text"
                  placeholder="02/27"
                  className={styles.addCardModal_input__half}
                />
              </div>
              <div className={styles.addCardModal_inputGroup}>
                <label className={styles.addCardModal_label}>CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className={styles.addCardModal_input__half}
                />
              </div>
            </div>

            <div className={styles.addCardModal_inputGroup}>
              <label className={styles.addCardModal_label}>Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className={styles.addCardModal_input}
              />
            </div>

            <div className={styles.addCardModal_inputGroup}>
              <label className={styles.addCardModal_label}>
                Country or Region
              </label>
              <input
                type="text"
                placeholder="United States"
                className={styles.addCardModal_input}
              />
            </div>

            <label className={styles.addCardModal_checkboxLabel}>
              <input
                type="checkbox"
                defaultChecked
                className={styles.addCardModal_checkbox}
              />
              Securely save my information for 1-click checkout
            </label>

            <button type="submit" className={styles.addCardModal_submitBtn}>
              Add Card
            </button>
          </form>

          <p className={styles.addCardModal_disclaimer}>
            By confirming your subscription, you allow The Outdoor Inn Crowd
            Limited to charge your card for this payment and future payments in
            accordance with their terms. You can always cancel your
            subscription.
          </p>
        </div>
      </div>
    </section>
  );
};
