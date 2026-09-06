import { useState } from "react";
import sprite from "../../../../shared/assets/icons/symbol-defs.svg";
import styles from "../../BookingForm.module.scss";

export const TripSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Return", "One-way"];

  return (
    <div className={styles.wrapper_trip} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.wrapper_trip}>
        <label className={styles.wrapper_trip_label}>Trip</label>
        <div className={styles.wrapper_trip_content}>
          <span className={styles.wrapper_trip_content_one}>{value}</span>
          <svg width={24} height={24} className={styles.wrapper_trip_icon}>
            <use href={sprite + "#icon-chevron_down"}></use>
          </svg>
        </div>
      </div>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />

          <ul className={styles.dropdown_menu}>
            {options.map((option) => (
              <li
                key={option}
                className={styles.dropdown_item}
                onClick={() => onChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
