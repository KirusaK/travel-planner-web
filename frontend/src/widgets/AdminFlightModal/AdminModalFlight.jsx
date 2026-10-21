import styles from "./AdminModalFlight.module.scss";
import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { FlightGeneralTab } from "./FlightGeneralTab.jsx";

const tabs = [
  { id: 1, title: "General info" },
  { id: 2, title: "Pricing & payment" },
  { id: 3, title: "Trips / Segments" },
];

export const AdminModalFlight = ({isOpen, isClose}) => {

  return (
    <section>
      <AdminModal
        title="Add New Flight"
        subtitle="Airline details, pricing, part payment and trip segments."
        isOpen={isOpen}
        isClose={isClose}
      >
        <Tabs tabs={tabs} />
        <FlightGeneralTab />
      </AdminModal>
    </section>
  );
}