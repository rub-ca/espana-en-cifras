import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../data/loadDataJson.js"
import LineChartEmpProvSector from "../components/empleo/LineChartEmpProvSector.jsx"
import TableEmpProvSector from "../components/tables/TableEmpProvSector.jsx"

const PageEmpProvSector = () => {
    const [dataProv, setDataProv] = useState(null)
    const [dataSector, setDataSector] = useState(null)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)

    const [provSelected, setProvSelected] = useState("Total Nacional / Total")

    useEffect(() => {
        loadDataJson("/data/PobProvPais.json", setDataProv, setLoading1)
        loadDataJson("/data/EmpProvSector.json", setDataSector, setLoading2)
    }, [])


    if (loading1) return <div>Cargando datos...</div>
    if (loading2) return <div>Cargando datos...</div>

    return (
        <div className="page-pob-container">
            <main className="page-pob-main-100height">
                <section className="pob-left-panel">
                    <LineChartEmpProvSector
                        provSelected={provSelected}
                        dataProv={dataProv}
                        dataSector={dataSector}
                    />
                </section>

                <section className="pob-right-panel">
                    <PobResizer />

                    <TableEmpProvSector
                        data={dataSector}
                        listeners={[setProvSelected]}
                    />
                </section>
            </main>
        </div>
    )
}
export default PageEmpProvSector