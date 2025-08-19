import React, { useState, useEffect } from "react"
import { genreList, paises59 } from "../js/utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import PiramidePobPais from "../components/poblacion/PiramidePobPais.jsx"
import LoadingData from "../components/core/LoadingData.jsx"
import TablePobMuni from "../components//tables/TablePobMuni.jsx"
import { loadDataJson, loadDataZipJson } from "../data/loadDataJson.js"

const PagePobMuniPais = () => {
    const [namesPrimary, setNamesPrimary] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)

    useEffect(() => {
        loadDataZipJson("/data/PobMuniPais.zip", setData, setLoading)
        loadDataJson("/data/PobMuniPais-names.json", setNamesPrimary, setLoading2)
    }, [])

    // Dropdown states
    const [primarySelected, setPrimarySelected] = useState("")
    const [secondarySelected, setSecondarySelected] = useState([])
    const [terciarySelected, setTerciarySelected] = useState([])

    const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)

    if (loading) return <LoadingData />
    if (loading2) return <LoadingData />

    // Dropdown options
    const primaryOptions = namesPrimary
    const secondaryOptions = genreList
    const secondaryPlaceholder = "Género"
    const terciaryOptions = paises59
    const tertiaryPlaceholder = "País de origen"

    const secondaryDropdowns = [
        {
            options: secondaryOptions,
            selected: secondarySelected,
            onChange: setSecondarySelected,
            placeholder: secondaryPlaceholder,
        },
        {
            options: terciaryOptions,
            selected: terciarySelected,
            onChange: setTerciarySelected,
            placeholder: tertiaryPlaceholder,
        },
    ]

    return (
        <div className="page-data-container">
            <div className="page-data-container__left-side">
                <PiramidePobPais
                    data={data}
                    filters={[primarySelected, yearSelectedPiramide]}
                />
            </div>

            <PobResizer smallTable={true} />

            <div className="page-data-container__right-side">
                <PobFiltersHeader
                    primaryOptions={primaryOptions}
                    primarySelected={primarySelected}
                    setPrimarySelected={setPrimarySelected}
                    secondaryDropdowns={secondaryDropdowns}
                />

                <div className="page-data-container__93">
                    <TablePobMuni
                        data={data}
                        primarySelected={primarySelected}
                        secondaryDropdowns={secondaryDropdowns}
                        listeners={[setYearSelectedPiramide]}
                        page="PagePobMuniPais"
                    />
                </div>
            </div>
        </div>
    )
}

export default PagePobMuniPais
