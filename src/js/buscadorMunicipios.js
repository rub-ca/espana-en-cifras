import { addDots } from './utilsPob.js'

export async function buscarMunicipios(
    dataMuniPais, dataMuniEdad, setResultados,
    minPoblacionGeneral, maxPoblacionGeneral,
    poblacionExtranjeraActivado, minPoblacionExtranjera, maxPoblacionExtranjera,
    porcentajeEdadActivado, minPorcentajeEdad, maxPorcentajeEdad,
    grupoEdadMin, grupoEdadMax,
) {
    // muni [0] | data -> genre [1] male | region [2] | year [3]
    // muni [0] | data -> genre [1] male | age [2] | year [3]

    const resultados = []
    setResultados(resultados)

    const header = {
        name: "Municipio",
        poblacionTotal: "Poblacion total",
        pobExtranj: poblacionExtranjeraActivado ? 'Población extranjera' : null,
        porcentajeEdad: porcentajeEdadActivado ? 'Porcentaje en grupo de edad' : null,
    }

    resultados.push(header)

    dataMuniPais.forEach(muni => {
        const poblaTotal = muni.data[0][0][0]
        let resultExtranj = null
        let resultPorcentajeEdad = porcentajeEdadActivado ? 1 : null

        if (poblaTotal < minPoblacionGeneral || poblaTotal > maxPoblacionGeneral) return

        // Filtro poblacion extranjera activado
        if (poblacionExtranjeraActivado) {
            const poblaEsp = muni.data[0][4][0]
            resultExtranj = 100 - (poblaEsp / poblaTotal * 100)
            if (resultExtranj < minPoblacionExtranjera || resultExtranj > maxPoblacionExtranjera) return
            resultExtranj = resultExtranj.toFixed(2) + "%"
        }

        const r = {
            name: muni.name,
            poblacionTotal: addDots(poblaTotal),
            pobExtranj: resultExtranj,
            porcentajeEdad: resultPorcentajeEdad,
        }

        resultados.push(r)
    })
    setResultados(resultados)
}