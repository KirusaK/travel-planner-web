import { Card } from "../../shared/ui/Card/Card";
import styles from "./FallIntoTravel.module.scss";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getHotels } from "../../shared/api/hotels.js";

const fetchLatestHotels = async () => {
  const hotels = await getHotels();
  return [...hotels].sort((a, b) => b.id - a.id).slice(0, 4);
};

export const FallIntoTravel = ({ toCard, placeholder }) => {
  const { data: hotels } = useFetchData(fetchLatestHotels);

  const cards = [...hotels.map(toCard), ...placeholder.slice(hotels.length)];

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
            <Card hotel={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
