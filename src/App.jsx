import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./pages/css/App.css"
import "./pages/css/Table.css"
import "./pages/css/Menu.css"
import "./pages/css/SecondaryDropdown.css"
import "./pages/css/poblacion.css"
import "./pages/css/DualRangeSlider.css"
import "./pages/css/ItemMuniScreener.css"
import "./pages/css/Scroll.css"

import PagePobProvPais from "./pages/PagePobProvPais.jsx"
import PagePobPais from "./pages/PagePobPais.jsx"
import PagePobMuniEdad from "./pages/PagePobMuniEdad.jsx"
import PagePobMuniPais from "./pages/PagePobMuniPais.jsx"
import PageScreenerMuni from "./pages/PageScreenerMuni.jsx"
import PageEmpProvSector from "./pages/PageEmpProvSector.jsx"

import TitlePage from "./components/core/TitlePage.jsx"
import Menu from "./components/core/Menu.jsx"

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Menu />
                <TitlePage />

                <Routes>
                    <Route path="/" element={<PagePobProvPais />} />
                    <Route path="/poblacion-provincia-pais" element={<PagePobProvPais />} />
                    <Route path="/poblacion-por-pais" element={<PagePobPais />} />
                    <Route path="/poblacion-municipio-edad" element={<PagePobMuniEdad />} />
                    <Route path="/poblacion-municipio-pais" element={<PagePobMuniPais />} />
                    <Route path="/screener-municipios" element={<PageScreenerMuni />} />

                    <Route path="/empleo-provincia-sector" element={<PageEmpProvSector />} />
                </Routes>
            </div>
        </Router>
    )
}
export default App
