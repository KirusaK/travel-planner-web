import styles from "./BookingList.module.scss";
import {FlightCardHistory} from "../FlightCartHistory/FlightCardHistory.jsx";
import {HotelCardHistory} from "../HotelCartHistory/HotelCardHistory.jsx";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {getBookings} from "../../shared/api/bookings.js";
import {getFiltered} from "../../shared/lib/filtered.js";
import {EmptyFavouritesHistory} from "../../shared/ui/EmptyFavouritesHistory/EmptyFavouritesHistory.jsx";

export const BookingList = ({activeTab}) => {
    const {data: data = [], loading, error} = useFetchData(getBookings);

    if (loading) return <p>Loading history...</p>
    if (error) return <p>Error: {error}</p>;

    const currentList = getFiltered({data, activeTab});

    if (currentList.length === 0) {
        return <EmptyFavouritesHistory />
    }

    return (
        <div>
            <section className={styles.list}>
                {activeTab === "flights"
                    ? currentList.map((flight) => (
                        <FlightCardHistory key={flight.id} item={flight} />
                    ))
                    : currentList.map((place) => (
                        <HotelCardHistory key={place.id} item={place} />
                    ))}
            </section>
        </div>
    )
}