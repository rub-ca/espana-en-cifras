import React, { useState, useEffect } from "react"
import { buscarMunicipios } from '../js/buscadorMunicipios.js'
import DualRangeSlider from "../components/filters/DualRangeSlider.jsx"
import PageHeader from "../components/core/HeaderPage.jsx"
import ItemMuniScreener from "../components/poblacion/ItemMuniScreener.jsx"

const PageScreenerMuni = () => {
    const [dataMuniPais, setDataMuniPais] = useState(null)

    const [resultados, setResultados] = useState([])

    const [poblacionGeneralTitulo, setPoblacionGeneralTitulo] = useState('Cantidad de habitantes')
    const [minPoblacionGeneral, setMinPoblacionGeneral] = useState(100)
    const [maxPoblacionGeneral, setMaxPoblacionGeneral] = useState(500000)
    const minLimitPoblacionGeneral = 0
    const maxLimitPoblacionGeneral = 5000000

    const [poblacionExtranjeraTitulo, setPoblacionExtranjeraTitulo] = useState('Porcentaje población extranjera')
    const [minPoblacionExtranjera, setMinPoblacionExtranjera] = useState(20)
    const [maxPoblacionExtranjera, setMaxPoblacionExtranjera] = useState(80)
    const minLimitPoblacionExtranjera = 0
    const maxLimitPoblacionExtranjera = 100

    useEffect(() => {
        const cargarDatos = async () => {
            const res = await fetch("/data/PobMuniPais.json")
            if (!res.ok) throw new Error("Error al cargar los datos")
            const json = await res.json()
            setDataMuniPais(json)
        }
        cargarDatos()
    }, [])


    return (
        <div className="page-screener-container">
            <div className="screener-left-panel">
                <h2>Buscador de municipios</h2>

                <DualRangeSlider
                    title={poblacionGeneralTitulo}
                    setTitle={setPoblacionGeneralTitulo}
                    minValue={minPoblacionGeneral}
                    setMinValue={setMinPoblacionGeneral}
                    maxValue={maxPoblacionGeneral}
                    setMaxValue={setMaxPoblacionGeneral}
                    minLimit={minLimitPoblacionGeneral}
                    maxLimit={maxLimitPoblacionGeneral}
                />
                <DualRangeSlider
                    title={poblacionExtranjeraTitulo}
                    setTitle={setPoblacionExtranjeraTitulo}
                    minValue={minPoblacionExtranjera}
                    setMinValue={setMinPoblacionExtranjera}
                    maxValue={maxPoblacionExtranjera}
                    setMaxValue={setMaxPoblacionExtranjera}
                    minLimit={minLimitPoblacionExtranjera}
                    maxLimit={maxLimitPoblacionExtranjera}
                />

                <button
                    className='screener-buscar-button'
                    disabled={dataMuniPais === null}
                    children={dataMuniPais === null ? "Cargando..." : "Buscar!"}
                    onClick={() =>
                        buscarMunicipios(
                            dataMuniPais,
                            setResultados,
                            minPoblacionGeneral,
                            maxPoblacionGeneral,
                            minPoblacionExtranjera,
                            maxPoblacionExtranjera
                        )
                    }>
                </button>
            </div>

            <div className="screener-right-panel">
                <ItemMuniScreener
                    index={-1}
                    name={"Municipio"}
                    pobTotal={"Poblacion total"}
                    pobExtranj={"Poblacion extranjera"}
                />
                {resultados.length > 0 && resultados.map((muni, index) => (
                    <div key={index}>
                        <ItemMuniScreener
                            index={index}
                            name={muni.name}
                            pobTotal={muni.poblacionTotal}
                            pobExtranj={muni.poblacionExtranjera}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PageScreenerMuni
