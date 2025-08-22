import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../js/loadDataJson.js"
import LineChartEmpProvSector from "../components/empleo/LineChartEmpProvSector.jsx"
import TableEmpProvSector from "../components/tables/TableEmpProvSector.jsx"
import LoadingData from "../components/core/LoadingData.jsx"
import { listaProvinciaOrdenIne } from "../js/utilsPob.js"

const PageEmpProvSector = () => {
    const [dataSector, setDataSector] = useState(null)
    const [loading1, setLoading1] = useState(true)

    const [provSelected, setProvSelected] = useState("Total Nacional / Total")

    useEffect(() => {
        loadDataJson("/data/EmpProvSector.json", setDataSector, setLoading1)
    }, [])


    if (loading1) return <LoadingData />

    return (
        <div className="page-data-container">
            <div className="page-data-container__left-side">
                <LineChartEmpProvSector
                    provSelected={provSelected}
                    listaProvinciaOrdenIne={listaProvinciaOrdenIne}
                    dataSector={dataSector}
                />
            </div>

            <PobResizer />

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