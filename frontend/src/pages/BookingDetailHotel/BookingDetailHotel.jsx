import {useParams, useSearchParams} from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { BookingDetailReservations } from "../../widgets/BookingDetailHotel/BookingDetailReservations.jsx";
import { BookingDetailHotelTotal } from "../../widgets/BookingDetailHotelTotal/BookingDetailHotelTotal.jsx";
import { BookingDetailHotelPayment } from "../../widgets/BookingDetailHotelPayment/BookingDetailHotelPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { ButtonBuy } from "../../shared/ui/ButtonBuy/ButtonBuy.jsx";
import { useState } from "react";
import styles from "./BookingDetailHotel.module.scss";
import { getHotelById } from "../../shared/api/hotels.js";
import { useFetch } from "../../shared/hooks/useFetch.js";

export const BookingDetailHotel = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const roomId = params.get("room");
  const [selectedCardId, setSelectedCardId] = useState(null);
  const { data: hotel, loading, error } = useFetch(getHotelById, id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return null;

    const room = hotel.rooms.find((r) => String(r.id) === roomId) ?? hotel.rooms[0];
    const bookedHotel = {...hotel, pricePerNight: room.price, rooms: [room]};

  return (
    <section>
      <Header hasShadow={true} />

      <div className={styles.main}>
        <div>
          <BookingDetailReservations hotel={bookedHotel} />
          <BookingDetailHotelPayment hotel={bookedHotel} />
          <BookingDetailAuth onSelectCard={setSelectedCardId} />
        </div>
        <div className={styles.main_block}>
          <BookingDetailHotelTotal hotel={bookedHotel} />
          <ButtonBuy
            itemType="hotel"
            itemId={hotel.id}
            title={hotel.name}
            price={hotel.pricePerNight}
            selectedCardId={selectedCardId}
          />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </section>
  );
};
