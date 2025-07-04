import React, { useState, useEffect } from "react"
import { genreList, ageGroups100 } from "../js/utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import PageHeader from "../components/core/PageHeader.jsx"
import TablePobMuni from "../components/poblacion/tables/TablePobMuni.jsx"
import PiramidePob from "../components/poblacion/PiramidePob.jsx"

const PagePobMuniPais = () => {
  const [namesPrimary, setNamesPrimary] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await fetch("/data/PobMuniEdad.json")
        if (!res.ok) throw new Error("Error al cargar los datos")
        const json = await res.json()
        setData(json)

        const resNames = await fetch("/data/PobMuniEdad-names.json")
        if (!resNames.ok) throw new Error("Error al cargar los nombres")
        const namesJson = await resNames.json()
        setNamesPrimary(namesJson)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [])

  // Dropdown states
  const [primarySelected, setPrimarySelected] = useState("")
  const [secondarySelected, setSecondarySelected] = useState([])
  const [terciarySelected, setTerciarySelected] = useState([])

  // Piramide states
  const [yearSelectedPiramide, setYearSelectedPiramide] = useState(2024)

  if (loading) return <div>Cargando datos...</div>
  if (error) return <div>Error</div>

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
    <div className="page-container">
     <PageHeader />

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
    </div>
  )
}

export default PagePobMuniPais
