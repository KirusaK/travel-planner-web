import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./CompactStaySearch.module.scss";
import sprite from "../../shared/assets/icons/symbol-defs.svg";

export const CompactStaySearch = () => {
  const [params] = useSearchParams();
  // у полях одразу стоїть те, що шукали (з адреси)
  const [destination, setDestination] = useState(
    params.get("destination") ?? "",
  );
  const [checkIn, setCheckIn] = useState(params.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(params.get("checkOut") ?? "");
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = new URLSearchParams();
    const q = destination.trim();
    if (q) search.set("destination", q);
    if (checkIn) search.set("checkIn", checkIn);
    if (checkOut) search.set("checkOut", checkOut);

    const queryString = search.toString();
    navigate(queryString ? `/HotelPage?${queryString}` : "/HotelPage");
  };

  return (
    <div>
      <section className={styles.wrapper}>
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
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <svg width={24} height={24} className={styles.wrapper_from_icon}>
                <use href={sprite + "#icon-ion_bed"}></use>
              </svg>
            </div>
          </div>

          {/* Поле Check In */}
          <div className={styles.wrapper_trip}>
            <div className={styles.wrapper_depart_input}>
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

          <button
            type="button"
            className={styles.wrapper_submit_link}
            onClick={handleSearch}
          >
            <svg width={24} height={24}>
              <use href={sprite + "#icon-Search"}></use>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};
