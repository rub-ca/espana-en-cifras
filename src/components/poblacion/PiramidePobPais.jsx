import React, { lazy, Suspense } from "react"
import { getYear, getIndexPrimarySelected, getPais13Inverse, getPais13InverseInclude, getPais59, getYearInverse, getPais13, ageGroups90, ageGroups100 } from "../../js/utilsPob.js"
import PiramidePobHeader from "./PiramidePobHeader.jsx"

const ReactECharts = lazy(() => import('echarts-for-react'))

// First filter[0] always is the primary filter
// Second filter[1] is always yearSelected
const PiramidePobPais = ({ data, filters }) => {
    let resultadosMujeres = null
    let resultadosHombres = null
    let labelsCountries = []

    // Titulo del grafico
    let infoTitleArray = []

    const yearIndexSelected = getYear(filters[1]) || 0
    
    infoTitleArray.push("")
    infoTitleArray.push("Año: " + getYearInverse(yearIndexSelected))

    let primarySelected = getIndexPrimarySelected(data, filters[0] || "Total")

    if (primarySelected === -1) { primarySelected = 0 }

    const datos = data[primarySelected].data
    infoTitleArray[0] = data[primarySelected].name.trim()

    const regiones = datos[0].length   // 59

    // 1. Calcular valor de referencia usando genero=0, año=0
    const valorPorRegion = Array.from({ length: regiones }, (_, r) => {
        return { region: r, valor: datos[0][r][yearIndexSelected] }
    })

    // 2. Ordenar por ese valor y quedarse con las regiones de mas poblacion
    valorPorRegion.sort((a, b) => b.valor - a.valor)
    const topRegiones = valorPorRegion.slice(0, 18).map(obj => obj.region)

    // 3. Construir nuevo array con [índice_original, ...datos_años]
    // El array resultante de los filtros tiene un nuevo año, 
    // el valor que hay en year[0] es el indice de la region original
    const datosFiltrados = datos.map(genero =>
        topRegiones.map(r => [r, ...genero[r]])
    )

    // Array con [1][][0] eliminando el primer año (índice)
    resultadosHombres = datosFiltrados[1].map(regionAnios => {
        const anios = regionAnios.slice(1) // quita el índice
        return anios[yearIndexSelected]                    // año 0 original
    })
    resultadosHombres = resultadosHombres.slice(1)

    // Array con [2][][0] eliminando el primer año (índice)
    resultadosMujeres = datosFiltrados[2].map(regionAnios => {
        const anios = regionAnios.slice(1) // quita el índice
        return anios[yearIndexSelected]                    // año 0 original
    })
    resultadosMujeres = resultadosMujeres.slice(1)

    datosFiltrados[0].forEach((cou) => {
        labelsCountries.push(getPais59(cou[0]))
    })
    labelsCountries = labelsCountries.slice(1)


    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter(params) {
                let result = params[0].name + '<br/>'
                params.forEach(p => {
                    result += `${p.seriesName}: ${p.value.toLocaleString('es-ES')}<br/>`
                })
                return result
            }
        },
        grid: { left: '4%', right: '4%', bottom: '4%', top: '0%', containLabel: true },

        xAxis: {
            type: 'log',
            logBase: 10,
            max: 25000000,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ccc',
                    width: 1,
                    type: 'solid',
                    opacity: 0.8
                }
            },
        },
        yAxis: {
            type: 'category',
            data: labelsCountries,
            axisTick: { show: false },
            axisLabel: {
                fontWeight: 'bold',
            }
        },

        series: [
            {
                name: 'Hombres',
                type: 'bar',
                itemStyle: { color: 'rgb(141, 248, 252)' },
                barWidth: '35%',
                barGap: '0%',
                barCategoryGap: '80%',
                label: {
                    show: true,
                    fontWeight: 'bold',
                    position: 'insideRight',
                    formatter: ({ value }) => value.toLocaleString('es-ES')
                },
                data: resultadosHombres.map(v => Math.abs(v))
            },
            {
                name: 'Mujeres',
                type: 'bar',
                itemStyle: { color: 'rgb(244, 175, 255)' },
                barWidth: '35%',
                barGap: '0%',
                barCategoryGap: '80%',
                label: {
                    show: true,
                    fontWeight: 'bold',
                    position: 'insideRight',
                    formatter: ({ value }) => value.toLocaleString('es-ES')
                },
                data: resultadosMujeres.map(v => Math.abs(v))
            }
        ]
    }



    return (
        <>
            <PiramidePobHeader infoTitleArray={infoTitleArray} />

            <Suspense fallback={<div>Cargando gráfico...</div>}>
                <ReactECharts option={options} style={{ height: '87%', width: '100%' }} />
            </Suspense>
        </>
    )
}

export default PiramidePobPais
