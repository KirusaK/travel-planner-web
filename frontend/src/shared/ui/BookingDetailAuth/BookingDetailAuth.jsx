import { SocialAuthGroup } from "../SocialAuthGroup/index.js";
import { useAuth } from "../../context/AuthContext.jsx";
import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./BookingDetailAuth.module.scss";
import { useEffect, useState } from "react";
import { AddCardModal } from "../../../widgets/AddCardModal/AddCardModal.jsx";

export const BookingDetailAuth = ({ onSelectCard }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // Вспомогательная функция для выбора карты и передачи наверх
  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
    if (onSelectCard) {
      onSelectCard(cardId);
    }
  };

  useEffect(() => {
    console.log("Current user in BookingDetailAuth:", user);

    if (!user?.id) {
      console.warn("User ID is missing!");
      return;
    }

    fetch(`http://localhost:5000/api/cards?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCards(data);
          handleCardSelect(data[0].id); // Автоматически выбираем первую карту и передаем наверх
        }
      })
      .catch((err) => console.error("Failed to fetch cards", err));
  }, [user?.id]);

  const handleCardAdded = (newCard) => {
    setCards((prev) => [...prev, newCard]);
    handleCardSelect(newCard.id); // Выбираем новую карту и передаем наверх
  };

  return (
    <section className={styles.bookingDetailAuth}>
      {user ? (
        <div className={styles.bookingDetailAuth_container}>
          {cards.length > 0 && (
            <div className={styles.bookingDetailAuth_cardsList}>
              {cards.map((card) => {
                const isSelected = selectedCard === card.id;
                const rawNumber = card.cardNumber || card.card_number || "";
                const last4 = rawNumber
                  ? rawNumber.replace(/\s+/g, "").slice(-4)
                  : 4321;
                const expDate = card.expDate || card.exp_date || "";

                return (
                  <div
                    key={card.id}
                    className={`${styles.bookingDetailAuth_cardItem} ${
                      isSelected
                        ? styles.bookingDetailAuth_cardItem__active
                        : ""
                    }`}
                    onClick={() => handleCardSelect(card.id)} // ✅ Вызываем handleCardSelect
                  >
                    <div className={styles.bookingDetailAuth_cardLeft}>
                      <svg width={32} height={32}>
                        <use href={sprite + "#icon-Visa"} />
                      </svg>

                      <div className={styles.bookingDetailAuth_cardInfo}>
                        <span>
                          <strong>**** {last4}</strong>
                        </span>
                        <span>{expDate}</span>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="selectedCard"
                      checked={isSelected}
                      onChange={() => handleCardSelect(card.id)} // ✅ Вызываем handleCardSelect
                      className={styles.bookingDetailAuth_checkbox}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <button
            className={styles.bookingDetailAuth_container__border}
            onClick={handleModalOpen}
          >
            <div className={styles.bookingDetailAuth_container__info}>
              <svg width={64} height={64}>
                <use href={sprite + "#icon-Add_circle"} />
              </svg>
              <p>Add a new card</p>
            </div>
          </button>
        </div>
      ) : (
        <div className={styles.bookingDetailAuth_container}>
          <h2 className={styles.bookingDetailAuth_title}>
            Login or Sign up to book
          </h2>

          <form className={styles.bookingDetailAuth_form}>
            <div className={styles.bookingDetailAuth_inputGroup}>
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                className={styles.bookingDetailAuth_input}
              />
            </div>

            <p className={styles.bookingDetailAuth_policy}>
              We’ll call or text you to confirm your number. Standard message
              and data rates apply. <span>Privacy Policy</span>
            </p>

            <div className={styles.bookingDetailAuth_button}>
              <button
                type="submit"
                className={styles.bookingDetailAuth_button__submitBtn}
              >
                Continue
              </button>
            </div>
          </form>

          <div className={styles.bookingDetailAuth_divider}>
            <hr className={styles.bookingDetailAuth_divider__line} />
            <span className={styles.bookingDetailAuth_divider__text}>Or</span>
            <hr className={styles.bookingDetailAuth_divider__line} />
          </div>

          <div className={styles.bookingDetailAuth_socials}>
            <SocialAuthGroup />

            <div className={styles.bookingDetailAuth_button}>
              <button
                type="button"
                className={styles.bookingDetailAuth_button__emailBtn}
              >
                <svg width={24} height={24}>
                  <use href={sprite + "#icon-ion_mail"} />
                </svg>
                Continue with email
              </button>
            </div>
          </div>
        </div>
      )}

      <AddCardModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userId={user?.id}
        onCardAdded={handleCardAdded}
      />
    </section>
  );
};
