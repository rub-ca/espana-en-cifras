import React, { useState, useEffect } from "react"
import { buscarMunicipios } from '../js/buscadorMunicipios.js'
import DualRangeSlider from "../components/filters/DualRangeSlider.jsx"
import ItemMuniScreener from "../components/poblacion/ItemMuniScreener.jsx"
import { loadDataJson } from "../data/loadDataJson.js"

const PageScreenerMuni = () => {
    const [dataMuniPais, setDataMuniPais] = useState(null)
    const [dataMuniEdad, setDataMuniEdad] = useState(null)

    const [resultados, setResultados] = useState({
        resultados: []
    })

    const [minPoblacionGeneral, setMinPoblacionGeneral] = useState(100)
    const [maxPoblacionGeneral, setMaxPoblacionGeneral] = useState(500000)
    const minLimitPoblacionGeneral = 0
    const maxLimitPoblacionGeneral = 5000000

    const [minPoblacionExtranjera, setMinPoblacionExtranjera] = useState(20)
    const [maxPoblacionExtranjera, setMaxPoblacionExtranjera] = useState(80)
    const [poblacionExtranjeraActivado, setPoblacionExtranjeraActivado] = useState(false)
    const minLimitPoblacionExtranjera = 0
    const maxLimitPoblacionExtranjera = 100

    const [minPorcentajeEdad, setMinPorcentajeEdad] = useState(0)
    const [maxPorcentajeEdad, setMaxPorcentajeEdad] = useState(100)
    const [porcentajeEdadActivado, setPorcentajeEdadActivado] = useState(false)
    const minLimitPorcentajeEdad = 0
    const maxLimitPorcentajeEdad = 100

    const [grupoEdadMin, setGrupoEdadMin] = useState(0)
    const [grupoEdadMax, setGrupoEdadMax] = useState(100)
    const minLimitGrupoEdad = 0
    const maxLimitGrupoEdad = 100

    useEffect(() => {
        loadDataJson("/data/PobMuniPais.json", setDataMuniPais)
        loadDataJson("/data/PobMuniEdad.json", setDataMuniEdad)
    }, [])

    return (
        <div className="page-screener-container">
            <div className="screener-left-panel">
                <h2>Buscador de municipios</h2>

                <DualRangeSlider
                    title={'Cantidad de habitantes'}
                    isExponential={true}
                    minValue={minPoblacionGeneral}
                    setMinValue={setMinPoblacionGeneral}
                    maxValue={maxPoblacionGeneral}
                    setMaxValue={setMaxPoblacionGeneral}
                    minLimit={minLimitPoblacionGeneral}
                    maxLimit={maxLimitPoblacionGeneral}
                />

                <DualRangeSlider
                    title={'Porcentaje de población en el rango'}
                    minValue={minPorcentajeEdad}
                    setMinValue={setMinPorcentajeEdad}
                    maxValue={maxPorcentajeEdad}
                    setMaxValue={setMaxPorcentajeEdad}
                    minLimit={minLimitPorcentajeEdad}
                    maxLimit={maxLimitPorcentajeEdad}
                    activado={porcentajeEdadActivado}
                    setActivado={setPorcentajeEdadActivado}
                    marginBot="0px"
                    shows='percentage'
                />

                <DualRangeSlider
                    title={'Rango de edad'}
                    minValue={grupoEdadMin}
                    setMinValue={setGrupoEdadMin}
                    maxValue={grupoEdadMax}
                    setMaxValue={setGrupoEdadMax}
                    minLimit={minLimitGrupoEdad}
                    maxLimit={maxLimitGrupoEdad}
                    activado={porcentajeEdadActivado}
                    setActivado={setPorcentajeEdadActivado}
                    shows='age100'
                />

                <DualRangeSlider
                    title={'Porcentaje población extranjera'}
                    minValue={minPoblacionExtranjera}
                    setMinValue={setMinPoblacionExtranjera}
                    maxValue={maxPoblacionExtranjera}
                    setMaxValue={setMaxPoblacionExtranjera}
                    minLimit={minLimitPoblacionExtranjera}
                    maxLimit={maxLimitPoblacionExtranjera}
                    activado={poblacionExtranjeraActivado}
                    setActivado={setPoblacionExtranjeraActivado}
                    shows='percentage'
                />

                <button
                    className='screener-buscar-button'
                    disabled={dataMuniPais === null}
                    children={dataMuniPais === null ? "Cargando..." : "Buscar!"}
                    onClick={() =>
                        buscarMunicipios(
                            dataMuniPais, dataMuniEdad, setResultados,
                            minPoblacionGeneral, maxPoblacionGeneral,
                            poblacionExtranjeraActivado, minPoblacionExtranjera, maxPoblacionExtranjera,
                            porcentajeEdadActivado, minPorcentajeEdad, maxPorcentajeEdad,
                            grupoEdadMin, grupoEdadMax,
                        )
                    }>
                </button>
            </div>

            <div className="screener-right-panel">
                {resultados.resultados.length > 0 && resultados.resultados.map((r, index) => (
                    <ItemMuniScreener
                        index={index}
                        name={r.name}
                        pobTotal={r.poblacionTotal}
                        pobExtranj={r.pobExtranj}
                        porcentajeEdad={r.porcentajeEdad}
                        maxLengthPoblacionTotal={resultados.maxLengthPoblacionTotal}
                    />
                ))}
            </div>
        </div>
    )
}

export default PageScreenerMuni
