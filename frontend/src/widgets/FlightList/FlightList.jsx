import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { tickets } from "../../entities/flight/index.js";
import { FlightCard } from "../FlightCard/FlightCard.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightList.module.scss";

export const FlightList = () => {
  const { from, to, flightClass } = useSelector(
    (state) => state.flight.searchParams,
  );

  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    if (!from && !to) {
      setFilteredTickets(tickets);
      return;
    }

    const result = tickets.filter((ticket) => {
      return (
        ticket.from.toLowerCase() === from.toLowerCase() &&
        ticket.to.toLowerCase() === to.toLowerCase() &&
        ticket.flightClass.toLowerCase() === flightClass.toLowerCase()
      );
    });

    setFilteredTickets(result);
  }, [from, to, flightClass]);

  return (
    <div>
      <div className={styles.sorting_results}>
        <p>
          <strong>Showing {filteredTickets.length} of</strong>{" "}
          <span>{tickets.length} places</span>
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