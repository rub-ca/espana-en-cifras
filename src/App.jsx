import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useState } from "react"

import "./pages/css/app.css"
import "./pages/css/poblacion.css"
import "./pages/css/empleo.css"

import "./pages/css/components/Menu.css"
import "./pages/css/components/SecondaryDropdown.css"
import "./pages/css/components/DualRangeSlider.css"
import "./pages/css/components/ItemMuniScreener.css"
import "./pages/css/components/Scroll.css"
import "./pages/css/components/Table.css"

import PagePobProvPais from "./pages/PagePobProvPais.jsx"
import PagePobPais from "./pages/PagePobPais.jsx"
import PagePobMuniEdad from "./pages/PagePobMuniEdad.jsx"
import PagePobMuniPais from "./pages/PagePobMuniPais.jsx"
import PageScreenerMuni from "./pages/PageScreenerMuni.jsx"
import PageEmpProvSector from "./pages/PageEmpProvSector.jsx"
import PageEmpPubPri from "./pages/PageEmpPubPri.jsx"

import TitlePage from "./components/core/TitlePage.jsx"
import Menu from "./components/core/Menu.jsx"

const App = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Router>
            <div className="app-container">
                <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
                <TitlePage />

                <Routes>
                    <Route path="/" element={<PagePobProvPais />} />
                    <Route path="/poblacion-provincia-pais" element={<PagePobProvPais />} />
                    <Route path="/poblacion-por-pais" element={<PagePobPais />} />
                    <Route path="/poblacion-municipio-edad" element={<PagePobMuniEdad />} />
                    <Route path="/poblacion-municipio-pais" element={<PagePobMuniPais />} />
                    <Route path="/screener-municipios" element={<PageScreenerMuni />} />

                    <Route path="/empleo-provincia-sector" element={<PageEmpProvSector />} />
                    <Route path="/empleo-publico-y-privado" element={<PageEmpPubPri />} />
                </Routes>
            </div>
        </Router>
    )
}
export default App
