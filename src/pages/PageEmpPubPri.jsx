import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../data/loadDataJson.js"
import LineChartEmpPubPri from "../components/empleo/LineChartEmpPubPri.jsx"
import TableEmpPubPri from "../components/tables/TableEmpPubPri.jsx"

const PageEmpPubPri = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDataJson("/data/EmpPubPri.json", setData, setLoading)
    }, [])

    const [comunidadSelected, setComunidadSelected] = useState("Total Nacional / Público")

    if (loading) return <div>Cargando datos...</div>

    return (
        <div className="page-pob-container">
            <main className="page-pob-main-100height">
                <section className="pob-left-panel">
                    <LineChartEmpPubPri
                        type="comunidad"
                        comunidadSelected={comunidadSelected}
                        seriesData={data}
                        seriesNames={["Público", "Privado"]}
                    />
                    <LineChartEmpPubPri
                        type="all"
                        comunidadSelected={comunidadSelected}
                        seriesData={data}
                        seriesNames={["Público", "Privado"]}
                    />
                </section>

                <section className="pob-right-panel">
                    <PobResizer />

                    <TableEmpPubPri
                        data={data}
                        listeners={[setComunidadSelected]}
                    />
                </section>
            </main>
        </div>
    )
}

export default PageEmpPubPri
