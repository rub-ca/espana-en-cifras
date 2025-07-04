import React, { useState, useEffect } from "react"
import { genreList, paises59 } from "../utilsPob.js"
import PobFiltersHeader from "../components/poblacion/PobFiltersHeader.jsx"
import MainTitle from "../components/core/MainTitle.jsx"
import TablePobMuni from "../components/poblacion/tables/TablePobMuni.jsx"

const PagePobMuniPais = () => {
  const [namesPrimary, setNamesPrimary] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await fetch("/data/PobMuniPais.json")
        if (!res.ok) throw new Error("Error al cargar los datos")
        const json = await res.json()
        setData(json)

        const resNames = await fetch("/data/PobMuniPais-names.json")
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

  if (loading) return <div>Cargando datos...</div>
  if (error) return <div>Error</div>

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
    <div className="page-container">
      <div className="page-header">
        <MainTitle />
      </div>

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
    </div>
  )
}

export default PagePobMuniPais
