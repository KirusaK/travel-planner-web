import {useParams} from 'react-router-dom';
import { Header } from "../../widgets/Header/Header.jsx";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import { useEffect, useState } from "react";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./BookingSuccess.module.scss";
import { BookingTicketCard } from "../../widgets/BookingTicketCard/BookingTicketCard.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { getFlightById } from "../../shared/api/flights.js";
import { getHotelById } from "../../shared/api/hotels.js";


export const BookingSuccess = () => {
  const {id} = useParams()
  const { user } = useAuth()

  const [booking, setBooking] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/${id}`);
        if (!res.ok) throw new Error("Booking not found");
        const bookingData = await res.json();
        setBooking(bookingData);

        const item =
          bookingData.item_type.toLowerCase() === "flight"
            ? await getFlightById(bookingData.item_id)
            : await getHotelById(bookingData.item_id);
        setItemData(item);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div>Loading your booking...</div>
  if (error) return <div>{error}</div>
  if (!booking || !itemData) return <div>Booking not found.</div>;

  const isFlight = booking.item_type.toLowerCase() === "flight";

  return (
    <section>
      <div>
        <Header hasShadow={true} />

        <div className={styles.main}>
          <div className={styles.headerInfo}>
            <div className={styles.headerInfo_block}>
              <h1 className={styles.headerInfo_block__title}>
                {booking.title}
              </h1>
              <div className={styles.headerInfo_block_location}>
                <svg width={18} height={18}>
                  <use href={sprite + "#icon-Location"} />
                </svg>

                <p>
                  {isFlight
                    ? itemData.airport || "Newark (EWR)"
                    : itemData.address}
                </p>
              </div>
            </div>

            <h2 className={styles.headerInfo_price}>
              ${Number(booking.total_price)}
            </h2>
          </div>

          <BookingTicketCard
            booking={booking}
            itemData={itemData}
            user={user}
            isFlight={isFlight}
          />

          <div className={styles.terms}>
            <h2 className={styles.terms_mainTitle}>Terms and Conditions</h2>

            <div className={styles.terms_block}>
              <h3 className={styles.terms_subTitle}>Payments</h3>

              <ul className={styles.terms_list}>
                <li>
                  If you are purchasing your ticket using a debit or credit card
                  via the Website, we will process these payments via the
                  automated secure common payment gateway which will be subject
                  to fraud screening purposes.
                </li>
                <li>
                  If you do not supply the correct card billing address and/or
                  cardholder information, your booking will not be confirmed and
                  the overall cost may increase. We reserve the right to cancel
                  your booking if payment is declined for any reason or if you
                  have supplied incorrect card information. If we become aware
                  of, or is notified of, any fraud or illegal activity
                  associated with the payment for the booking, the booking will
                  be cancelled and you will be liable for all costs and expenses
                  arising from such cancellation, without prejudice to any
                  action that may be taken against us.
                </li>
                <li>
                  Golobe may require the card holder to provide additional
                  payment verification upon request by either submitting an
                  online form or visiting the nearest Golobe office, or at the
                  airport at the time of check-in. Golobe reserves the right to
                  deny boarding or to collect a guarantee payment (in cash or
                  from another credit card) if the card originally used for the
                  purchase cannot be presented by the cardholder at check-in or
                  when collecting the tickets, or in the case the original
                  payment has been withheld or disputed by the card issuing
                  bank. Credit card details are held in a secured environment
                  and transferred through an internationally accepted system.
                </li>
              </ul>
            </div>

            <div className={styles.terms_contact}>
              <h3 className={styles.terms_subTitle}>Contact Us</h3>

              <p className={styles.terms_contactText}>
                If you have any questions about our Website or our Terms of Use,
                please contact:
              </p>

              <address className={styles.terms_address}>
                Golobe Group Q.C.S.C
                <br />
                Golobe Tower
                <br />
                P.O. Box: 22550
                <br />
                Doha, State of Qatar
              </address>

              <p className={styles.terms_further}>
                Further contact details can be found at{" "}
                <a
                  href="https://golobe.com/help"
                  target="_blank"
                  rel="noreferrer"
                >
                  golobe.com/help
                </a>
              </p>
            </div>
          </div>
        </div>

        <Subscribe />
        <Footer />
      </div>
    </section>
  );
}