import styles from "./AdminModalHotel.module.scss";
import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { HotelGeneralTab } from "./HotelGeneralTab.jsx";
import {HotelRoomsTab} from "./HotelRoomsTab.jsx";
import { HotelAmenitiesTab } from "./HotelAmenitiesTab.jsx";
import { useAdminForm } from "../../shared/hooks/useAdminForm.js";
import { createHotel } from "../../shared/api/hotels.js";

const tabs = [
  { id: "general", title: "General info" },
  { id: "rooms", title: "Rooms" },
  { id: "amenities", title: "Amenities" },
];

<<<<<<< Updated upstream
export const AdminModalHotel = ({isOpen, isClose}) => {
  const [activeTab, setActiveTab] = useState("general");

=======
const initialFormData = {
  name: "",
  logoUrl: "",
  address: "",
  googleMapsUrl: "",
  mapEmbedUrl: "",
  description: "",
  features: [],
  pricePerNight: "",
  rooms: [
    {
      title: "",
      price: "",
      imageUrl: "",
    },
  ],
  amenitiesIds: [],
};

export const AdminModalHotel = ({isOpen, isClose, onCreated}) => {
  const {
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    handleClose,
  } = useAdminForm({
    initialData: initialFormData,
    submit: createHotel,
    onCreated,
    onClose: isClose,
  });



  const handleRoomsChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updateRooms = [...prev.rooms];
      updateRooms[index] = {
        ...updateRooms[index],
        [name]: value,
      };
      return {...prev, rooms: updateRooms};
    })
  }

  const handleAddRooms = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        {
          title: "",
          price: "",
          imageUrl: "",
        },
      ],
    }));
  }

  const handleAmenityToggle = (amenityId) => {
    setFormData((prev) => {
      const exist = prev.amenitiesIds.includes(amenityId);
      return {
        ...prev,
        amenitiesIds: exist
          ? prev.amenitiesIds.filter((id) => id !== amenityId)
          : [...prev.amenitiesIds, amenityId],
      };
    });
  };
>>>>>>> Stashed changes
  
  return (
    <section>
      <AdminModal
        title="Add New Hotel"
        subtitle="Property details, rooms, amenities and guest reviews."
        isOpen={isOpen}
<<<<<<< Updated upstream
        isClose={isClose}
=======
        isClose={handleClose}
        onSave={handleSubmit}
        isSaving={isSubmitting}
        error={error}
>>>>>>> Stashed changes
      >
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {activeTab === "general" && <HotelGeneralTab />}
        {activeTab === "rooms" && <HotelRoomsTab />}
        {activeTab === "amenities" && <HotelAmenitiesTab />}
      </AdminModal>
    </section>
  );
}