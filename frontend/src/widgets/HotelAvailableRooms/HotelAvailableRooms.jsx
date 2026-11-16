import styles from "./HotelAvailableRooms.module.scss";

export const HotelAvailableRooms = ({hotel, sectionRef, detailHotel}) => {
  return (
    <section ref={sectionRef} className={styles.hotelAvailableRooms}>
      <div className={styles.hotelAvailableRooms_block}>
        <h2 className={styles.hotelAvailableRooms_block__title}>
          Available Rooms
        </h2>

        <div className={styles.hotelAvailableRooms_block__info}>
          {hotel.rooms.map((item) => (
            <div
              key={item.id}
              className={styles.hotelAvailableRooms_block__info__other}
            >
              <div
                className={styles.hotelAvailableRooms_block__info__other__ful}
              >
                <div
                  className={
                    styles.hotelAvailableRooms_block__info__other__ful__one
                  }
                >
                  <div
                    className={
                      styles.hotelAvailableRooms_block__info__other__ful__img
                    }
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  ></div>
                  <p
                    className={
                      styles.hotelAvailableRooms_block__info__other__title
                    }
                  >
                    {item.title}
                  </p>
                </div>
                <div
                  className={
                    styles.hotelAvailableRooms_block__info__other__ful__two
                  }
                >
                  <p
                    className={
                      styles.hotelAvailableRooms_block__info__other__price
                    }
                  >
                    <span
                      className={
                        styles.hotelAvailableRooms_block__info__other__price__span
                      }
                    >
                      <b>${item.price}</b>
                    </span>
                    /night
                  </p>
                  <button
                    className={
                      styles.hotelAvailableRooms_block__info__other__btn
                    }
                    onClick={() => detailHotel(item.id)}
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className={styles.hotelAvailableRooms_block__hr} />
      </div>
    </section>
  );
};
