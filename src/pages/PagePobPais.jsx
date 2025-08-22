import React, { useState, useEffect } from "react"
import { ageGroups90, genreList } from "../js/utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import TablePobPais from "../components/tables/TablePobPais.jsx"
import PiramidePob from "../components/poblacion/PiramidePob.jsx"
import LoadingData from "../components/core/LoadingData.jsx"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../js/loadDataJson.js"

const PagePobPais = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDataJson("/data/PobPais.json", setData, setLoading)
    }, [])

    // Dropdown states
    const [primarySelected, setPrimarySelected] = useState("")
    const [secondarySelected, setSecondarySelected] = useState([])
    const [terciarySelected, setTerciarySelected] = useState([])

    // Piramide states
    const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)

    if (loading) return <LoadingData />
    // Dropdown options
    const primaryOptions = data.map(item => item.name.trim())
    const secondaryOptions = ageGroups90
    const secondaryPlaceholder = "Grupo de edad"
    const terciaryOptions = genreList
    const tertiaryPlaceholder = "Género"

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
                <PiramidePob
                    data={data}
                    pageName="PobPais"
                    filters={[primarySelected, yearSelectedPiramide]}
                />
            </div>

            <PobResizer />

            <div className="page-data-container__right-side">
                <PobFiltersHeader
                    primaryOptions={primaryOptions}
                    primarySelected={primarySelected}
                    setPrimarySelected={setPrimarySelected}
                    secondaryDropdowns={secondaryDropdowns}
                />

                <div className="page-data-container__93">
                    <TablePobPais
                        data={data}
                        primarySelected={primarySelected}
                        secondaryDropdowns={secondaryDropdowns}
                        listeners={[setYearSelectedPiramide]}
                    />
                </div>
            </div>
        </div>
    )
}

export default PagePobPais
