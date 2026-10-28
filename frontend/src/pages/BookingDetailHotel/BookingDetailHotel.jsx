import { useParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { BookingDetailReservations } from "../../widgets/BookingDetailHotel/BookingDetailReservations.jsx";
import { BookingDetailHotelTotal } from "../../widgets/BookingDetailHotelTotal/BookingDetailHotelTotal.jsx";
import { BookingDetailHotelPayment } from "../../widgets/BookingDetailHotelPayment/BookingDetailHotelPayment.jsx";
import { BookingDetailAuth } from "../../shared/ui/BookingDetailAuth/BookingDetailAuth.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { ButtonBuy } from "../../shared/ui/ButtonBuy/ButtonBuy.jsx";
import { useEffect, useState } from "react";
import styles from "./BookingDetailHotel.module.scss";
import { getHotelById } from "../../shared/api/hotels.js";

export const BookingDetailHotel = () => {
  const { id } = useParams();
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [hotel, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getHotelById(id)
      .then((data) => setHotels(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return null;

  return (
    <section>
      <Header hasShadow={true} />

      <div className={styles.main}>
        <div>
          <BookingDetailReservations hotel={hotel} />
          <BookingDetailHotelPayment hotel={hotel} />
          <BookingDetailAuth
            onSelectCard={(cardId) => setSelectedCardId(cardId)}
          />
        </div>
        <div className={styles.main_block}>
          <BookingDetailHotelTotal hotel={hotel} />
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
