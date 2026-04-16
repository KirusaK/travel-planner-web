import { Routes, Route } from "react-router-dom";
import { FindFlight } from "../pages/FindFlight/FindFlight";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { FindStays } from "../pages/FindStays/FindStays";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/FindFlight" element={<FindFlight />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/FindStays" element={<FindStays />} />
    </Routes>
  );
};

export default App;
