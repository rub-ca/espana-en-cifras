import React, { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import "./pages/css/app.css"
import "./pages/css/poblacion.css"
import "./pages/css/empleo.css"

import "./pages/css/components/Menu.css"
import "./pages/css/components/SecondaryDropdown.css"
import "./pages/css/components/DualRangeSlider.css"
import "./pages/css/components/ItemMuniScreener.css"
import "./pages/css/components/Scroll.css"
import "./pages/css/components/Table.css"
import "./pages/css/components/Modal.css"
import "./pages/css/components/NotFound.css"
import "./pages/css/components/Home.css"

import "./pages/css/portatil-media.css"

import PageHome from "./pages/PageHome.jsx"

import PagePobProvPais from "./pages/PagePobProvPais.jsx"
import PagePobPais from "./pages/PagePobPais.jsx"
import PagePobMuniEdad from "./pages/PagePobMuniEdad.jsx"
import PagePobMuniPais from "./pages/PagePobMuniPais.jsx"
import PageScreenerMuni from "./pages/PageScreenerMuni.jsx"

import PageEmpProvSector from "./pages/PageEmpProvSector.jsx"
import PageEmpPubPri from "./pages/PageEmpPubPri.jsx"
import PageEmpBalancePagos from "./pages/PageEmpBalancePagos.jsx"

import TitlePage from "./components/core/TitlePage.jsx"
import NotFound from "./components/core/NotFound.jsx"
import Menu from "./components/core/Menu.jsx"

import { sendFirstAnalytics, sendPageView } from "./js/analytics.js"

const PAGEVIEW_URL = "https://data.xn--espaaencifras-lkb.es/analytics/pageviews"

// Tracks how long a user stays on each page and sends analytics on every
// route change and on tab close. Must be rendered inside <Router> so that
// useLocation is available.
function AnalyticsTracker({ sessionIdRef }) {
    const location = useLocation()
    const pageEnterTime = useRef(Date.now())
    const prevPath = useRef(null)

    useEffect(() => {
        const now = Date.now()
        const currentPath = location.pathname

        // After the first page load, send time spent on the previous route
        if (prevPath.current !== null && sessionIdRef.current) {
            sendPageView(sessionIdRef.current, {
                path: currentPath,
                from: prevPath.current,
                time_on_prev_ms: now - pageEnterTime.current,
                timestamp: now,
                exit: false,
            })
        }

        pageEnterTime.current = now
        prevPath.current = currentPath

        // When the user closes / leaves the tab, fire a beacon for the current page
        const handleBeforeUnload = () => {
            if (!sessionIdRef.current) return
            const payload = JSON.stringify({
                session: sessionIdRef.current,
                extra: JSON.stringify({
                    path: currentPath,
                    from: null,
                    time_on_prev_ms: Date.now() - pageEnterTime.current,
                    timestamp: Date.now(),
                    exit: true,
                }),
            })
            navigator.sendBeacon?.(PAGEVIEW_URL, new Blob([payload], { type: "application/json" }))
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [location.pathname, sessionIdRef])

    return null
}

const App = () => {
    const sessionIdRef = useRef(null)

    useEffect(() => {
        sessionIdRef.current = crypto.randomUUID()
        sendFirstAnalytics(sessionIdRef.current)
    }, [])

    const [showMenu, setShowMenu] = useState(false)

    return (
        <Router>
            <AnalyticsTracker sessionIdRef={sessionIdRef} />
            <div className="app-container">
                <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
                <TitlePage />

                {/* SEO OPTIMIZATION */}
                <p>España en Cifras es un portal interactivo para explorar datos oficiales de población y empleo en España de forma clara y visual. Analiza la población por provincia y país de nacimiento, consulta la estructura demográfica por grupos de edad con pirámides poblacionales, y filtra municipios con un potente screener que permite combinar rangos de población total, porcentaje de población extranjera y tramos de edad. Descubre indicadores clave del mercado laboral: empleo por provincia y sector, comparativa de empleo público y privado, y balances que integran desempleo, pensiones e IMV para una visión completa del territorio.

                    La experiencia está optimizada con React y gráficos interactivos ECharts, ofreciendo tablas dinámicas, leyendas claras y filtros intuitivos (selectores de año, género y tramos de edad, controles de doble rango). Las páginas de población por país, provincia y municipio permiten comparativas rápidas entre comunidades autónomas y facilitan el análisis temporal de los últimos años. En empleo, las series temporales y las relaciones entre empleo público y privado aportan contexto y tendencias relevantes para investigadores, periodistas, estudiantes y ciudadanía.

                    El sitio prioriza rendimiento y usabilidad: carga diferida de gráficos pesados, interfaz responsive, diseño accesible y navegación sencilla. Cada vista está pensada para responder preguntas concretas con el menor esfuerzo: ¿cómo ha cambiado la pirámide poblacional?, ¿qué provincias lideran el empleo por sector?, ¿qué municipios cumplen umbrales demográficos y de población extranjera?

                    España en Cifras reúne en un solo lugar datos demográficos y laborales de fuentes públicas, con visualizaciones claras y comparables para entender mejor la realidad de España.
                </p>
                {/* SEO OPTIMIZATION */}

                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/poblacion-provincia-pais" element={<PagePobProvPais />} />
                    <Route path="/poblacion-por-pais" element={<PagePobPais />} />
                    <Route path="/poblacion-municipio-edad" element={<PagePobMuniEdad />} />
                    <Route path="/poblacion-municipio-pais" element={<PagePobMuniPais />} />
                    <Route path="/screener-municipios" element={<PageScreenerMuni />} />

                    <Route path="/empleo-provincia-sector" element={<PageEmpProvSector />} />
                    <Route path="/empleo-publico-y-privado" element={<PageEmpPubPri />} />
                    <Route path="/empleo-balance-pagos" element={<PageEmpBalancePagos />} />


                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}
export default App

