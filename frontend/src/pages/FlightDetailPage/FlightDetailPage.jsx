import { Header } from "../../widgets/Header/Header.jsx";
import { FlightDetailInfo } from "../../widgets/FlightDetailInfo/FlightDetailInfo.jsx";
import { FlightDetailFeatures } from "../../widgets/FlightDetailFeatures/FlightDetailFeatures.jsx";
import { FlightPolicies } from "../../widgets/FlightPolicies/FlightPolicies.jsx";
import { FlightDetailTicket } from "../../widgets/FlightDetailTicket/FlightDetailTicket.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { tickets } from "../../entities/flight/index.js";
import styles from "./FlightDetailPage.module.scss";

export const FlightDetailPage = () => {
  const { id } = useParams();

  const ticket = tickets.find((item) => item.id === id);

  if (!ticket) {
    console.log("No ticket found");
    return null;
  }

  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FlightDetailInfo
            airlineName={ticket.airlineName}
            price={ticket.price}
            ratingStatus={ticket.ratingStatus}
            reviewsCount={ticket.reviewsCount}
            airport={ticket.airport}
            rating={ticket.rating}
          />
          <div className={styles.block_img}></div>
          <FlightDetailFeatures />
          <FlightPolicies />
          <FlightDetailTicket
            flightTime={ticket.flightTime}
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
