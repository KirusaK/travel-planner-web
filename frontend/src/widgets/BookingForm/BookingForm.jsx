import { useState } from "react";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { Link } from "react-router-dom";
import { TripSelect } from "./ui/TripSelect/TripSelect";
import { PassengerSelect } from "./ui/PassengerSelect/PassengerSelect";
import styles from "./BookingForm.module.scss";

export const BookingForm = () => {
  const [tripType, setTripType] = useState("");
  const [passengerType, setPassengerType] = useState({
    count: 1,
    class: "Economy",
  });

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper_title}>Where are you flying? </h2>

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
        <PassengerSelect value={passengerType} onChange={setPassengerType} />
      </form>
      <div className={styles.wrapper_submit_container}>
        <div className={styles.wrapper_submit}>
          <Link className={styles.wrapper_submit_link} to="/">
            <svg width={16} height={16}>
              <use href={sprite + "#icon-Paper-Plane"}></use>
            </svg>
            <span className={styles.wrapper_submit_text}>Show Filghts</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
