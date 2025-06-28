import React, { useState, useEffect } from "react"
import data from "../data/PobPais.json"
import "./css/GeneralPagePob.css"
import { ageGroups90, genreList } from "../utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import MainTitle from "../components/core/MainTitle.jsx"
import SecondaryTitle from "../components/core/SecondaryTitle.jsx"
import TablePobPais from "../components/poblacion/TablePobPais.jsx"
import PiramidePob from "../components/poblacion/PiramidePob.jsx"


const PobPais = () => {
  // Dropdown states
  const [primarySelected, setPrimarySelected] = useState("")
  const [secondarySelected, setSecondarySelected] = useState([])
  const [terciarySelected, setTerciarySelected] = useState([])

  // Dropdown options
  const primaryOptions = data.map(item => item.name.trim())
  const secondaryOptions = ageGroups90
  const secondaryPlaceholder = "Grupo de edad"
  const terciaryOptions = genreList
  const tertiaryPlaceholder = "Género"

  // Piramide states
  const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)

  useEffect(() => {
    // console.log({ primarySelected, secondarySelected, terciarySelected })
  }, [primarySelected, secondarySelected, terciarySelected])

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
        <MainTitle />
        <SecondaryTitle title="Población por País" />

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
            pageName="PobPais"
            filters={[primarySelected, yearSelectedPiramide]}
          />
        </section>

        <section className="pob-right-panel">
          <TablePobPais
            data={data}
            primarySelected={primarySelected}
            secondaryDropdowns={secondaryDropdowns}
            listeners={[setYearSelectedPiramide]}
          />
        </section>
      </main>
    </div>
  )
}

export default PobPais
