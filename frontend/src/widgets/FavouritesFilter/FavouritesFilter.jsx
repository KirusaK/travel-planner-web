import styles from "./FavouritesFilter.module.scss";
import { useState } from "react";

export const FavouritesFilter = () => {
  const [activeTab, setActiveTab] = useState("flights");

  const setFlights = () => {
    setActiveTab("flights");
  };

  const setPlaces = () => {
    setActiveTab("places");
  }

  return (
    <section className={styles.favourites}>
      <h1 className={styles.favourites_title}>Favourites</h1>

      <div className={styles.favourites_tabs}>
        <button
          type="button"
          onClick={setFlights}
          className={`${styles.favourites_tab} ${activeTab === "flights" ? styles.active : ""}`}
        >
          Flights
        </button>

        <button
          type="button"
          onClick={setPlaces}
          className={`${styles.favourites_tab} ${activeTab === "places" ? styles.active : ""}`}
        >
          Places
        </button>
      </div>
    </section>
  );
}