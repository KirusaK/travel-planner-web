import styles from "./FavouritesFilter.module.scss";
import {useLocation} from "react-router-dom";

export const FavouritesFilter = ({activeTab, setActiveTab}) => {
  const location = useLocation();
  const isFavouritesPage = location.pathname === ("/Favourites")


  const setFlights = () => {
    setActiveTab("flights");
  };

  const setPlaces = () => {
    setActiveTab("places");
  }

  return (
    <section className={styles.favourites}>
      {isFavouritesPage && (
          <h1 className={styles.favourites_title}>Favourites</h1>
      )}

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