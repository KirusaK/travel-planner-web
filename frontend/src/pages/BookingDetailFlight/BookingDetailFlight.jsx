import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { BookingDetailTicket } from "../../widgets/BookingDetailTicket/BookingDetailTicket.jsx";
import { BookingDetailTotal } from "../../widgets/BookingDetailTotal/BookingDetailTotal.jsx";
import { BookingDetailPayment } from "../../widgets/BookingDetailPayment/BookingDetailPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { ButtonBuy } from "../../shared/ui/ButtonBuy/ButtonBuy.jsx";
import { useEffect, useState } from "react";
import styles from "./BookingDetailFlight.module.scss";
import { getFlightById } from "../../shared/api/flights.js";

export const BookingDetailFlight = () => {
  const { id } = useParams();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [ticket, setTicket] = useState(null); // State для хранения рейса
  const [loading, setLoading] = useState(true); // State для показания загрузки
  const [error, setError] = useState(null); // State для хранения текста ошибки

  useEffect(() => {
    console.log("загружаю рейс с id =", id);

    setLoading(true);
    setError(null);

    getFlightById(id)
      .then((data) => setTicket(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loadin...</p>;
  if (error) return <p>{error}</p>;
  if (!ticket) return null;

  if (!ticket) {
    console.log("No ticket found");
    return null;
  }

  return (
    <section>
      <Header hasShadow={true} />

      <div className={styles.main}>
        <div>
          <BookingDetailTicket ticket={ticket} />
          <BookingDetailPayment ticket={ticket} />
          <BookingDetailAuth
            onSelectCard={(cardId) => setSelectedCardId(cardId)}
          />
        </div>
        <div className={styles.main_block}>
          <BookingDetailTotal ticket={ticket} />
          <ButtonBuy
            itemType="flight"
            itemId={ticket.id}
            title={ticket.airlineName}
            price={ticket.price}
            selectedCardId={selectedCardId}
          />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </section>
  );
};
