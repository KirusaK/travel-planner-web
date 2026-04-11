import { Routes, Route } from "react-router-dom";
import { FindFlight } from "../pages/FindFlight/FindFlight";
import { Home } from "../pages/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/FindFlight" element={<FindFlight />} />
    </Routes>
  );
};

export default App;
