import { Header } from "../../widgets/Header/Header";
import { CompactBookingForm } from "../../widgets/CompactBookingForm/CompactBookingForm";
import styles from "./FlightsPage.module.scss";

export const FlightsPage = () => {
  return (
    <div>
      <div>
        <Header hasShadow={true} />
        <CompactBookingForm />
      </div>
    </div>
  );
};
