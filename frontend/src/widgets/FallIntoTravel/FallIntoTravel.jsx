import { Card } from "../../shared/ui/Card/Card";
import { SeeAll } from "../../shared/ui/ButtonSeeAll/SeeAll";
import rect3 from "../../shared/assets/image/Rectangle3.svg";
import rect4 from "../../shared/assets/image/Rectangle4.svg";
import rect5 from "../../shared/assets/image/Rectangle5.svg";
import rect6 from "../../shared/assets/image/Rectangle6.svg";
import styles from "./FallIntoTravel.module.scss";

export const FallIntoTravel = () => {
  const DATA = [
    {
      id: 1,
      title: "Melbourne",
      par: "An amazing journey",
      price: 700,
      image: rect3,
    },
    {
      id: 2,
      title: "Paris",
      par: "A Paris Adventure",
      price: 600,
      image: rect4,
    },
    {
      id: 3,
      title: "London",
      par: "London eye adventure",
      price: 350,
      image: rect5,
    },
    {
      id: 4,
      title: "Columbia",
      par: "Amazing streets",
      price: 700,
      image: rect6,
    },
  ];

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
          <SeeAll />
        </div>

        <div className={styles.FallIntoTravel__grid}>
          {DATA.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              par={item.par}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
