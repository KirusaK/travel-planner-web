import { Header } from "../../widgets/Header/Header.jsx";
import { FlightDetailInfo } from "../../widgets/FlightDetailInfo/FlightDetailInfo.jsx";
import { FlightDetailFeatures } from "../../widgets/FlightDetailFeatures/FlightDetailFeatures.jsx";
import { FlightPolicies } from "../../widgets/FlightPolicies/FlightPolicies.jsx";
import { FlightDetailTicket } from "../../widgets/FlightDetailTicket/FlightDetailTicket.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import styles from "./FlightDetailPage.module.scss";
import { getFlightById } from "../../shared/api/flights.js";
import { getRatingStatus } from "../../shared/lib/format.js";
import { useFetch } from "../../shared/hooks/useFetch.js";

export const FlightDetailPage = () => {
  const { id } = useParams();

  const { data: flight, loading, error } = useFetch(getFlightById, id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!flight) return null;

  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FlightDetailInfo
            id={flight.id}
            airlineName={flight.airlineName}
            price={flight.price}
            ratingStatus={getRatingStatus(flight.rating)}
            reviewsCount={flight.reviewsCount}
            airport={flight.airport}
            rating={flight.rating}
          />
          <div className={styles.block_img}></div>
          <FlightDetailFeatures />
          <FlightPolicies airlineName={flight.airlineName} />
          <FlightDetailTicket
            airlineName={flight.airlineName}
            logo={flight.logo}
            trips={flight.trips}
          />
        </div>
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};
