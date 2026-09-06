import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { hotels } from "../../entities/hotel/index.js";
import { BookingDetailReservations } from "../../widgets/BookingDetailHotel/BookingDetailReservations.jsx";
import { BookingDetailHotelTotal } from "../../widgets/BookingDetailHotelTotal/BookingDetailHotelTotal.jsx";
import { BookingDetailHotelPayment } from "../../widgets/BookingDetailHotelPayment/BookingDetailHotelPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import styles from "./BookingDetailHotel.module.scss";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";

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

      <div className={styles.main}>
        <div>
          <BookingDetailReservations hotel={hotel} />
          <BookingDetailHotelPayment hotel={hotel} />
          <BookingDetailAuth />
        </div>
        <div>
          <BookingDetailHotelTotal hotel={hotel} />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </section>
  );
};
