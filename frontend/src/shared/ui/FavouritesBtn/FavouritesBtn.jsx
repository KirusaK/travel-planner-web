import styles from "./FavouritesBtn.module.scss";
import sprite from "../../assets/icons/symbol-defs.svg";

export const FavouritesBtn = () => {
  return (
    <button className={styles.FavouritesBtn}>
      <svg width="20" height="20" className={styles.flightCard_favoriteIcon}>
        <use href={sprite + "#icon-heart"} />
      </svg>
    </button>
  );
};
