import React, { useState, useEffect } from "react"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../data/loadDataJson.js"

const PageEmpProvSector = () => {
    const [dataProv, setDataProv] = useState(null)
    const [dataSector, setDataSector] = useState(null)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)

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
                    {/* <LineChartEmpPubPri
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
                    /> */}
                </section>

                <section className="pob-right-panel">
                    <PobResizer />

                    {/* <TableEmpPubPri
                        data={data}
                        listeners={[setComunidadSelected]}
                    /> */}
                </section>
            </main>
        </div>
    )
}
export default PageEmpProvSector