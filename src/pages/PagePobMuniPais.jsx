import React, { useState, useEffect } from "react"
import { genreList, paises59 } from "../js/utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import PageHeader from "../components/core/HeaderPage.jsx"
import TablePobMuni from "../components//tables/TablePobMuni.jsx"
import { loadDataJson } from "../data/loadDataJson.js"

const PagePobMuniPais = () => {
    const [namesPrimary, setNamesPrimary] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)

    useEffect(() => {
        loadDataJson("/data/PobMuniPais.json", setData, setLoading)
        loadDataJson("/data/PobMuniPais-names.json", setNamesPrimary, setLoading2)
    }, [])

    // Dropdown states
    const [primarySelected, setPrimarySelected] = useState("")
    const [secondarySelected, setSecondarySelected] = useState([])
    const [terciarySelected, setTerciarySelected] = useState([])

    if (loading) return <div>Cargando datos...</div>
    if (loading2) return <div>Cargando datos...</div>

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
                <section className="pob-left-panel"></section>

                <section className="pob-right-panel">
                    <TablePobMuni
                        data={data}
                        primarySelected={primarySelected}
                        secondaryDropdowns={secondaryDropdowns}
                        page="PagePobMuniPais"
                    />
                </section>
            </main>
        </div>
    )
}

export default PagePobMuniPais
