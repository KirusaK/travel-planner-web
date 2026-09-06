import { useState } from "react";
import sprite from "../../../../shared/assets/icons/symbol-defs.svg";
import styles from "../../BookingForm.module.scss";

export const PassengerSelect = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const options = ["Economy", "Business", "First"];

  const displayValue = `${value.count} Passengers, ${value.class}`;

  const handleCountChange = (step) => {
    const newCount = Math.max(1, value.count + step);
    onChange({ ...value, count: newCount });
  };

  return (
    <div
      className={`${styles.wrapper_passengers} ${className || ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <label className={styles.wrapper_passengers_label}>
        Passenger - Class
      </label>
      <div className={styles.wrapper_passengers_content}>
        <span className={styles.wrapper_passengers_content_text}>
          {displayValue}
        </span>
        <svg width={24} height={24} className={styles.wrapper_passengers_icon}>
          <use href={sprite + "#icon-chevron_down"}></use>
        </svg>
      </div>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />

          <div
            className={styles.passenger}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.passenger_dropdown_section}>
              <span className={styles.passenger_dropdown_span}>Passengers</span>
              <div className={styles.passenger_dropdown_controls}>
                <button
                  type="button"
                  className={styles.passenger_dropdown_button}
                  onClick={() => handleCountChange(-1)}
                >
                  -
                </button>
                <span>{value.count}</span>
                <button
                  type="button"
                  className={styles.passenger_dropdown_button}
                  onClick={() => handleCountChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.passenger_class_section}>
              <span className={styles.passenger_dropdown_span}>Class</span>
              <ul className={styles.passenger_class_list}>
                {options.map((option) => (
                  <li
                    key={option}
                    className={styles.passenger_class_item}
                    onClick={() => onChange({ ...value, class: option })}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
