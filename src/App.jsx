import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./pages/css/App.css"
import PagePobProvPais from "./pages/PagePobProvPais.jsx"
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
                </Routes>
            </div>
        </Router>
    )
}
export default App
