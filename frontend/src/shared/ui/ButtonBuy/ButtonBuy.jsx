import styles from "./ButtonBuy.module.scss";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ButtonBuy = ({itemType, itemId, title, price, selectedCardId}) => {
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
    userId: user.id,
    cardId: selectedCardId,
    itemType: itemType, // 'flight' или 'hotel'
    itemId: String(itemId),
    title: title,
    totalPrice: rawPrice,
  };

  try {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingPayload),
    })

    if (!res.ok) {
      throw new Error("Failed to create booking");
    }

    const newBooking = await res.json();
    navigate(`/booking-success/${newBooking.id}`)
  } catch (err) {
    console.error("Booking error:", err);
    alert("Error processing booking. Please try again.");
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