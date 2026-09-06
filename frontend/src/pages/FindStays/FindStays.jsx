import { Header } from "../../widgets/Header/Header";
import { Hero } from "../../widgets/Hero-FindStays/Hero";
import { StaySearch } from "../../widgets/StaySearch/StaySearch";
import { RecentSearches } from "../../widgets/RecentSearches/RecentSearches";
import { FallIntoTravel } from "../../widgets/FallIntoTravel/FallIntoTravel";
import { AdventureSection } from "../../widgets/AdventureSection/AdventureSection";
import { Subscribe } from "../../widgets/Subscribe/Subscribe";
import { Footer } from "../../widgets/Footer/Footer";

export const FindStays = () => {
  return (
    <>
      <Header />
      <Hero />
      <StaySearch />
      <RecentSearches />
      <FallIntoTravel />
      <AdventureSection />
      <Subscribe />
      <Footer />
    </>
  );
};
