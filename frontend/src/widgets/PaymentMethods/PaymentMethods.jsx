import { useEffect, useState } from "react";
import styles from "./PaymentMethods.module.scss";
import deleteIcon from "../../shared/assets/image/deleteIcon.svg";
import visaIcon from "../../shared/assets/image/visaIcon.svg";
import { AddCardModal } from "../AddCardModal/AddCardModal";
import {useAuth} from "../../shared/context/AuthContext.jsx";
import {deleteCard, getCard} from "../../shared/api/cards.js"; // перевір шлях

export const PaymentMethods = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch {
      setError("Could not delete card");
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    getCard(user.id)
        .then(setCards)
        .catch((err) => setError(err.message))
  }, [user?.id]);

  if (!user) return <p>Loading...</p>;

  return (
    <section className={styles.payment}>
      <h2 className={styles.payment__title}>Payment methods</h2>

      <div className={styles.payment__section}>
        {error && <p>{error}</p>}

        <div className={styles.payment__grid}>
          {cards.map((card) => (
            <div className={styles.payment__card} key={card.id}>
              <button
                type="button"
                className={styles.payment__deleteButton}
                onClick={() => handleDelete(card.id)}
                aria-label="Delete card"
              >
                <img src={deleteIcon} alt="" className={styles.payment__icon} />
              </button>

              <div className={styles.payment__number}>
                <span className={styles.payment__mask}>**** **** ****</span>
                <span className={styles.payment__digits}>
                  {String(card.card_number).replace(/\s/g, "").slice(-4)}
                </span>
              </div>

              <div className={styles.payment__bottom}>
                <div className={styles.payment__validThru}>
                  <span className={styles.payment__label}>Valid Thru</span>
                  <span className={styles.payment__value}>{card.exp_date}</span>
                </div>

                <div className={styles.payment__brand}>
                  <img src={visaIcon} alt="Visa" />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.payment__addCard}
            onClick={() => setIsModalOpen(true)}
          >
            <span className={styles.payment__addIcon}>+</span>
            Add a new card
          </button>
        </div>
      </div>

      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={user.id}
        onCardAdded={(newCard) => setCards((prev) => [...prev, newCard])}
      />
    </section>
  );
};
