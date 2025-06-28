import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PagePobPais from "./pages/PagePobPais.jsx"
import PagePobProvPais from "./pages/PagePobProvPais.jsx"
import PagePobMuniPais from "./pages/PagePobMuniPais.jsx"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pob-pais" element={<PagePobPais />} />
        <Route path="/pob-prov-pais" element={<PagePobProvPais />} />
        <Route path="/pob-muni-pais" element={<PagePobMuniPais />} />
      </Routes>
    </Router>
  )
}
export default App
