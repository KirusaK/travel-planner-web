import { Header } from "../../widgets/Header/Header.jsx";
import { CompactStaySearch } from "../../widgets/CompactStaySearch/CompactStaySearch.jsx";
import { HotelFilters } from "../../widgets/HotelFilters/HotelFilters.jsx";
import { TypeHotels } from "../../widgets/TypeHotels/TypeHotels.jsx";
import { HotelCard } from "../../widgets/HotelCard/HotelCard.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import styles from "./HotelPage.module.scss";

export const HotelPage = () => {
  return (
    <div>
      <section>
        <Header hasShadow={true} />
        <CompactStaySearch />
        <main className={styles.main}>
          <HotelFilters />
          <div className={styles.main_block}>
            <TypeHotels />
            <HotelCard />
          </div>
        </main>
        <Subscribe />
        <Footer />
      </section>
    </div>
  );
};
