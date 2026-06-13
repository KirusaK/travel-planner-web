import { Header } from "../../widgets/Header/Header.jsx";
import { CompactStaySearch } from "../../widgets/CompactStaySearch/CompactStaySearch.jsx";
import { HotelFilters } from "../../widgets/HotelFilters/HotelFilters.jsx";
import styles from "./HotelPage.module.scss";

export const HotelPage = () => {
  return (
    <div>
      <section>
        <Header hasShadow={true} />
        <CompactStaySearch />
        <HotelFilters />
      </section>
    </div>
  );
};
