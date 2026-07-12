import { Header } from "../../widgets/Header/Header.jsx";
import { FlightDetailInfo } from "../../widgets/FlightDetailInfo/FlightDetailInfo.jsx";
import { FlightDetailFeatures } from "../../widgets/FlightDetailFeatures/FlightDetailFeatures.jsx";
import styles from "./FlightDetailPage.module.scss";

export const FlightDetailPage = () => {
  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <div className={styles.main}>
          <FlightDetailInfo />
          <div className={styles.block_img}></div>
          <FlightDetailFeatures />
        </div>
      </div>
    </div>
  );
};
