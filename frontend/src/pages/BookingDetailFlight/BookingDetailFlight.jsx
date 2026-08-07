import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { tickets } from "../../entities/flight/index.js";
import { BookingDetailTicket } from "../../widgets/BookingDetailTicket/BookingDetailTicket.jsx";
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

      <div>
        <BookingDetailTicket ticket={ticket} />
      </div>
      <div></div>
    </section>
  );
};
