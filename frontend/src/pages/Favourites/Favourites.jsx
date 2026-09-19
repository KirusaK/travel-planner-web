import { Header } from "../../widgets/Header/Header.jsx";
import { useState} from "react";
import { FavouritesFilter } from "../../widgets/FavouritesFilter/FavouritesFilter.jsx";
import { FavouritesList } from "../../widgets/FavouritesList/FavouritesList.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import styles from "./Favourites.module.scss";

export const Favourites = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FavouritesFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          <FavouritesList activeTab={activeTab} />
        </div>
        <Subscribe />
        <Footer />
      </div>
    </>
  );
};