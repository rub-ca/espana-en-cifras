import React, { useState, useEffect } from "react"
import { genreList, ageGroups100 } from "../js/utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import TablePobMuni from "../components//tables/TablePobMuni.jsx"
import PiramidePob from "../components/poblacion/PiramidePob.jsx"
import { loadDataJson, loadDataZipJson } from "../data/loadDataJson.js"

const PagePobMuniPais = () => {
  const [namesPrimary, setNamesPrimary] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(true)

  useEffect(() => {
    loadDataZipJson("/data/PobMuniEdad.zip", setData, setLoading)
    loadDataJson("/data/PobMuniEdad-names.json", setNamesPrimary, setLoading2)
  }, [])

  // Dropdown states
  const [primarySelected, setPrimarySelected] = useState("")
  const [secondarySelected, setSecondarySelected] = useState([])
  const [terciarySelected, setTerciarySelected] = useState([])

  // Piramide states
  const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)

  if (loading) return <div>Cargando datos...</div>
  if (loading2) return <div>Cargando datos...</div>

  // Dropdown options
  const primaryOptions = namesPrimary
  const secondaryOptions = genreList
  const secondaryPlaceholder = "Género"
  const terciaryOptions = ageGroups100
  const tertiaryPlaceholder = "Edad"

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
        <section className="pob-left-panel">
          <PiramidePob
            data={data}
            pageName="PobMuniEdad"
            filters={[primarySelected, yearSelectedPiramide]}
          />
        </section>

        <section className="pob-right-panel">
          <TablePobMuni
            data={data}
            primarySelected={primarySelected}
            secondaryDropdowns={secondaryDropdowns}
            page="PagePobMuniEdad"
            listeners={[setYearSelectedPiramide]}
          />
        </section>
      </main>
    </div>
  )
}

export default PagePobMuniPais
