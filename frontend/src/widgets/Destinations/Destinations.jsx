import { Link } from "react-router-dom";
import { DestinationsCard } from "../../shared/ui/DestinationsCard/DestinationsCard";
import img1 from "../../shared/assets/image/istanbul.svg";
import img2 from "../../shared/assets/image/Sydney.svg";
import img3 from "../../shared/assets/image/Baku.svg";
import img4 from "../../shared/assets/image/Malé.svg";
import img5 from "../../shared/assets/image/Paris.svg";
import img6 from "../../shared/assets/image/NewYork.svg";
import img7 from "../../shared/assets/image/London.svg";
import img8 from "../../shared/assets/image/Tokyo.svg";
import img9 from "../../shared/assets/image/Dubai.svg";
import styles from "./Destinations.module.scss";

export const Destinations = () => {
  const destinations = [
    { id: 1, city: "Istanbul", country: "Turkey", img: img1 },
    { id: 2, city: "Sydney", country: "Australia", img: img2 },
    { id: 3, city: "Baku", country: "Azerbaijan", img: img3 },
    { id: 4, city: "Malé", country: "Maldives", img: img4 },
    { id: 5, city: "Paris", country: "France", img: img5 },
    { id: 6, city: "New York", country: "US", img: img6 },
    { id: 7, city: "London", country: "TurkUKey", img: img7 },
    { id: 8, city: "Tokyo", country: "Japan", img: img8 },
    { id: 9, city: "Dubai", country: "UAE", img: img9 },
  ];

  return (
    <section className={styles.Destinations}>
      <div className={styles.Destinations__container}>
        <div className={styles.Destinations__header}>
          <div className={styles.Destinations__text}>
            <h1 className={styles.Destinations__title}>
              Plan your perfect trip
            </h1>
            <p className={styles.Destinations__p}>
              Search Flights & Places Hire to our most popular destinations
            </p>
          </div>
          <Link className={styles.Destinations__link}>
            <h3 className={styles.Destinations__button}>SEE MORE PLACES</h3>
          </Link>
        </div>
        <div className={styles.Destinations__info}>
          {destinations.map((item) => (
            <DestinationsCard
              key={item.id}
              city={item.city}
              country={item.country}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
