import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./pages/css/GeneralPage.css"
import "./pages/css/GeneralPagePob.css"
import "./pages/css/PageScreenerMuni.css"
import PagePobPais from "./pages/PagePobPais.jsx"
import PagePobProvPais from "./pages/PagePobProvPais.jsx"
import PagePobMuniPais from "./pages/PagePobMuniPais.jsx"
import PagePobMuniEdad from "./pages/PagePobMuniEdad.jsx"
import PageScreenerMuni from "./pages/PageScreenerMuni.jsx"
import HeaderPage from "./components/core/HeaderPage.jsx"

const App = () => {
    return (
        <Router>
            <div className="page-container">
                <HeaderPage />

                <Routes>
                    <Route path="/pob-pais" element={<PagePobPais />} />
                    <Route path="/pob-prov-pais" element={<PagePobProvPais />} />
                    <Route path="/pob-muni-pais" element={<PagePobMuniPais />} />
                    <Route path="/pob-muni-edad" element={<PagePobMuniEdad />} />
                    <Route path="/screener-muni" element={<PageScreenerMuni />} />
                    <Route path="/" element={<PagePobProvPais />} />
                </Routes>

            </div>
        </Router>
    )
}
export default App
