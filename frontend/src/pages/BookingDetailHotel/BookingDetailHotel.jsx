import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { hotels } from "../../entities/hotel/index.js";
import { BookingDetailReservations } from "../../widgets/BookingDetailHotel/BookingDetailReservations.jsx";
import styles from "./BookingDetailHotel.module.scss";

export const BookingDetailHotel = () => {
  const { id } = useParams();
  const hotel = hotels.find((item) => String(item.id) === String(id));
  if (!hotel) {
    console.log("No hotel found");
    return null;
  }

  return (
    <section>
      <Header hasShadow={true} />

      <div>
        <div>
          <BookingDetailReservations hotel={hotel} />
        </div>
        <div></div>
      </div>
    </section>
  );
};
