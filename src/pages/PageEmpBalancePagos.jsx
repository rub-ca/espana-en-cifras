import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson, loadDataZipJson } from "../data/loadDataJson.js"
import LineChartEmpProvSector from "../components/empleo/LineChartEmpProvSector.jsx"
import TableEmpProvSector from "../components/tables/TableEmpProvSector.jsx"

const PageEmpBalancePagos = () => {
    const [dataEmpPubPriv, setDataEmpPubPriv] = useState(null)
    const [dataBalanceDesempleo, setDataBalanceDesempleo] = useState(null)
    const [dataBalancePensiones, setDataBalancePensiones] = useState(null)
    const [dataBalanceIMV, setDataBalanceIMV] = useState(null)

    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [loading3, setLoading3] = useState(true)
    const [loading4, setLoading4] = useState(true)

    useEffect(() => {
        loadDataJson("/data/EmpPubPri.json", setDataEmpPubPriv, setLoading1)
    }, [])

    useEffect(() => {
        loadDataJson("/data/balanceDesempleoPrest.json", setDataBalanceDesempleo, setLoading2)
    }, [])

    useEffect(() => {
        loadDataJson("/data/balancePensiones.json", setDataBalancePensiones, setLoading3)
    }, [])

    useEffect(() => {
        loadDataJson("/data/balanceIngresoMinimoVital.json", setDataBalanceIMV, setLoading4)
    }, [])


    if (loading1) return <div>Cargando datos...</div>
    if (loading2) return <div>Cargando datos...</div>
    if (loading3) return <div>Cargando datos...</div>
    if (loading4) return <div>Cargando datos...</div>

    return (
        <div className="page-data-container">
            <div className="page-data-container__left-side">
              
            </div>

            <PobResizer />

            <div className="page-data-container__right-side">
                <div className="page-data-container__100">
                  
                </div>

            </div>
        </div>
    )
}
export default PageEmpBalancePagos