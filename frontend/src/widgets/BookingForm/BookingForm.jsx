import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripSelect } from "./ui/TripSelect/TripSelect";
import { PassengerSelect } from "./ui/PassengerSelect/PassengerSelect";
import { useDispatch } from "react-redux";
import { setFlightSearch } from "../../app/store/reducer/flightSlice.js";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./BookingForm.module.scss";

export const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Локальные стейты
  const [routeInput, setRouteInput] = useState(""); // Стейт для поля From - to
  const [tripType, setTripType] = useState(""); // Стейт для поля Trip
  const [dates, setDates] = useState(""); // Стейт для поля Depart -Return
  const [passengerType, setPassengerType] = useState({
    count: 1,
    class: "Economy",
  }); // Стейт для поля Passenger - Class

  const handleSubmit = (e) => {
    e.preventDefault();

    const [cityFrom, cityTo] = routeInput.split("-").map((str) => str.trim());

    const searchPayload = {
      from: cityFrom || "",
      to: cityTo || "",
      trip: tripType,
      depart: dates,
      return: "",
      passenger: passengerType.count,
      flightClass: passengerType.class,
    };

    dispatch(setFlightSearch(searchPayload));
    navigate("/FlightsPage");

    console.log("Данные отправлены в store: ", searchPayload);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.wrapper_title}>Where are you flying? </h2>

      <form
        id="flightSearchFrom"
        className={styles.wrapper_container}
        onSubmit={handleSubmit}
      >
        {/* Поле From-To */}
        <div className={styles.wrapper_from}>
          <div className={styles.wrapper_from_input}>
            <label className={styles.wrapper_from_label}>From - To</label>
            <input
              type="text"
              className={styles.wrapper_from_input_field}
              value={routeInput}
              onChange={(e) => setRouteInput(e.target.value)}
            />
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
            <input
              type="date"
              className={styles.wrapper_depart_input_field}
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>
        </div>
        {/* Поле Passengers - Class */}
        <PassengerSelect value={passengerType} onChange={setPassengerType} />
      </form>
      <div className={styles.wrapper_submit_container}>
        <div className={styles.wrapper_submit}>
          <button
            className={styles.wrapper_submit_link}
            type="submit"
            form="flightSearchFrom"
          >
            <svg width={16} height={16}>
              <use href={sprite + "#icon-Paper-Plane"}></use>
            </svg>
            <span className={styles.wrapper_submit_text}>Show Filghts</span>
          </button>
        </div>
      </div>
    </section>
  );
};
