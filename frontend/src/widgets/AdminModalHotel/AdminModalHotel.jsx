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

  const handleRemoveRoom = (index) => {
    setFormData((prev) => ({
      ...prev,
          rooms: prev.rooms.filter((_, i) => i !== index),
    }))
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

  const handleSelectAllAmenities = (id) => {
    setFormData((prev) => ({...prev, amenitiesIds: id}));
  }

  const handleClearAllAmenities = () => {
    setFormData((prev) => ({...prev, amenitiesIds: []}));
  }

  return (
      <section>
        <AdminModal
            title="Add New Hotel"
            subtitle="Property details, rooms, amenities and guest reviews."
            isOpen={isOpen}
            isClose={handleClose}
            onSave={handleSubmit}
            isSaving={isSubmitting}
            error={error}
        >
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          {activeTab === "general" && (
              <HotelGeneralTab formData={formData} onChange={handleChange} />
          )}
          {activeTab === "rooms" && (
              <HotelRoomsTab
                  rooms={formData.rooms}
                  onRoomsChange={handleRoomsChange}
                  onAddRooms={handleAddRooms}
                  onRemoveRoom={handleRemoveRoom}
              />
          )}
          {activeTab === "amenities" && (
              <HotelAmenitiesTab
                  amenitiesIds={formData.amenitiesIds}
                  onAmenityToggle={handleAmenityToggle}
                  onSelectAll={handleSelectAllAmenities}
                  onClear={handleClearAllAmenities}
              />
          )}
        </AdminModal>
      </section>
  );
}