import styles from "./History.module.scss";
import {useState} from "react";
import {FavouritesFilter} from "../FavouritesFilter/FavouritesFilter.jsx";
import {BookingList} from "../BookingList/BookingList.jsx";

export const History = () => {
    const [activeTab, setActiveTab] = useState("flights");

  return (
    <section className={styles.history}>
      <h2 className={styles.history__title}>History</h2>

        <FavouritesFilter activeTab={activeTab} setActiveTab={setActiveTab} />
        <BookingList activeTab={activeTab}/>
    </section>
  );
};
