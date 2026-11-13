import styles from "./FavouritesBtn.module.scss";
import sprite from "../../assets/icons/symbol-defs.svg";
import {useFavorites} from "../../context/FavouritesContext.jsx";

export const FavouritesBtn = ({type, itemId}) => {
  const {isFavorite, toggle} = useFavorites();
  const isFav = isFavorite(type, itemId);

  const handleClick = async (e) => {
    e.stopPropagation();
    try {
      await toggle(type, itemId);
    } catch (err) {
      console.error("Favourite toggle failed:", err);
    }
  }

  return (
    <button
      type="button"
      className={styles.FavouritesBtn}
      onClick={handleClick}
    >
      <svg width="20" height="20" className={styles.flightCard_favoriteIcon}>
        <use
          href={sprite + (isFav ? "#icon-icon-heart-filled" : "#icon-heart")}
        />
      </svg>
    </button>
  );
};
