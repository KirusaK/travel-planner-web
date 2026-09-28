import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { hotels } from "../../entities/hotel/index.js";
import { BookingDetailReservations } from "../../widgets/BookingDetailHotel/BookingDetailReservations.jsx";
import { BookingDetailHotelTotal } from "../../widgets/BookingDetailHotelTotal/BookingDetailHotelTotal.jsx";
import { BookingDetailHotelPayment } from "../../widgets/BookingDetailHotelPayment/BookingDetailHotelPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { ButtonBuy } from "../../shared/ui/ButtonBuy/ButtonBuy.jsx";
import {useState} from "react";
import styles from "./BookingDetailHotel.module.scss";

export const BookingDetailHotel = () => {
  const { id } = useParams();
  const [selectedCardId, setSelectedCardId] = useState(null);

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
          <BookingDetailAuth onSelectCard={(cardId) => setSelectedCardId(cardId)} />
        </div>
        <div className={styles.main_block}>
          <BookingDetailHotelTotal hotel={hotel} />
          <ButtonBuy
            itemType="hotel"
            itemId={hotel.id}
            title={hotel.hotelName || hotel.title}
            price={hotel.price}
            selectedCardId={selectedCardId}
          />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </section>
  );
};
