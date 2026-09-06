import styles from "./HotelAvailableRooms.module.scss";

export const HotelAvailableRooms = (props) => {
  const { rooms } = props;

  return (
    <section className={styles.hotelAvailableRooms}>
      <div className={styles.hotelAvailableRooms_block}>
        <h2 className={styles.hotelAvailableRooms_block__title}>
          Available Rooms
        </h2>

        <div className={styles.hotelAvailableRooms_block__info}>
          {rooms.map((item, index) => (
            <div
              key={index}
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
                    style={{ backgroundImage: `url(${item.image})` }}
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
                  >
                    Book now
                  </button>
                </div>
              </div>
              <hr
                className={styles.hotelAvailableRooms_block__info__other__hr}
              />
            </div>
          ))}
        </div>

        <hr className={styles.hotelAvailableRooms_block__hr} />
      </div>
    </section>
  );
};
