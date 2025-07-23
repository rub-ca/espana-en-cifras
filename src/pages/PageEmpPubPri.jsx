import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../data/loadDataJson.js"

const PageEmpPubPri = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDataJson("/data/EmpPubPri.json", setData, setLoading)
    }, [])

    if (loading) return <div>Cargando datos...</div>

    return (
        <div className="page-pob-container">
            <main className="page-pob-main-100height">
                <section className="pob-left-panel">

                </section>

                <section className="pob-right-panel">
                    <PobResizer />

                </section>
            </main>
        </div>
    )
}

export default PageEmpPubPri
