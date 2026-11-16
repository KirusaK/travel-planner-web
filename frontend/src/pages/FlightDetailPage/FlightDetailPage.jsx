import { Header } from "../../widgets/Header/Header.jsx";
import { FlightDetailInfo } from "../../widgets/FlightDetailInfo/FlightDetailInfo.jsx";
import { FlightDetailFeatures } from "../../widgets/FlightDetailFeatures/FlightDetailFeatures.jsx";
import { FlightPolicies } from "../../widgets/FlightPolicies/FlightPolicies.jsx";
import { FlightDetailTicket } from "../../widgets/FlightDetailTicket/FlightDetailTicket.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { getFlightById } from "../../shared/api/flights.js";
import { useFetch } from "../../shared/hooks/useFetch.js";
import styles from "./FlightDetailPage.module.scss";
import { DetailReviews } from "../../widgets/DetailReviews/DetailReviews.jsx";
import { useState } from "react";
import { ModalReviews } from "../../shared/ui/ModalReviews/ModalReviews.jsx";

export const FlightDetailPage = () => {
  const { id } = useParams();
  const { data: flight, loading, error } = useFetch(getFlightById, id);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!flight) return null;

  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FlightDetailInfo flight={flight} />
          <div className={styles.block_img}></div>
          <FlightDetailFeatures flight={flight} />
          <FlightPolicies flight={flight} />
          <FlightDetailTicket flight={flight} />
          <DetailReviews data={flight} isOpen={handleModalOpen} />
        </div>
        <Subscribe />
        <Footer />

        <ModalReviews
          modal={isModalOpen}
          onClose={handleModalClose}
          title={flight.airlineName}
        />
      </div>
    </div>
  );
};
