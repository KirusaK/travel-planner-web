import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./HotelRoomsTab.module.scss";
import { ButtonDelete } from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";

export const HotelRoomsTab = ({rooms, onAddRooms, onRoomsChange}) => {
  return (
    <div className={styles.roomsTab}>
      {rooms.map((room, index) => (
        <section key={index} className={styles.roomsTab__room}>
          <div className={styles.roomsTab__image}>
            <h3 className={styles.roomsTab__label}>Room Image</h3>
            <button className={styles.roomsTab__preview}>
              <svg width={24} height={24}>
                <use href={sprite + "#icon-Frame11"} />
              </svg>
            </button>
          </div>

          <div className={styles.roomsTab__imageControls}>
            <button className={styles.roomsTab__uploadBtn}>Upload image</button>

            <input
              type="text"
              name="imageUrl"
              value={room.imageUrl || ""}
              onChange={(e) => {
                onRoomsChange(index, e);
              }}
              placeholder="or paste image URL"
              className={styles.roomsTab__input}
            />
          </div>

          <div className={styles.roomsTab__field}>
            <label
              htmlFor={`title-${index}`}
              className={styles.roomsTab__label}
            >
              Room Title
            </label>
            <input
              type="text"
              id={`title-${index}`}
              name="title"
              value={room.title}
              onChange={(e) => {
                onRoomsChange(index, e);
              }}
              className={styles.roomsTab__input}
            />
          </div>

          <div className={styles.roomsTab__field}>
            <label
              htmlFor={`price-${index}`}
              className={styles.roomsTab__label}
            >
              Price
            </label>
            <input
              type="number"
              id={`price-${index}`}
              name="price"
              value={room.price}
              onChange={(e) => {
                onRoomsChange(index, e);
              }}
              className={styles.roomsTab__input}
            />
          </div>

          <ButtonDelete />
        </section>
      ))}

      <button className={styles.roomsTab__addBtn} onClick={onAddRooms}>
        + Add room
      </button>
    </div>
  );
}