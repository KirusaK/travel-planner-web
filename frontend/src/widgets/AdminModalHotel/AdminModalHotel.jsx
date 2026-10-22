import styles from "./AdminModalHotel.module.scss";
import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { HotelGeneralTab } from "./HotelGeneralTab.jsx";
import { useState } from "react";
import {HotelRoomsTab} from "./HotelRoomsTab.jsx";
import { HotelAmenitiesTab } from "./HotelAmenitiesTab.jsx";

const tabs = [
  { id: "general", title: "General info" },
  { id: "rooms", title: "Rooms" },
  { id: "amenities", title: "Amenities" },
];

export const AdminModalHotel = ({isOpen, isClose}) => {
  const [activeTab, setActiveTab] = useState("general");

  
  return (
    <section>
      <AdminModal
        title="Add New Hotel"
        subtitle="Property details, rooms, amenities and guest reviews."
        isOpen={isOpen}
        isClose={isClose}
      >
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {activeTab === "general" && <HotelGeneralTab />}
        {activeTab === "rooms" && <HotelRoomsTab />}
        {activeTab === "amenities" && <HotelAmenitiesTab />}
      </AdminModal>
    </section>
  );
}