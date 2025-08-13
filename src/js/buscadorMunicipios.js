import { addDots, getIndexWhichContainsAgeGroup100DRG } from './utilsPob.js'

const header = {
    name: "Municipio",
    poblacionTotal: "Cantidad de habitantes",
    pobExtranj: 'Población extranjera',
    porcentajeEdad: 'Poblacion en rango de edad',
}

export function getHeaderScreener() {
    return header
}

export async function buscarMunicipios(
    setResultados, dataMuniPais, dataMuniEdad,
    minPoblacionGeneral, maxPoblacionGeneral,
    poblacionExtranjeraActivado, minPoblacionExtranjera, maxPoblacionExtranjera,
    porcentajeEdadActivado, minPorcentajeEdad, maxPorcentajeEdad,
    grupoEdadMin, grupoEdadMax
) {
    // muni [0] | data -> genre [1] male | region [2] | year [3]
    // muni [0] | data -> genre [1] male | age [2] | year [3]

    const resultados = []
    let maxLengthPoblacionTotal = 0

    setResultados({
        resultados: resultados,
        maxLengthPoblacionTotal: maxLengthPoblacionTotal
    })


    resultados.push(header)

    let count = 0
    dataMuniPais.forEach((muni, muniIndex) => {
        if (count >= 499) return // Limitar a 500 resultados

        const poblaTotal = muni.data[0][0][0]
        let resultExtranj = null
        let resultPorcentajeEdad = null

        if (poblaTotal < minPoblacionGeneral || poblaTotal > maxPoblacionGeneral) return

        // Filtro poblacion extranjera
        const poblaEsp = muni.data[0][4][0] // 4 es el indice de España
        resultExtranj = 100 - (poblaEsp / poblaTotal * 100)
        if (poblacionExtranjeraActivado && (resultExtranj < minPoblacionExtranjera || resultExtranj > maxPoblacionExtranjera)) return
        resultExtranj = resultExtranj.toFixed(2) + "%"

        // Filtro porcentaje edad
        const iGrupoMin = getIndexWhichContainsAgeGroup100DRG(grupoEdadMin)
        const iGrupoMax = getIndexWhichContainsAgeGroup100DRG(grupoEdadMax)

        let sumaPoblaEnGrupo = 0
        for (let x = iGrupoMin; x <= iGrupoMax; x++) { sumaPoblaEnGrupo += dataMuniEdad[muniIndex].data[0][x][0] }
        resultPorcentajeEdad = sumaPoblaEnGrupo / poblaTotal * 100

        if (porcentajeEdadActivado && (resultPorcentajeEdad < minPorcentajeEdad || resultPorcentajeEdad > maxPorcentajeEdad)) return
        resultPorcentajeEdad = resultPorcentajeEdad.toFixed(2) + "%"

        const r = {
            name: muni.name,
            poblacionTotal: addDots(poblaTotal),
            porcentajeEdad: resultPorcentajeEdad,
            pobExtranj: resultExtranj,
        }

        if (r.poblacionTotal.length > maxLengthPoblacionTotal) { maxLengthPoblacionTotal = r.poblacionTotal.length }
        resultados.push(r)
        count++
    })

    setResultados({
        resultados: resultados,
        maxLengthPoblacionTotal: maxLengthPoblacionTotal
    })
}