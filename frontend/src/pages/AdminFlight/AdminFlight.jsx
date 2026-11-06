import styles from "./AdminFlight.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import {AdminFlightsTable} from "../../widgets/AdminFlightsTable/AdminFlightsTable.jsx";
import { useState } from "react";
import { AdminModalFlight } from "../../widgets/AdminFlightModal/AdminModalFlight.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import {deleteFlight, getFlightById, getFlights} from "../../shared/api/flights.js";
import {ButtonNewAdd} from "../../shared/ui/ButtonNewAdd/ButtonNewAdd.jsx";

export const AdminFlight = () => {
  const [isMoadalOpen, setIsMoadalOpen] = useState(false);
  const [editingFlightId, setEditingFlightId] = useState(null);
  const [initialModalData, setInitialModalData] = useState(null);
  const { data: flights = [], loading, error, refetch } = useFetchData(getFlights);

  const flightsCount = flights.length;

  const handleDeleteFlight = async (id) => {
    if (!window.confirm("Are you sure you want to delete flight?")) return;

    try {
      await deleteFlight(id);
      await refetch();
    } catch (err) {
      console.error("Error deleting flight:", err.message);
    }
  }

  const handleOpenEditModal = async (id) => {
    try {
      const flight = await getFlightById(id);

      setEditingFlightId(id);
      setInitialModalData({
        airlineName: flight.airlineName,
        airlineLogo: flight.logo || "",
        flightClass: flight.flightClass || "Economy",
        airportLocation: flight.airport,
        fromAirport: flight.from,
        toAirport: flight.to,
        basePrice: flight.price,
        segments: flight.trips.map((trip) => ({
          segmentLabel: trip.direction,
          departureTime: trip.departureTime,
          arrivalTime: trip.arrivalTime,
          departureAirport: trip.departureAirport,
          arrivalAirport: trip.arrivalAirport,
          date: trip.date,
          flightType: trip.stops,
          status: trip.status,
          aircraftType: trip.aircraft || "",
          durationMinutes: trip.durationMinutes,
        })),
      });

      setIsMoadalOpen(true);
    } catch (err) {
      console.error("Error loading flight for edit:", err.message);
    }
  }

  const handleOpenCreateModal =  () => {
    setEditingFlightId(null);
    setInitialModalData(null);
    setIsMoadalOpen(true)
  }

  const handleCloseModal = () => {
    setIsMoadalOpen(false);
    setEditingFlightId(null);
    setInitialModalData(null);
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

              <ButtonNewAdd onClick={handleOpenCreateModal} title="Add New Flight" />
            </div>

            <AdminFlightsTable flights={flights} onDelete={handleDeleteFlight} onUpdate={handleOpenEditModal} />

            <AdminModalFlight
              isOpen={isMoadalOpen}
              isClose={handleCloseModal}
              onCreated={refetch}
              editingId={editingFlightId}
              initialData={initialModalData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};