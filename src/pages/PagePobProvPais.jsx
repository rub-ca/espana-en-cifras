import React, { useState, useEffect } from "react"
import { ageGroups90, genreList, paises13 } from "../js/utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import PageHeader from "../components/core/HeaderPage.jsx"
import TablePobProvPais from "../components/poblacion/tables/TablePobProvPais.jsx"
import PiramidePob from "../components/poblacion/PiramidePob.jsx"
import PobResizer from "../components/poblacion/PobResizer.jsx"
import { loadDataJson } from "../data/loadDataJson.js"


const PagePobProvPais = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDataJson("/data/PobProvPais.json", setData, setLoading)
    }, [])

    // Dropdown states
    const [primarySelected, setPrimarySelected] = useState("")
    const [secondarySelected, setSecondarySelected] = useState([])
    const [terciarySelected, setTerciarySelected] = useState([])
    const [fourthSelected, setFourthSelected] = useState([])

    // Piramide states
    const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)
    const [origenSelectedPiramide, setOrigenSelectedPiramide] = useState("total")

    if (loading) return <div>Cargando datos...</div>

    // Dropdown options
    const primaryOptions = data.map(item => item.name.trim())
    const secondaryOptions = ageGroups90
    const secondaryPlaceholder = "Grupo de edad"
    const terciaryOptions = genreList
    const tertiaryPlaceholder = "Género"
    const fourthOptions = paises13
    const fourthPlaceholder = "Pais de origen"

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
        {
            options: fourthOptions,
            selected: fourthSelected,
            onChange: setFourthSelected,
            placeholder: fourthPlaceholder,
        }
    ]

    return (
        <div className="page-pob-container">
            <header className="page-pob-header">
                <PobFiltersHeader
                    primaryOptions={primaryOptions}
                    primarySelected={primarySelected}
                    setPrimarySelected={setPrimarySelected}
                    secondaryDropdowns={secondaryDropdowns}
                />
            </header>

            <main className="page-pob-main">
                <section className="pob-left-panel">
                    <PiramidePob
                        data={data}
                        pageName="PobProvPais"
                        filters={[primarySelected, yearSelectedPiramide, origenSelectedPiramide]}
                    />
                </section>

                <section className="pob-right-panel">
                    <PobResizer />
                    <TablePobProvPais
                        data={data}
                        primarySelected={primarySelected}
                        secondaryDropdowns={secondaryDropdowns}
                        listeners={[setYearSelectedPiramide, setOrigenSelectedPiramide]}
                    />
                </section>
            </main>
        </div>
    )
}

export default PagePobProvPais
