import { useSelector } from "react-redux";
import { selectFavourites } from "../../app/store/reducer/favouritesSlice.js";
import { FlightCard } from "../FlightCard/FlightCard.jsx";
import {HotelCard} from "../HotelCard/HotelCard.jsx";
import styles from "./FavouritesList.module.scss";

export const FavouritesList = ({activeTab}) => {
  const favorites = useSelector(selectFavourites);

  const favouriteFlights = favorites.filter(
    (item) => item.trips || item.airlineName
  );

  const favouritePlaces = favorites.filter((item) => item.hotelName || item.location);

  const currentList =
    activeTab === "flights" ? favouriteFlights : favouritePlaces;

  if (currentList.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No favourites added yet</h2>
        <p>
          Explore flights or places and click the heart icon to save them here.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div>
        {activeTab === "flights"
          ? currentList.map((flight) => (
              <FlightCard key={flight.id} item={flight} />
            ))
          : currentList.map((place) => (
              <HotelCard key={place.id} item={place} />
            ))}
      </div>
    </section>
  );
};