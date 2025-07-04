
export async function buscarMunicipios(
    dataMuniPais,
    setResultados,
    minPoblacionGeneral,
    maxPoblacionGeneral,
    minPoblacionExtranjera,
    maxPoblacionExtranjera) {
    // muni [0] | data -> genre [1] male | region [2] | year [3]
    // muni [0] | data -> genre [1] male | age [2] | year [3]

    const resultados = []
    setResultados(resultados)

    dataMuniPais.forEach(muni => {
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