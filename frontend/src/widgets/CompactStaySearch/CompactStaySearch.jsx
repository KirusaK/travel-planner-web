import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./CompactStaySearch.module.scss";
import sprite from "../../shared/assets/icons/symbol-defs.svg";

export const CompactStaySearch = () => {
  const [params] = useSearchParams();
  // у полі одразу стоїть те, що шукали (з адреси)
  const [destination, setDestination] = useState(
    params.get("destination") ?? "",
  );
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = destination.trim();
    navigate(
      q ? `/HotelPage?destination=${encodeURIComponent(q)}` : "/HotelPage",
    );
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
