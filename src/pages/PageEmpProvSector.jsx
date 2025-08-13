import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson, loadDataZipJson } from "../data/loadDataJson.js"
import LineChartEmpProvSector from "../components/empleo/LineChartEmpProvSector.jsx"
import TableEmpProvSector from "../components/tables/TableEmpProvSector.jsx"

const PageEmpProvSector = () => {
    const [dataProv, setDataProv] = useState(null)
    const [dataSector, setDataSector] = useState(null)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)

    const [provSelected, setProvSelected] = useState("Total Nacional / Total")

    useEffect(() => {
        loadDataZipJson("/data/PobProvPais.zip", setDataProv, setLoading1)
        loadDataJson("/data/EmpProvSector.json", setDataSector, setLoading2)
    }, [])


    if (loading1) return <div>Cargando datos...</div>
    if (loading2) return <div>Cargando datos...</div>

    return (
        <div className="page-data-container">
            <div className="page-data-container__left-side">
                <LineChartEmpProvSector
                    provSelected={provSelected}
                    dataProv={dataProv}
                    dataSector={dataSector}
                />
            </div>

            <PobResizer block />

            <div className="page-data-container__right-side">
                <div className="page-data-container__100">
                    <TableEmpProvSector
                        data={dataSector}
                        listeners={[setProvSelected]}
                    />

                </div>

            </div>
        </div>
    )
}
export default PageEmpProvSector