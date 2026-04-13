import { Routes, Route } from "react-router-dom";
import { FindFlight } from "../pages/FindFlight/FindFlight";
import { Home } from "../pages/Home/Home";
import { LoginForm } from "../widgets/LoginForm/LoginForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/FindFlight" element={<FindFlight />} />
      <Route path="/LoginForm" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
