import { useState } from "react";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { TripSelect } from "../BookingForm/ui/TripSelect/TripSelect";
import { PassengerSelect } from "../BookingForm/ui/PassengerSelect/PassengerSelect";
import styles from "./CompactBookingForm.module.scss";

export const CompactBookingForm = () => {
  const [tripType, setTripType] = useState("");
  const [passengerType, setPassengerType] = useState({
    count: 1,
    class: "Economy",
  });

  return (
    <section className={styles.wrapper}>
      <form className={styles.wrapper_container}>
        {/* Поле From-To */}
        <div className={styles.wrapper_from}>
          <div className={styles.wrapper_from_input}>
            <label className={styles.wrapper_from_label}>From - To</label>
            <input type="text" className={styles.wrapper_from_input_field} />
            <svg width={24} height={24} className={styles.wrapper_from_icon}>
              <use href={sprite + "#icon-ion_swap-horizontal"}></use>
            </svg>
          </div>
        </div>
        {/* Поле Trip */}
        <TripSelect value={tripType} onChange={setTripType} />
        {/* Поле Depart-Return */}
        <div className={styles.wrapper_depart}>
          <div className={styles.wrapper_depart_input}>
            <label className={styles.wrapper_depart_label}>
              Depart- Return
            </label>
            <input type="date" className={styles.wrapper_depart_input_field} />
          </div>
        </div>
        {/* Поле Passengers - Class */}
        <PassengerSelect
          value={passengerType}
          onChange={setPassengerType}
          className={styles.wrapper_passengers_compact}
        />

        <button className={styles.wrapper_submit} type="submit">
          <svg width={24} height={24}>
            <use href={sprite + "#icon-Search"}></use>
          </svg>
        </button>
      </form>
    </section>
  );
};
