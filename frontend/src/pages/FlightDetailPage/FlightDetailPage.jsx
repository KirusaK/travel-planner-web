import { Header } from "../../widgets/Header/Header.jsx";
import { FlightDetailInfo } from "../../widgets/FlightDetailInfo/FlightDetailInfo.jsx";
import { FlightDetailFeatures } from "../../widgets/FlightDetailFeatures/FlightDetailFeatures.jsx";
import { FlightPolicies } from "../../widgets/FlightPolicies/FlightPolicies.jsx";
import { FlightDetailTicket } from "../../widgets/FlightDetailTicket/FlightDetailTicket.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import styles from "./FlightDetailPage.module.scss";
import { useEffect, useState } from "react";
import { getFlightById } from "../../shared/api/flights.js";
import { getRatingStatus } from "../../shared/lib/format.js";

export const FlightDetailPage = () => {
  const { id } = useParams();

  const [ticket, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getFlightById(id)
      .then((data) => setTickets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!ticket) return null;

  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FlightDetailInfo
            id={ticket.id}
            airlineName={ticket.airlineName}
            price={ticket.price}
            ratingStatus={getRatingStatus(ticket.rating)}
            reviewsCount={ticket.reviewsCount}
            airport={ticket.airport}
            rating={ticket.rating}
          />
          <div className={styles.block_img}></div>
          <FlightDetailFeatures />
          <FlightPolicies airlineName={ticket.airlineName} />
          <FlightDetailTicket
            airlineName={ticket.airlineName}
            logo={ticket.logo}
            trips={ticket.trips}
          />
        </div>
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};
