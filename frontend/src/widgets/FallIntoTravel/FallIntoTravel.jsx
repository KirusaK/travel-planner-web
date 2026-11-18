import { Card } from "../../shared/ui/Card/Card";
import styles from "./FallIntoTravel.module.scss";
import img1 from "../../shared/assets/image/Rectangle3.svg";
import img2 from "../../shared/assets/image/Rectangle4.svg";
import img3 from "../../shared/assets/image/Rectangle5.svg";
import img4 from "../../shared/assets/image/Rectangle6.svg";
import { getFlights } from "../../shared/api/flights.js";
import { getHotels } from "../../shared/api/hotels.js";
import { useFetchData } from "../../shared/hooks/useFetchData.js";

const images = [img1, img2, img3, img4];
const count = 2;

const byRating = (a, b) =>
  (b.rating ?? 0) - (a.rating ?? 0) ||
  (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0) ||
  b.id - a.id;

const fetchTopItems = async () => {
  const [flight, hotel] = await Promise.all([getFlights(), getHotels()]);

  const topFlight = [...flight]
    .sort(byRating)
    .slice(0, count)
    .map((flight, index) => ({
      id: `flight-${flight.id}`,
      name: flight.airlineName,
      info: flight.rating,
      price: flight.price,
      image: images[index % images.length],
      to: `/flight-detail/${flight.id}`,
    }));

  const topHotel = [...hotel]
    .sort(byRating)
    .slice(0, count)
    .map((hotel, index) => ({
      id: `hotel-${hotel.id}`,
      name: hotel.name,
      info: hotel.rating,
      price: hotel.pricePerNight,
      image: hotel.cover || images[(index + count) % images.length],
      to: `/hotel-detail/${hotel.id}`,
    }));

  return [...topFlight, ...topHotel];
};

export const FallIntoTravel = () => {
  const { data: cards, loading, error } = useFetchData(fetchTopItems);

  if (loading || error || cards.length === 0) return null;

  return (
    <div className={styles.FallIntoTravel__container}>
      <div className={styles.FallIntoTravel}>
        <div className={styles.FallIntoTravel__header}>
          <div className={styles.FallIntoTravel__text}>
            <h1 className={styles.FallIntoTravel__title}>Fall into travel</h1>
            <p className={styles.FallIntoTravel__p}>
              Going somewhere to celebrate this season? Whether you’re going
              home or somewhere to roam, we’ve got the travel tools to get you
              to your destination.
            </p>
          </div>
        </div>

        <div className={styles.FallIntoTravel__grid}>
          {cards.map((item) => (
            <Card data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
