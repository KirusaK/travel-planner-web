import styles from "./AdminModalFlight.module.scss";
import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { FlightGeneralTab } from "./FlightGeneralTab.jsx";
import { useState } from "react";
import { FlightPricingTab } from "./FlightPricingTab.jsx";
import {FlightTripsTab} from "./FlightTripsTab.jsx";

const tabs = [
  { id: "general", title: "General info" },
  { id: "pricing", title: "Pricing & payment" },
  { id: "trips", title: "Trips / Segments" },
];

export const AdminModalFlight = ({isOpen, isClose}) => {
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    airlineName: "",
    airlineLogo: "",
    flightClass: "Economy",
    airportLocation: "",
    fromAirport: "",
    toAirport: "",
    basePrice: "",
    initialAmount: "",
    remainingAmount: "",
    dueDate: "",
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
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSegmentChange = (index, field, value) => {
    const updatedSegments = [...formData.segments];
    updatedSegments[index][field] = value;
    setFormData((prev) => ({...prev, segments: updatedSegments}));
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

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/flights", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create flight");
      const result = await response.json();
      console.log("Flight created successfully", result);

      isClose();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  }

  return (
    <section>
      <AdminModal
        title="Add New Flight"
        subtitle="Airline details, pricing, part payment and trip segments."
        isOpen={isOpen}
        isClose={isClose}
        onSave={handleSubmit}
      >
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        {activeTab === "general" && (
          <FlightGeneralTab formData={formData} onChange={handleChange} />
        )}
        {activeTab === "pricing" && (
          <FlightPricingTab formData={formData} onChange={handleChange} />
        )}
        {activeTab === "trips" && (
          <FlightTripsTab segments={formData.segments} onSegmentChange={handleSegmentChange} onAddSegment={handleAddSegment} />
        )}
      </AdminModal>
    </section>
  );
}