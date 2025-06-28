import React, { useState, useEffect } from "react"
import data from "../data/PobProvPais.json"
import "./css/GeneralPagePob.css"
import { ageGroups90, genreList, paises13 } from "../utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import MainTitle from "../components/core/MainTitle.jsx"
import SecondaryTitle from "../components/core/SecondaryTitle.jsx"
import TablePobProvPais from "../components/poblacion/TablePobProvPais.jsx"
import PiramidePob from "../components/poblacion/PiramidePob.jsx"


const PobProvPais = () => {
  // Dropdown states
  const [primarySelected, setPrimarySelected] = useState("")
  const [secondarySelected, setSecondarySelected] = useState([])
  const [terciarySelected, setTerciarySelected] = useState([])
  const [fourthSelected, setFourthSelected] = useState([])

  // Dropdown options
  const primaryOptions = data.map(item => item.name.trim())
  const secondaryOptions = ageGroups90
  const secondaryPlaceholder = "Grupo de edad"
  const terciaryOptions = genreList
  const tertiaryPlaceholder = "Género"
  const fourthOptions = paises13
  const fourthPlaceholder = "Pais de origen"


  // Piramide states
  const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)
  const [origenSelectedPiramide, setOrigenSelectedPiramide] = useState("total")

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
            pageName="PobProvPais"
            filters={[primarySelected, yearSelectedPiramide, origenSelectedPiramide]}
          />
        </section>

        <section className="pob-right-panel">
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

export default PobProvPais
