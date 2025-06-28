import React, { useState } from "react"
import data from "../data/PobMuniPais.json"
import namesPrimary from "../data/PobMuniPais-names.json"
import "./css/GeneralPagePob.css"
import { genreList, paises59 } from "../utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import MainTitle from "../components/core/MainTitle.jsx"
import SecondaryTitle from "../components/core/SecondaryTitle.jsx"
import TablePobMuniPais from "../components/poblacion/TablePobMuniPais.jsx"


const PobMuniPais = () => {
  // Dropdown states
  const [primarySelected, setPrimarySelected] = useState("")
  const [secondarySelected, setSecondarySelected] = useState([])
  const [terciarySelected, setTerciarySelected] = useState([])

  // Dropdown options
  const primaryOptions = namesPrimary
  const secondaryOptions = genreList
  const secondaryPlaceholder = "Género"
  const terciaryOptions = paises59
  const tertiaryPlaceholder = "Pais de origen"

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
    }
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
        </section>

        <section className="pob-right-panel">
          {<TablePobMuniPais
            data={data}
            primarySelected={primarySelected}
            secondaryDropdowns={secondaryDropdowns}
          />}
        </section>
      </main>
    </div>
  )
}

export default PobMuniPais
