import styles from "./HotelAmenitiesTab.module.scss";

const hotelAmenities = [
  { id: "outdoor-pool", name: "Outdoor pool" },
  { id: "indoor-pool", name: "Indoor pool" },
  { id: "spa-wellness", name: "Spa and wellness center" },
  { id: "restaurant", name: "Restaurant" },
  { id: "room-service", name: "Room service" },
  { id: "fitness-center", name: "Fitness center" },
  { id: "bar-lounge", name: "Bar/Lounge" },
  { id: "free-wifi", name: "Free Wi-Fi" },
  { id: "free-parking", name: "Free parking" },
  { id: "airport-shuttle", name: "Airport shuttle" },
  { id: "beachfront-access", name: "Beachfront access" },
  { id: "tea-coffee-machine", name: "Tea/coffee machine" },
  { id: "air-conditioning", name: "Air conditioning" },
  { id: "24-hour-front-desk", name: "24-hour front desk" },
  { id: "concierge-service", name: "Concierge service" },
  { id: "laundry-service", name: "Laundry service" },
  { id: "business-center", name: "Business center" },
  { id: "meeting-rooms", name: "Meeting rooms" },
  { id: "kids-club", name: "Kids club" },
  { id: "pet-friendly", name: "Pet friendly" },
  { id: "non-smoking-rooms", name: "Non-smoking rooms" },
  { id: "family-rooms", name: "Family rooms" },
  { id: "wheelchair-accessible", name: "Wheelchair accessible" },
  { id: "ev-charging", name: "Electric vehicle charging" },
  { id: "sauna", name: "Sauna" },
  { id: "hot-tub", name: "Hot tub/Jacuzzi" },
  { id: "garden", name: "Garden" },
  { id: "terrace", name: "Terrace" },
  { id: "rooftop-bar", name: "Rooftop bar" },
  { id: "private-beach", name: "Private beach" },
  { id: "breakfast-included", name: "Breakfast included" },
  { id: "minibar", name: "Minibar" },
  { id: "safe-deposit-box", name: "Safe deposit box" },
  { id: "valet-parking", name: "Valet parking" },
  { id: "tennis-court", name: "Tennis court" },
  { id: "golf-course", name: "Golf course" },
];

export const HotelAmenitiesTab = () => {

  return (
    <div className={styles.amenitiesTab}>
      <section className={styles.amenitiesTab__toolbar}>
        <span className={styles.amenitiesTab__counter}>
          <strong className={styles.amenitiesTab__counter__strong}>0</strong> of{" "}
          {hotelAmenities.length} selected
        </span>

        <div className={styles.amenitiesTab__actions}>
          <button type="button" className={styles.amenitiesTab__btn}>
            Select all
          </button>
          <button
            type="button"
            className={`${styles.amenitiesTab__btn} ${styles.amenitiesTab__btn__red}`}
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
              id={item.id}
              name="name"
              className={styles.amenitiesTab__checkbox}
            />
            <label htmlFor={item.id} className={styles.amenitiesTab__label}>
              {item.name}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}