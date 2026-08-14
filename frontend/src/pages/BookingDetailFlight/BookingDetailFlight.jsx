import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { BookingDetailTicket } from "../../widgets/BookingDetailTicket/BookingDetailTicket.jsx";
import { BookingDetailTotal } from "../../widgets/BookingDetailTotal/BookingDetailTotal.jsx";
import { BookingDetailPayment } from "../../widgets/BookingDetailPayment/BookingDetailPayment.jsx";
import { BookingDetailAuth } from "../../widgets/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { tickets } from "../../entities/flight/index.js";
import styles from "./BookingDetailFlight.module.scss";

export const BookingDetailFlight = () => {
  const { id } = useParams();

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
          <BookingDetailAuth ticket={ticket} />
        </div>
        <div>
          <BookingDetailTotal ticket={ticket} />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </section>
  );
};
