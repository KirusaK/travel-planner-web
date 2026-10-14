import styles from "./AdminTopRated.module.scss";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import {RatingCard} from "../../shared/ui/RatingCard/RatingCard.jsx";

export const AdminTopRated = () => {
  const hotelData = [
    { id: 1, title: "Atlantis The Palm", stars: 5, price: "520" },
    { id: 1, title: "Eresin Sultanahmet", stars: 5, price: "520" },
    { id: 1, title: "Artemide", stars: 5, price: "520" },
  ];

  const flightData = [
    { id: 1, title: "Qatar Airways", info: "DOH → JFK", rating: 4.8 },
    { id: 1, title: "Flydubai", info: "DXB → LHR", rating: 4.6 },
    { id: 1, title: "Turkish Airlines", info: "IST → FCO", rating: 4.3 },
  ];

  return (
    <section className={styles.topRated}>
      <div className={styles.topRated_header}>
        <h3 className={styles.topRated_title}>Top rated</h3>
        <p className={styles.topRated_subtitle}>Best performing inventory</p>
      </div>

      <div className={styles.topRated_group}>
        {hotelData.map((item) => (
          <div key={item.id} className={styles.topRated_item}>
            <div className={styles.topRated_left}>
              <div className={styles.topRated_iconWrapper}>
                <svg width={20} height={20} style={{ "--color1": "#112211" }}>
                  <use href={sprite + "#icon-Frame2"} />
                </svg>
              </div>

              <div className={styles.topRated_details}>
                <h3 className={styles.topRated_itemName}>{item.title}</h3>
                <span>{item.stars}</span>
              </div>
            </div>

            <span className={styles.topRated_price}>${item.price}</span>
          </div>
        ))}
      </div>

      <hr className={styles.topRated_divider} />

      <div className={styles.topRated_group}>
        {flightData.map((item) => (
          <div key={item.id} className={styles.topRated_item}>
            <div className={styles.topRated_left}>
              <div className={styles.topRated_iconWrapper}>
                <svg width={20} height={20} style={{ "--color1": "#112211" }}>
                  <use href={sprite + "#icon-Frame1"} />
                </svg>
              </div>

              <div className={styles.topRated_details}>
                <h3 className={styles.topRated_itemName}>{item.title}</h3>
                <span className={styles.topRated_route}>{item.info}</span>
              </div>
            </div>

            <RatingCard value={item.rating} />
          </div>
        ))}
      </div>
    </section>
  );
};