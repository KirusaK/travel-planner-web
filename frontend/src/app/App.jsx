import { Routes, Route } from "react-router-dom";
import { FindFlight } from "../pages/FindFlight/FindFlight";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { FindStays } from "../pages/FindStays/FindStays";
import { FlightsPage } from "../pages/FlightsPage/FlightsPage";
import { HotelPage } from "../pages/HotelPage/HotelPage";
import { FlightDetailPage } from "../pages/FlightDetailPage/FlightDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/FindFlight" element={<FindFlight />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/FindStays" element={<FindStays />} />
      <Route path="/FlightsPage" element={<FlightsPage />} />
      <Route path="/HotelPage" element={<HotelPage />} />
      <Route path="/FlightDetailPage" element={<FlightDetailPage />} />
    </Routes>
  );
};

export default App;
