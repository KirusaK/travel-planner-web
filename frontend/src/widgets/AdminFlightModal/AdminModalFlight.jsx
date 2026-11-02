import { AdminModal } from "../../shared/ui/AdminModal/AdminModal.jsx";
import { Tabs } from "../../shared/ui/Tabs/Tabs.jsx";
import { FlightGeneralTab } from "./FlightGeneralTab.jsx";
import { FlightPricingTab } from "./FlightPricingTab.jsx";
import {FlightTripsTab} from "./FlightTripsTab.jsx";
import { useAdminForm } from "../../shared/hooks/useAdminForm.js";
import { createFlight } from "../../shared/api/flights.js";

const tabs = [
  { id: "general", title: "General info" },
  { id: "pricing", title: "Pricing & payment" },
  { id: "trips", title: "Trips / Segments" },
];

<<<<<<< Updated upstream
export const AdminModalFlight = ({isOpen, isClose}) => {
  const [activeTab, setActiveTab] = useState("general");
=======
const initialFlights = {
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
};

export const AdminModalFlight = ({isOpen, isClose, onCreated}) => {
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
  } = useAdminForm({initialData: initialFlights, submit: createFlight, onCreated, onClose: isClose});


  const handleSegmentChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      segments: prev.segments.map((seg, i) =>
      i === index ? {...seg, [field]: value } : seg),
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
>>>>>>> Stashed changes

  return (
    <section>
      <AdminModal
        title="Add New Flight"
        subtitle="Airline details, pricing, part payment and trip segments."
        isOpen={isOpen}
<<<<<<< Updated upstream
        isClose={isClose}
        onSave={handleSubmit}
      >
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab}/>
        {activeTab === "general" && <FlightGeneralTab />}
        {activeTab === "pricing" && <FlightPricingTab />}
          {activeTab === "trips" && <FlightTripsTab />}
=======
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
            onSegmentChange={handleSegmentChange}
            onAddSegment={handleAddSegment}
          />
        )}
>>>>>>> Stashed changes
      </AdminModal>
    </section>
  );
}