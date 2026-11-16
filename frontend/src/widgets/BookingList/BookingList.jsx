import styles from "./BookingList.module.scss";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {getMyBookings} from "../../shared/api/bookings.js";
import {getFiltered} from "../../shared/lib/filtered.js";
import {EmptyFavouritesHistory} from "../../shared/ui/EmptyFavouritesHistory/EmptyFavouritesHistory.jsx";
import {BookingCardHistory} from "../BookingCardHistory/BookingCardHistory.jsx";

export const BookingList = ({activeTab}) => {
    const {data: data = [], loading, error} = useFetchData(getMyBookings);

    if (loading) return <p>Loading history...</p>
    if (error) return <p>Error: {error}</p>;

    const currentList = getFiltered({data, activeTab});

    if (currentList.length === 0) {
        return <EmptyFavouritesHistory />
    }

    return (
        <div>
            <section className={styles.list}>
                {currentList.map((booking) => (
                    <BookingCardHistory key={booking.id} item={booking} />
                ))}
            </section>
        </div>
    )
}