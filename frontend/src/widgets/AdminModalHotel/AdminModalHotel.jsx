import styles from "./AdminModalHotel.module.scss";
import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { HotelGeneralTab } from "./HotelGeneralTab.jsx";

const tabs = [
  { id: 1, title: "General info" },
  { id: 2, title: "Rooms" },
  { id: 3, title: "Amenities" },
  { id: 4, title: "Reviews" },
];

export const AdminModalHotel = ({isOpen, isClose}) => {
  
  return (
    <section>
      <AdminModal
        title="Add New Hotel"
        subtitle="Property details, rooms, amenities and guest reviews."
        isOpen={isOpen}
        isClose={isClose}
      >
        <Tabs tabs={tabs} />

        <HotelGeneralTab />
      </AdminModal>
    </section>
  );
}