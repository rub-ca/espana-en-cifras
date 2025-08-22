import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../js/loadDataJson.js"
import LineChartBalancePagos from "../components/empleo/LineChartBalancePagos.jsx"
import LoadingData from "../components/core/LoadingData.jsx"
import TableBalancePagos from "../components/tables/TableBalancePagos.jsx"

const PageEmpBalancePagos = () => {
    const [dataEmpPubPriv, setDataEmpPubPriv] = useState(null)
    const [dataBalanceDesempleo, setDataBalanceDesempleo] = useState(null)
    const [dataBalancePensiones, setDataBalancePensiones] = useState(null)
    const [dataBalanceIMV, setDataBalanceIMV] = useState(null)

    const [indexToShow, setIndexToShow] = useState(getStandarIndexToShow())

    const [sumaA, setSumaA] = useState([])
    const [sumaB, setSumaB] = useState([])

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


    if (loading1) return <LoadingData />
    if (loading2) return <LoadingData />
    if (loading3) return <LoadingData />
    if (loading4) return <LoadingData />

    return (
        <div className="page-data-container">
            <div className="page-data-container__left-side">
                <LineChartBalancePagos
                    dataSumaA={sumaA}
                    dataSumaB={sumaB}
                />

            </div>

            <PobResizer />

            <div className="page-data-container__right-side">
                <div className="page-data-container__100">
                    <TableBalancePagos
                        dataEmpPubPriv={dataEmpPubPriv}
                        dataBalanceDesempleo={dataBalanceDesempleo}
                        dataBalancePensiones={dataBalancePensiones}
                        dataBalanceIMV={dataBalanceIMV}
                        indexToShow={indexToShow}
                        setIndexToShow={setIndexToShow}
                        setSumaA={setSumaA}
                        setSumaB={setSumaB}
                    />
                </div>

            </div>
        </div>
    )
}
export default PageEmpBalancePagos


function getStandarIndexToShow() {
    const val = []
    val.push(0)
    val.push(0)

    val.push(1)
    val.push(1)
    val.push(1)
    val.push(1)
    val.push(1)

    val.push(1)
    val.push(1)
    val.push(1)
    val.push(1)
    val.push(1)

    val.push(1)
    return val
}