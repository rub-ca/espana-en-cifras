import React, { useState } from "react"
import { buscarMunicipios } from '../js/buscadorMunicipios.js'
import DualRangeSlider from "../components/filters/DualRangeSlider.jsx"
import PageHeader from "../components/core/HeaderPage.jsx"
import ItemMuniScreener from "../components/poblacion/ItemMuniScreener.jsx"

const PageScreenerMuni = () => {
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

                <button className="screener-buscar-button"
                    onClick={() =>
                        buscarMunicipios(
                            setResultados,
                            minPoblacionGeneral,
                            maxPoblacionGeneral,
                            minPoblacionExtranjera,
                            maxPoblacionExtranjera
                        )
                    }>
                    Buscar!
                </button>
            </div>

            <div className="screener-right-panel">
                {resultados.length === 0 ? (
                    <p>No hay resultados</p>
                ) : (
                    resultados.map((muni, index) => (
                        <div key={index}>
                            <ItemMuniScreener
                                index={index}
                                name={muni.name}
                                pobTotal={muni.poblacionTotal}
                                pobExtranj={muni.poblacionExtranjera}
                            />
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default PageScreenerMuni
