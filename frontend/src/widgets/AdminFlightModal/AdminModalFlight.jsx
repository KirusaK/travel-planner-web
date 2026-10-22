import styles from "./AdminModalFlight.module.scss";
import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { FlightGeneralTab } from "./FlightGeneralTab.jsx";
import { useState } from "react";
import { FlightPricingTab } from "./FlightPricingTab.jsx";

const tabs = [
  { id: "general", title: "General info" },
  { id: "pricing", title: "Pricing & payment" },
  { id: "trips", title: "Trips / Segments" },
];

export const AdminModalFlight = ({isOpen, isClose}) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <section>
      <AdminModal
        title="Add New Flight"
        subtitle="Airline details, pricing, part payment and trip segments."
        isOpen={isOpen}
        isClose={isClose}
      >
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab}/>
        {activeTab === "general" && <FlightGeneralTab />}
        {activeTab === "pricing" && <FlightPricingTab />}
      </AdminModal>
    </section>
  );
}