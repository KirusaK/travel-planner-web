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
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const {error} = await response.json().catch(() => ({}));
        throw new Error(error || "Failed to create hotel");
      }

      const result = await response.json();
      console.log("Hotel created successfully", result);

      await onCreated?.();
      setFormData(initialFormData);
      setActiveTab("general");
      isClose();
    } catch (err) {
      console.error("Error submitting form:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  
  return (
    <section>
      <AdminModal
        title="Add New Hotel"
        subtitle="Property details, rooms, amenities and guest reviews."
        isOpen={isOpen}
        isClose={isClose}
        onSave={handleSubmit}
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
          />
        )}
        {activeTab === "amenities" && (
          <HotelAmenitiesTab
            amenitiesIds={formData.amenitiesIds}
            onAmenityToggle={handleAmenityToggle}
            setFormData={setFormData}
          />
        )}
      </AdminModal>
    </section>
  );
}