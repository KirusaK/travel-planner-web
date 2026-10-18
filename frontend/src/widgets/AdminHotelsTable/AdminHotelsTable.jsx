import image from "../../shared/assets/image/Ellipse 1.jpg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminHotelsTable.module.scss";
import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { ButtonEdit } from "../../shared/ui/ButtonEdit/ButtonEdit.jsx";
import { ButtonDelete } from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";

export const AdminHotelsTable = () => {
  const hotels = [
    {
      id: 1,
      hotelName: "CVK Park Bosphorus Hotel Istanbul",
      roomsCount: 3,
      amenitiesCount: 9,
      location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
      stars: 5,
      rating: 4.2,
      price: 240,
    },
    {
      id: 2,
      hotelName: "Eresin Hotels Sultanahmet - Boutique",
      roomsCount: 1,
      amenitiesCount: 5,
      location: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
      stars: 4,
      rating: 4.6,
      price: 104,
    },
    {
      id: 3,
      hotelName: "Atlantis The Palm Dubai",
      roomsCount: 1,
      amenitiesCount: 7,
      location: "Crescent Rd, The Palm Jumeirah, Dubai",
      stars: 5,
      rating: 4.8,
      price: 520,
    },
    {
      id: 4,
      hotelName: "Hotel Artemide Rome",
      roomsCount: 1,
      amenitiesCount: 5,
      location: "Via Nazionale 22, Rome 00184",
      stars: 4,
      rating: 4.4,
      price: 189,
    },
  ];

  return (
    <section className={styles.hotelsTable}>
      <div className={styles.hotelsTable__header}>
        <span className={styles.hotelsTable__headerCol}>Hotel Name</span>
        <span className={styles.hotelsTable__headerCol}>Location</span>
        <span className={styles.hotelsTable__headerCol}>Stars</span>
        <span className={styles.hotelsTable__headerCol}>Rating</span>
        <span className={styles.hotelsTable__headerCol}>Price</span>
        <span className={styles.hotelsTable__headerCol}>Actions</span>
      </div>

      <div className={styles.hotelsTable__list}>
        {hotels.map((item) => (
          <div key={item.id} className={styles.hotelsTable__row}>
            <div className={styles.hotelsTable__hotelInfo}>
              <img src={image} alt="" className={styles.hotelsTable__avatar} />

              <div className={styles.hotelsTable__textGroup}>
                <h3 className={styles.hotelsTable__hotelName}>
                  {item.hotelName}
                </h3>
                <span className={styles.hotelsTable__meta}>
                  {item.roomsCount} rooms{" "}
                  <span className={styles.hotelsTable__dot}>.</span>{" "}
                  {item.amenitiesCount} amenities
                </span>
              </div>
            </div>

            <div className={styles.hotelsTable__location}>
              <svg width={14} height={16}>
                <use href={sprite + "#icon-Location"} />
              </svg>

              <span className={styles.hotelsTable__locationText}>
                {item.location}
              </span>
            </div>

            <div className={styles.hotelsTable__stars}>{item.stars}</div>

            <RatingCard value={item.rating} />

            <p className={styles.hotelsTable__price}>
              ${item.price}
              <span className={styles.hotelsTable__pricePeriod}>/night</span>
            </p>

            <div className={styles.hotelsTable__actions}>
              <ButtonEdit />
              <ButtonDelete />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}