import image from "../../shared/assets/image/Ellipse 1.jpg";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminHotelsTable.module.scss";
import { RatingCard } from "../../shared/ui/RatingCard/RatingCard.jsx";
import { ButtonEdit } from "../../shared/ui/ButtonEdit/ButtonEdit.jsx";
import { ButtonDelete } from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import {getHotels} from "../../shared/api/hotels.js";
import { getStars } from "../../shared/lib/format.js";

export const AdminHotelsTable = () => {
  const { data: hotels, loading, error } = useFetchData(getHotels);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

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
                <h3 className={styles.hotelsTable__hotelName}>{item.name}</h3>
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
                {item.address}
              </span>
            </div>

            <div className={styles.hotelsTable__stars}>
              {Array.from({ length: getStars(item.rating) }).map((_, index) => (
                <svg key={index} width={16} height={16}>
                  <use href={sprite + "#icon-Star"} />
                </svg>
              ))}
            </div>

            <RatingCard value={item.rating} />

            <p className={styles.hotelsTable__price}>
              ${item.pricePerNight}
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