import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelDetailAmenities.module.scss";
import { useState } from "react";

export const HotelDetailAmenities = (props) => {
  const { amenitiesList } = props;

  const limited = 9;
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedAmenities = isExpanded
    ? amenitiesList
    : amenitiesList.slice(0, limited);

  const remainingCount = amenitiesList.length - limited;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className={styles.hotelDetailAmenities}>
      <div className={styles.hotelDetailAmenities_block}>
        <h2 className={styles.hotelDetailAmenities_block__title}>Amenities</h2>

        <div className={styles.hotelDetailAmenities_block__info}>
          {displayedAmenities.map((item) => (
            <div
              key={item.id}
              className={styles.hotelDetailAmenities_block__info__amenities}
            >
              <svg width={24} height={24}>
                <use href={`${sprite}#${item.icon}`} />
              </svg>
              <p
                className={
                  styles.hotelDetailAmenities_block__info__amenities__p
                }
              >
                {item.name}
              </p>
            </div>
          ))}

          {amenitiesList.length > limited && (
            <button
              className={styles.hotelDetailAmenities_block__info__btn}
              onClick={toggleExpand}
            >
              {isExpanded ? "Hide amenities" : `+${remainingCount} more`}
            </button>
          )}
        </div>

        <hr className={styles.hotelDetailAmenities_block__hr} />
      </div>
    </section>
  );
};
