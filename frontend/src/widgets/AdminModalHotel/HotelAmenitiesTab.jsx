import styles from "./HotelAmenitiesTab.module.scss";

const hotelAmenities = [
  { id: 1, name: "Outdoor pool" },
  { id: 2, name: "Indoor pool" },
  { id: 3, name: "Spa and wellness center" },
  { id: 4, name: "Restaurant" },
  { id: 5, name: "Room service" },
  { id: 6, name: "Fitness center" },
  { id: 7, name: "Bar/Lounge" },
  { id: 8, name: "Free Wi-Fi" },
  { id: 9, name: "Free parking" },
  { id: 10, name: "Airport shuttle" },
  { id: 11, name: "Beachfront access" },
  { id: 12, name: "Tea/coffee machine" },
  { id: 13, name: "Air conditioning" },
  { id: 14, name: "24-hour front desk" },
  { id: 15, name: "Concierge service" },
  { id: 16, name: "Laundry service" },
  { id: 17, name: "Business center" },
  { id: 18, name: "Meeting rooms" },
  { id: 19, name: "Kids club" },
  { id: 20, name: "Pet friendly" },
  { id: 21, name: "Non-smoking rooms" },
  { id: 22, name: "Family rooms" },
  { id: 23, name: "Wheelchair accessible" },
  { id: 24, name: "Electric vehicle charging" },
  { id: 25, name: "Sauna" },
  { id: 26, name: "Hot tub/Jacuzzi" },
  { id: 27, name: "Garden" },
  { id: 28, name: "Terrace" },
  { id: 29, name: "Rooftop bar" },
  { id: 30, name: "Private beach" },
  { id: 31, name: "Breakfast included" },
  { id: 32, name: "Minibar" },
  { id: 33, name: "Safe deposit box" },
  { id: 34, name: "Valet parking" },
  { id: 35, name: "Tennis court" },
  { id: 36, name: "Golf course" },
];

export const HotelAmenitiesTab = ({amenitiesIds, onAmenityToggle, onSelectAll, onClear}) => {

  return (
    <div className={styles.amenitiesTab}>
      <section className={styles.amenitiesTab__toolbar}>
        <span className={styles.amenitiesTab__counter}>
          <strong className={styles.amenitiesTab__counter__strong}>{amenitiesIds.length}</strong> of{" "}
          {hotelAmenities.length} selected
        </span>

        <div className={styles.amenitiesTab__actions}>
          <button type="button" className={styles.amenitiesTab__btn} onClick={() => onSelectAll(hotelAmenities.map((a) => a.id))}>
            Select all
          </button>
          <button
            type="button"
            className={`${styles.amenitiesTab__btn} ${styles.amenitiesTab__btn__red}`}
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </section>

      <section className={styles.amenitiesTab__grid}>
        {hotelAmenities.map((item) => (
          <div key={item.id} className={styles.amenitiesTab__item}>
            <input
              type="checkbox"
              id={`amenity-${item.id}`}
              checked={amenitiesIds.includes(item.id)}
              onChange={() => onAmenityToggle(item.id)}
              className={styles.amenitiesTab__checkbox}
            />
            <label htmlFor={`amenity-${item.id}`} className={styles.amenitiesTab__label}>
              {item.name}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}