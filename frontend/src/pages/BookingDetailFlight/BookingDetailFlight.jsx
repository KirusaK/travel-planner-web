import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { BookingDetailTicket } from "../../widgets/BookingDetailTicket/BookingDetailTicket.jsx";
import { BookingDetailTotal } from "../../widgets/BookingDetailTotal/BookingDetailTotal.jsx";
import { BookingDetailPayment } from "../../widgets/BookingDetailPayment/BookingDetailPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { ButtonBuy } from "../../shared/ui/ButtonBuy/ButtonBuy.jsx";
import { useState } from "react";
import styles from "./BookingDetailFlight.module.scss";
import { getFlightById } from "../../shared/api/flights.js";
import { useFetch } from "../../shared/hooks/useFetch.js";

export const BookingDetailFlight = () => {
  const { id } = useParams();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const { data: flight, loading, error } = useFetch(getFlightById, id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!flight) return null;

  return (
    <section>
      <Header hasShadow={true} />

      <div className={styles.main}>
        <div>
          <BookingDetailTicket ticket={flight} />
          <BookingDetailPayment ticket={flight} />
          <BookingDetailAuth
            onSelectCard={(cardId) => setSelectedCardId(cardId)}
          />
        </div>
        <div className={styles.main_block}>
          <BookingDetailTotal ticket={flight} />
          <ButtonBuy
            itemType="flight"
            itemId={flight.id}
            title={flight.airlineName}
            price={flight.price}
            selectedCardId={selectedCardId}
          />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </section>
  );
};
