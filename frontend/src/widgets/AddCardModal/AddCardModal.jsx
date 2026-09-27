import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AddCardModal.module.scss";
import { useState } from "react";

export const AddCardModal = ({ isOpen, onClose, userId, onCardAdded }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expDate: "",
    cvc: "",
    nameOnCard: "",
    country: "",
    isSaved: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          cardNumber: formData.cardNumber,
          expDate: formData.expDate,
          nameOnCard: formData.nameOnCard,
          country: formData.country,
          isSaved: formData.isSaved,
        }),
      });

      if (response.ok) {
        const newCard = await response.json();

        if (onCardAdded) onCardAdded(newCard);

        onClose();

        setFormData({
          cardNumber: "",
          expDate: "",
          cvc: "",
          nameOnCard: "",
          country: "",
          isSaved: true,
        });
      } else {
        alert("Ошибка при добавлении карты");
      }
    } catch (err) {
      console.error("Failed to add card:", err);
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit} className={styles.addCardModal_form}>
            <div className={styles.addCardModal_inputGroup}>
              <label className={styles.addCardModal_label}>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4321 4321 4321 4321"
                className={styles.addCardModal_input}
              />
            </div>

            <div className={styles.addCardModal_row}>
              <div className={styles.addCardModal_inputGroup}>
                <label className={styles.addCardModal_label}>Exp. Date</label>
                <input
                  type="text"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleChange}
                  placeholder="02/27"
                  className={styles.addCardModal_input__half}
                />
              </div>
              <div className={styles.addCardModal_inputGroup}>
                <label className={styles.addCardModal_label}>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  className={styles.addCardModal_input__half}
                />
              </div>
            </div>

            <div className={styles.addCardModal_inputGroup}>
              <label className={styles.addCardModal_label}>Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
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
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                className={styles.addCardModal_input}
              />
            </div>

            <label className={styles.addCardModal_checkboxLabel}>
              <input
                type="checkbox"
                name="isSaved"
                checked={formData.isSaved}
                onChange={handleChange}
                className={styles.addCardModal_checkbox}
              />
              Securely save my information for 1-click checkout
            </label>

            <button type="submit" className={styles.addCardModal_submitBtn} disabled={loading}>
              {loading ? "Adding..." : "Add Card"}
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
