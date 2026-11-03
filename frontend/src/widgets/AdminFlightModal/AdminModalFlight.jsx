import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { FlightGeneralTab } from "./FlightGeneralTab.jsx";
import { FlightPricingTab } from "./FlightPricingTab.jsx";
import {FlightTripsTab} from "./FlightTripsTab.jsx";
import { useAdminForm } from "../../shared/hooks/useAdminForm.js";
import {createFlight, updateFlight} from "../../shared/api/flights.js";
import {useEffect} from "react";

const tabs = [
  { id: "general", title: "General info" },
  { id: "pricing", title: "Pricing & payment" },
  { id: "trips", title: "Trips / Segments" },
];

const initialFlights = {
  airlineName: "",
  airlineLogo: "",
  flightClass: "Economy",
  airportLocation: "",
  fromAirport: "",
  toAirport: "",
  basePrice: "",
  segments: [
    {
      segmentLabel: "Depart",
      departureTime: "",
      arrivalTime: "",
      departureAirport: "",
      arrivalAirport: "",
      date: "",
      flightType: "non stop",
      status: "Scheduled",
      aircraftType: "",
    },
  ],
};

export const AdminModalFlight = ({isOpen, isClose, onCreated, editingId, initialData}) => {
  const submitFn = editingId ? (data) => updateFlight(editingId, data) : createFlight;
  const isEditing = Boolean(editingId);
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
  } = useAdminForm({initialData: initialFlights, submit: submitFn, onCreated, onClose: isClose});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setActiveTab("general");
    } else {
      setFormData(initialFlights);
      setActiveTab("general");
    }
  }, [initialData, setFormData, setActiveTab]);


  const handleSegmentChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      segments: prev.segments.map((seg, i) =>
          i === index ? {...seg, [field]: value } : seg),
    }))
  }

  const handleField = (index) => (e) => {
    handleSegmentChange(index, e.target.name, e.target.value);
  }

  const handleRemoveSegment = (index) => {
    setFormData((prev) => ({
      ...prev,
      segments: prev.segments.filter((_, i) => i !== index),
    }))
  }

  const handleAddSegment = () => {
    setFormData((prev) => ({
      ...prev,
      segments: [
        ...prev.segments,
        {
          segmentLabel: "Return",
          departureTime: "",
          arrivalTime: "",
          departureAirport: "",
          arrivalAirport: "",
          date: "",
          flightType: "non stop",
          status: "Scheduled",
          aircraftType: "",
        },
      ],
    }));
  };

  return (
      <section>
        <AdminModal
            title={isEditing ? "Edit Flight" : "Add New Flight"}
            isSaving={isEditing ? "Save changes" : "Add flight"}
            subtitle="Airline details, pricing, part payment and trip segments."
            isOpen={isOpen}
            isClose={handleClose}
            onSave={handleSubmit}
            isSaving={isSubmitting}
            error={error}
        >
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          {activeTab === "general" && (
              <FlightGeneralTab formData={formData} onChange={handleChange} />
          )}
          {activeTab === "pricing" && (
              <FlightPricingTab formData={formData} onChange={handleChange} />
          )}
          {activeTab === "trips" && (
              <FlightTripsTab
                  segments={formData.segments}
                  onSegmentChange={handleField}
                  onAddSegment={handleAddSegment}
                  onSegmentRemove={handleRemoveSegment}
              />
          )}
        </AdminModal>
      </section>
  );
}