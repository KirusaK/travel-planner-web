import styles from "./ButtonBuy.module.scss";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {createBookings} from "../../api/bookings.js";

export const ButtonBuy = ({itemType, itemId, title, price, selectedCardId, paymentType}) => {
const {user } = useAuth();
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

const handleBuy = async () => {
  if (!user) {
    alert("Please login or sign up to book!");
    return;
  }

  if (!selectedCardId) {
    alert("Please select a payment card!");
    return;
  }

  const rawPrice = typeof price === "string" ? parseFloat(price.replace("$", "")) : price;

  const bookingPayload = {
    cardId: selectedCardId,
    itemType: itemType, // 'flight' или 'hotel'
    itemId: String(itemId),
    title: title,
    totalPrice: rawPrice,
    paymentType: paymentType,

  };

  try {
    setLoading(true);
    const newBooking = await createBookings(bookingPayload);
    navigate(`/booking-success/${newBooking.id}`)
  } catch (err) {
    console.error("Booking error:", err);
    alert(err.message || "Error processing booking. Please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <section className={styles.buttonBuy}>
      <button className={styles.buttonBuy_btn} onClick={handleBuy} disabled={loading}>{loading ? "Processing..." : "Buy"}</button>
    </section>
  );
};