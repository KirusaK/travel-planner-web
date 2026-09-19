import styles from "./FavouritesBtn.module.scss";
import sprite from "../../assets/icons/symbol-defs.svg";
import {useDispatch, useSelector} from "react-redux";
import { toggleFavourite, selectIsFavourite } from "../../../app/store/reducer/favouritesSlice.js";

export const FavouritesBtn = ({item}) => {
  const dispatch = useDispatch();

  const isFav = useSelector(selectIsFavourite(item?.id));

  const handleClick = (e) => {
    e.stopPropagation();

    if (item) {
      dispatch(toggleFavourite(item))
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
