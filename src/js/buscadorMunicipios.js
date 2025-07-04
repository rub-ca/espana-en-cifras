
export async function buscarMunicipios(
    setResultados,
    minPoblacionGeneral,
    maxPoblacionGeneral,
    minPoblacionExtranjera,
    maxPoblacionExtranjera) {
    // muni [0] | data -> genre [1] male | region [2] | year [3]
    // muni [0] | data -> genre [1] male | age [2] | year [3]

    const res = await fetch("/data/PobMuniPais.json")
    if (!res.ok) throw new Error("Error al cargar los datos")
    const json = await res.json()

    const resultados = []

    json.forEach(muni => {
        const pobla = muni.data[0][0][0]
        if (pobla < minPoblacionGeneral || pobla > maxPoblacionGeneral) return

        const poblaTotal = muni.data[0][0][0]
        const poblaEsp = muni.data[0][4][0]
        const resultExtranj = 100 - (poblaEsp / poblaTotal * 100)
        if (resultExtranj < minPoblacionExtranjera || resultExtranj > maxPoblacionExtranjera) return

        const r = {
            name: muni.name,
            poblacionTotal: poblaTotal,
            poblacionExtranjera: resultExtranj.toFixed(2),
        }

        resultados.push(r)
        setResultados(resultados)
    })

}