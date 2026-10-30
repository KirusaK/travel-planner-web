import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminFlight.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import {AdminFlightsTable} from "../../widgets/AdminFlightsTable/AdminFlightsTable.jsx";
import { useState } from "react";
import { AdminModalFlight } from "../../widgets/AdminFlightModal/AdminModalFlight.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getFlights } from "../../shared/api/flights.js";

export const AdminFlight = () => {
  const [isMoadalOpen, setIsMoadalOpen] = useState(false);
  const { data: flights = [], setData: setFlights, loading, error } = useFetchData(getFlights);

  const flightsCount = flights.length;

  const handleDeleteFlight = async (flightId) => {
    if (!window.confirm("Are you sure you want to delete flight?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/flights/${flightId}`, {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete flight");
      setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== flightId));
    } catch (err) {
      console.error("Error deleting flight:", err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <div className={styles.body_headerBlock}>
              <div className={styles.body_headerBlock_info}>
                <h1 className={styles.body_headerBlock_title}>
                  Flight Management
                </h1>
                <p className={styles.body_headerBlock_subtitle}>
                  {flightsCount} flights listed on Golobe
                </p>
              </div>

              <button
                className={styles.body_headerBlock_btn}
                onClick={() => setIsMoadalOpen(true)}
              >
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-Frame7"} />
                </svg>
                Add New Flight
              </button>
            </div>

            <AdminFlightsTable flights={flights} onDelete={handleDeleteFlight} />

            <AdminModalFlight
              isOpen={isMoadalOpen}
              isClose={() => setIsMoadalOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};