import { FlightCard } from "../FlightCard/FlightCard.jsx";
import {HotelCard} from "../HotelCard/HotelCard.jsx";
import styles from "./FavouritesList.module.scss";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {EmptyFavouritesHistory} from "../../shared/ui/EmptyFavouritesHistory/EmptyFavouritesHistory.jsx";
import {getFavourites} from "../../shared/api/favourites.js";
import {useCallback} from "react";
import {getFlights} from "../../shared/api/flights.js";
import {getHotels} from "../../shared/api/hotels.js";

export const FavouritesList = ({activeTab}) => {
    const isFlights = activeTab === "flights";

    const fetchItems = useCallback(async () => {
        const [favs, all] = await Promise.all([
            getFavourites(isFlights ? "flight" : "hotel"),
            isFlights ? getFlights() : getHotels(),
        ]);

        const ids = new Set(favs.map((f) => String(f.item_id)));
        return all.filter((item) => ids.has(String(item.id)));
    }, [isFlights]);

    const {data: data = [], loading, error} = useFetchData(fetchItems);

    if (loading) return <p>Loading history...</p>
    if (error) return <p>Error: {error}</p>;
    if (data.length === 0) return <EmptyFavouritesHistory subTitle="You don't have any favourites in this category yet."/>;

    return (
        <section>
            <div className={styles.list}>
                {data.map((item) => isFlights ? (
                    <FlightCard key={item.id} item={item} />
                ) : (
                    <HotelCard key={item.id} item={item} />
                    ),
                )}
            </div>
        </section>
    );
};