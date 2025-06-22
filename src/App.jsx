import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PobPais from "./pages/PobPais";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pob-pais" element={<PobPais />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
};
export default App
