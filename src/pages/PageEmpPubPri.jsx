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
        <div className="page-data-container">

            <div className="page-data-container__left-side flex-center-center dircolumn">
                <section className="empleo-pub-pri-charts">
                    <LineChartEmpPubPri
                        type="comunidad"
                        comunidadSelected={comunidadSelected}
                        seriesData={data}
                        seriesNames={["Público (m)", "Privado (m)"]}
                    />
                    <LineChartEmpPubPri
                        type="all"
                        comunidadSelected={comunidadSelected}
                        seriesData={data}
                    />
                </section>
            </div>

            <PobResizer />

            <div className="page-data-container__right-side">
                <div className="page-data-container__100">
                    <TableEmpPubPri
                        data={data}
                        listeners={[setComunidadSelected]}
                    />
                </div>
            </div>

        </div>
    )
}

export default PageEmpPubPri
