import { Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default App;
