import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { FavouritesBtn } from "../../shared/ui/FavouritesBtn/FavouritesBtn.jsx";
import logoEmirate from "../../shared/assets/image/emirates.svg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightCard.module.scss";

// Временная база данных для проверки работы Redux
const tickets = [
  {
    id: "tickets-1",
    logo: logoEmirate,
    airlineName: "Emirates",
    rating: "4.2",
    ratingStatus: "Very Good",
    reviewsCount: "54 reviews",
    price: "$104",
    from: "EWR",
    to: "BNA",
    flightClass: "Economy",
    trips: [
      {
        id: "trip-1",
        time: "12:00 pm - 01:28 pm",
        type: "non stop",
        duration: "2h 28m",
        route: "EWR-BNA",
      },
      {
        id: "trip-2",
        time: "12:00 pm - 01:28 pm",
        type: "non stop",
        duration: "2h 28m",
        route: "EWR-BNA",
      },
    ],
  },

  {
    id: "tickets-2",
    logo: logoEmirate,
    airlineName: "LOT Polish Airlines",
    rating: "4.7",
    ratingStatus: "Very Good",
    reviewsCount: "120 reviews",
    price: "$20",
    from: "Mlawa",
    to: "Warszawa",
    flightClass: "Business",
    trips: [
      {
        id: "trip-3",
        time: "08:00 am - 09:30 am",
        type: "non stop",
        duration: "1h 30m",
        route: "MLA-WAW",
      },
    ],
  },
];

export const FlightCard = () => {
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
    // Главный родительский тег для всей правой контентной области
    <div className={styles.flightsPage_content}>
      {/* Строка со счетчиком результатов и сортировкой */}
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

      {/* Список карточек */}
      <div className={styles.flightCards}>
        <section className={styles.flightCards_container}>
          {filteredTickets.map((item) => (
            <article key={item.id} className={styles.flightCard}>
              <div className={styles.flightCard_logoBlock}>
                <img
                  src={item.logo}
                  alt={item.airlineName}
                  className={styles.flightCard_logo}
                />
              </div>
              <div className={styles.flightCard_content}>
                <div className={styles.flightCard_header}>
                  <div className={styles.flightCard_ratingBlock}>
                    <RatingCard value={item.rating} />
                    <span className={styles.flightCard_ratingText}>
                      <strong>{item.ratingStatus}</strong>
                      {item.reviewsCount}
                    </span>
                  </div>
                  <div className={styles.flightCard_priceBlock}>
                    <span className={styles.flightCard_priceLabel}>
                      starting from
                    </span>
                    <h2 className={styles.flightCard_priceValue}>
                      {item.price}
                    </h2>
                  </div>
                </div>

                <div className={styles.flightCard_trips}>
                  {item.trips.map((trip) => (
                    <div key={trip.id} className={styles.flightCard_tripRow}>
                      <input
                        type="checkbox"
                        className={styles.flightCard_checkbox}
                      />
                      <div className={styles.flightCard_tripRow_info}>
                        <div className={styles.flightCard_tripTimeInfo}>
                          <span className={styles.flightCard_tripTime}>
                            <strong>{trip.time}</strong>
                          </span>
                          <span className={styles.flightCard_tripAirline}>
                            {item.airlineName}
                          </span>
                        </div>
                        <div className={styles.flightCard_tripTypeBlock}>
                          <span className={styles.flightCard_tripType}>
                            {trip.type}
                          </span>
                        </div>
                        <div className={styles.flightCard_tripDurationBlock}>
                          <span className={styles.flightCard_tripDuration}>
                            {trip.duration}
                          </span>
                          <span className={styles.flightCard_tripRoute}>
                            {trip.route}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className={styles.flightCard_hr} />

                <div className={styles.flightCard_footer}>
                  <FavouritesBtn />
                  <button className={styles.flightCard_dealsBtn}>
                    View Deals
                  </button>
                </div>
              </div>
            </article>
          ))}

          <button className={styles.flightCard_last__btn}>
            Show more results
          </button>
        </section>
      </div>
    </div>
  );
};
