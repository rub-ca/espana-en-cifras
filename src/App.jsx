import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./pages/css/App.css"
import "./pages/css/Table.css"
import "./pages/css/Menu.css"
import "./pages/css/SecondaryDropdown.css"
import "./pages/css/poblacion.css"

import PagePobProvPais from "./pages/PagePobProvPais.jsx"
import PagePobPais from "./pages/PagePobPais.jsx"

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
                </Routes>
            </div>
        </Router>
    )
}
export default App
