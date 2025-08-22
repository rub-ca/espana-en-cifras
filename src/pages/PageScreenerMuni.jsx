import React, { useState, useEffect } from "react"
import { buscarMunicipios, getHeaderScreener } from '../js/buscadorMunicipios.js'
import DualRangeSlider from "../components/filters/DualRangeSlider.jsx"
import ItemMuniScreener from "../components/poblacion/ItemMuniScreener.jsx"
import LoadingData from "../components/core/LoadingData.jsx"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataZipJson } from "../data/loadDataJson.js"

const PageScreenerMuni = () => {
    const [dataMuniPais, setDataMuniPais] = useState(null)
    const [dataMuniEdad, setDataMuniEdad] = useState(null)

    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)

    const [resultados, setResultados] = useState({
        resultados: [getHeaderScreener()]
    })

    const [minPoblacionGeneral, setMinPoblacionGeneral] = useState(0)
    const [maxPoblacionGeneral, setMaxPoblacionGeneral] = useState(15000)
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
        loadDataZipJson("/data/PobMuniPais.zip", setDataMuniPais, setLoading1)
        loadDataZipJson("/data/PobMuniEdad.zip", setDataMuniEdad, setLoading2)
    }, [])

    if (loading1) return <LoadingData />
    if (loading2) return <LoadingData />

    return (
        <div className="page-data-container">
            <div className="page-data-container__left-side">
                <div className="pob-screener-filters-container">
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
                        shows='percentage'
                        marginBottom="10px"
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

                    <div className="pob-screener-button-container">
                        <button
                            className='screener-buscar-button'
                            disabled={dataMuniPais === null}
                            children={dataMuniPais === null ? "Cargando..." : "Buscar!"}
                            onClick={() =>
                                buscarMunicipios(
                                    setResultados, dataMuniPais, dataMuniEdad,
                                    minPoblacionGeneral, maxPoblacionGeneral,
                                    poblacionExtranjeraActivado, minPoblacionExtranjera, maxPoblacionExtranjera,
                                    porcentajeEdadActivado, minPorcentajeEdad, maxPorcentajeEdad,
                                    grupoEdadMin, grupoEdadMax
                                )
                            }>
                        </button>
                    </div>
                </div>
            </div>

            <PobResizer block />

            <div className="page-data-container__right-side">
                <div className="pob-screener-results-container">
                    <div className="pob-screener-results-container__div">
                        {resultados.resultados.length > 0 && resultados.resultados.map((r, index) => (
                            <ItemMuniScreener
                                key={r.name + index}
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
            </div>
        </div>
    )
}

export default PageScreenerMuni
