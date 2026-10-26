import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FlightCard } from "../FlightCard/FlightCard.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightList.module.scss";
import {getFlights} from "../../shared/api/flights.js";

export const FlightList = () => {
  const { from, to, flightClass } = useSelector(
    (state) => state.flight.searchParams,
  );

  const [allFlights, setAllFlights] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   getFlights()
       .then((data) => setAllFlights(data))
       .catch((err) => setError(err.message))
       .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!from && !to) {
      setFilteredTickets(allFlights);
      return;
    }

    const result = allFlights.filter((ticket) => {
      return (
        ticket.from.toLowerCase() === from.toLowerCase() &&
        ticket.to.toLowerCase() === to.toLowerCase() &&
        ticket.flightClass.toLowerCase() === flightClass.toLowerCase()
      );
    });

    setFilteredTickets(result);
  }, [from, to, flightClass, allFlights]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className={styles.sorting_results}>
        <p>
          <strong>Showing {filteredTickets.length} of</strong>{" "}
          <span>{allFlights.length} places</span>
        </p>
        <div className={styles.sorting_selectWrapper}>
          <p>
            Sort by <strong> Recommended</strong>
          </p>
          <svg width={18} height={18}>
            <use href={sprite + "#icon-chevron_down"} />
          </svg>
        </div>
      </div>

      <section className={styles.flightCards_container}>
        {filteredTickets.map((ticket) => (
          <FlightCard key={ticket.id} item={ticket} />
        ))}
      </section>

      <button className={styles.flightCard_last__btn}>Show more results</button>
    </div>
  );
}