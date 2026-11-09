import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./StaySearch.module.scss";

export const StaySearch = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  const params = new URLSearchParams();
  const q = destination.trim();
  if (q) params.set("destination", q);
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);

  const queryString = params.toString();
  const searchUrl = queryString ? `/HotelPage?${queryString}` : "/HotelPage";

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper_title}>Where are you flying? </h2>

      <div className={styles.wrapper_container}>
        {/* Поле Enter Destination */}
        <div className={styles.wrapper_from}>
          <div className={styles.wrapper_from_input}>
            <label className={styles.wrapper_from_label}>
              Enter Destination
            </label>
            <input
              type="text"
              className={styles.wrapper_from_input_field}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate(searchUrl)}
            />
            <svg width={24} height={24} className={styles.wrapper_from_icon}>
              <use href={sprite + "#icon-ion_bed"}></use>
            </svg>
          </div>
        </div>

        {/* Поле Check In */}
        <div className={styles.wrapper_trip}>
          <div className={styles.wrapper_trip}>
            <label className={styles.wrapper_trip_label}>Check In</label>
            <input
              type="date"
              className={styles.wrapper_depart_input_field}
              value={checkIn}
              onChange={(e) => {
                const value = e.target.value;
                setCheckIn(value);
                // якщо виїзд раніше нового заїзду - скидаємо його
                if (checkOut && value && checkOut < value) setCheckOut("");
              }}
            />
          </div>
        </div>

        {/* Поле Check Out */}
        <div className={styles.wrapper_depart}>
          <div className={styles.wrapper_depart_input}>
            <label className={styles.wrapper_depart_label}>Check Out</label>
            <input
              type="date"
              className={styles.wrapper_depart_input_field}
              value={checkOut}
              min={checkIn || undefined}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Поле Rooms & Guests */}
        <div className={styles.wrapper_passengers}>
          <label className={styles.wrapper_passengers_label}>
            Rooms & Guests
          </label>
          <div className={styles.wrapper_passengers_content}>
            <svg
              width={24}
              height={24}
              className={styles.wrapper_passengers_icon_left}
            >
              <use href={sprite + "#icon-User"}></use>
            </svg>
            <span className={styles.wrapper_passengers_content_text}>
              1 room, 2 guests
            </span>
            <svg
              width={24}
              height={24}
              className={styles.wrapper_passengers_icon_right}
            >
              <use href={sprite + "#icon-chevron_down"}></use>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.wrapper_submit_container}>
        <div className={styles.wrapper_submit}>
          <Link to={searchUrl} className={styles.wrapper_submit_link}>
            <svg width={16} height={16}>
              <use href={sprite + "#icon-building"}></use>
            </svg>
            <span className={styles.wrapper_submit_text}>Show Places</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
