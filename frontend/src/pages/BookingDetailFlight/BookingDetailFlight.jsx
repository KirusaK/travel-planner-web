import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { BookingDetailTicket } from "../../widgets/BookingDetailTicket/BookingDetailTicket.jsx";
import { BookingDetailTotal } from "../../widgets/BookingDetailTotal/BookingDetailTotal.jsx";
import { BookingDetailPayment } from "../../widgets/BookingDetailPayment/BookingDetailPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { tickets } from "../../entities/flight/index.js";
import { ButtonBuy } from "../../shared/ui/ButtonBuy/ButtonBuy.jsx";
import {useState} from "react";
import styles from "./BookingDetailFlight.module.scss";

export const BookingDetailFlight = () => {
  const { id } = useParams();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const ticket = tickets.find((item) => String(item.id) === String(id));

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
