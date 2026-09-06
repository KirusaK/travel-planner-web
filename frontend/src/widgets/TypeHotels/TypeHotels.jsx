import styles from "./TypeHotels.module.scss";

export const TypeHotels = () => {
  const typeHotelsData = [
    { id: 1, name: "Hotels", place: "257 places" },
    { id: 2, name: "Motels", place: "51 places" },
    { id: 3, name: "Resorts", place: "72 places" },
  ];

  return (
    <div>
      <section className={styles.typehotels}>
        {typeHotelsData.map((item, index) => (
          <button
            key={item.id}
            className={`${styles.typehotels_btn} ${index === 0 ? styles.typehotels_btn__active : ""}`}
          >
            <div className={styles.typehotels_block}>
              <h3 className={styles.typehotels_block__title}>{item.name}</h3>
              <span className={styles.typehotels_block__span}>
                {item.place}
              </span>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
};
