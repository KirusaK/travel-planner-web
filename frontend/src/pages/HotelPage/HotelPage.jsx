import { useSearchParams } from "react-router-dom";
import { Header } from "../../widgets/Header/Header.jsx";
import { CompactStaySearch } from "../../widgets/CompactStaySearch/CompactStaySearch.jsx";
import { HotelFilters } from "../../widgets/HotelFilters/HotelFilters.jsx";
import { TypeHotels } from "../../widgets/TypeHotels/TypeHotels.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import { HotelList } from "../../widgets/HotelList/HotelList.jsx";
import styles from "./HotelPage.module.scss";

export const HotelPage = () => {
  const [params] = useSearchParams();
  const destination = params.get("destination") ?? "";

  return (
    <div>
      <section>
        <Header hasShadow={true} />
        <CompactStaySearch />
        <main className={styles.main}>
          <HotelFilters />
          <div className={styles.main_block}>
            <TypeHotels />
            <HotelList destination={destination} />
          </div>
        </main>
        <Subscribe />
        <Footer />
      </section>
    </div>
  );
};
