import { Header } from "../../widgets/Header/Header.jsx";
import { FavouritesFilter } from "../../widgets/FavouritesFilter/FavouritesFilter.jsx";
import styles from "./Favourites.module.scss";

export const Favourites = () => {
  return (
    <>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FavouritesFilter />
        </div>
      </div>
    </>
  );
};