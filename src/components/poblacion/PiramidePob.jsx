import React, { lazy, Suspense } from "react"
import { getYear, getIndexPrimarySelected, getPais13Inverse, getPais13InverseInclude, getYearInverse, getPais13, ageGroups90, ageGroups100 } from "../../js/utilsPob.js"

const ReactECharts = lazy(() => import('echarts-for-react'))

// First filter[0] always is the primary filter
// Second filter[1] is always yearSelected
const PiramidePob = ({ data, pageName, filters }) => {
    let resultadosMujeres = null
    let resultadoHombres = null

    let infoTitleArray = []

    const yearIndexSelected = getYear(filters[1])

    infoTitleArray.push("")
    infoTitleArray.push("Año: " + getYearInverse(yearIndexSelected))

    let labelsAge = ageGroups90

    if (pageName === "PobPais") {
        let primarySelected = getIndexPrimarySelected(data, filters[0] || "Total")
        const datos = data[primarySelected].data
        infoTitleArray[0] = data[primarySelected].name.trim()

        resultadoHombres = datos
            .map(grupoEtario => {
                const yearData = grupoEtario[yearIndexSelected]
                if (yearData && yearData[1] != null) return -yearData[1]
                return null
            })
            .filter(valor => valor !== null)

        resultadoHombres = resultadoHombres.slice(1)

        resultadosMujeres = datos
            .map(grupoEtario => {
                const yearData = grupoEtario[yearIndexSelected]
                if (yearData && yearData[2] != null) return yearData[2]
                return null
            })
            .filter(valor => valor !== null)
        resultadosMujeres = resultadosMujeres.slice(1)
    } else if (pageName === "PobProvPais") {
        let primarySelected = getIndexPrimarySelected(data, filters[0] || "Total Nacional")
        const datos = data[primarySelected].data
        infoTitleArray[0] = data[primarySelected].name.trim()

        let indexPais = getPais13Inverse(filters[2])
        indexPais = indexPais === -1 ? getPais13InverseInclude(filters[2]) : indexPais

        resultadoHombres = datos
            .map(grupoEtario => {
                const paisData = grupoEtario[indexPais]?.[yearIndexSelected]?.[1]
                return paisData != null ? -paisData : null
            })
            .filter(v => v !== null)


        resultadoHombres = resultadoHombres.slice(1)

        resultadosMujeres = datos
            .map(grupoEtario => {
                const paisData = grupoEtario[indexPais]?.[yearIndexSelected]?.[2]
                return paisData != null ? paisData : null
            })
            .filter(valor => valor !== null)

        resultadosMujeres = resultadosMujeres.slice(1)

        infoTitleArray.push("Pais origen: " + getPais13(indexPais).trim())
    } else if (pageName === "PobMuniEdad") {
        let primarySelected = getIndexPrimarySelected(data, filters[0] || "Total Nacional")
        const datos = data[primarySelected].data
        infoTitleArray[0] = data[primarySelected].name.trim()

        resultadoHombres = datos[1].map(elemento => -elemento[yearIndexSelected])
        resultadoHombres = resultadoHombres.slice(1)

        resultadosMujeres = datos[2].map(elemento => elemento[yearIndexSelected])
        resultadosMujeres = resultadosMujeres.slice(1)

        labelsAge = ageGroups100
    }
    else return <div className="contenedor-piramide"></div>


    const maxValue = Math.max(
        ...resultadoHombres.map(v => Math.abs(v)),
        ...resultadosMujeres.map(v => Math.abs(v))
    )

    labelsAge = labelsAge.slice(1) // Remove 'total' label

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function (params) {
                let result = params[0].name + '<br/>'
                params.forEach(param => {
                    result += `${param.seriesName}: ${Math.abs(param.value)}<br/>`
                })
                return result
            }
        },
        legend: {
            data: ['Hombres', 'Mujeres'],
            top: 30,
            left: '36%',
            itemGap: 30,
            textStyle: {
                fontWeight: 'bold' // Negrita
            },
        },

        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            min: -maxValue,
            max: maxValue,
            axisLabel: { show: false },
            splitLine: { show: false }
        },
        yAxis: {
            type: 'category',
            data: labelsAge,
        },
        series: [
            {
                name: 'Hombres',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: 'rgb(141, 248, 252)'
                },
                label: {
                    show: true,
                    fontWeight: 'bold',
                    position: function (params) {
                        return Math.abs(params.value) < maxValue * 0.1 ? 'right' : 'inside'
                    },
                    formatter: function (params) {
                        return Math.abs(params.value).toLocaleString('es-ES')
                    }
                },
                data: resultadoHombres
            },
            {
                name: 'Mujeres',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: 'rgb(244, 175, 255)'
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: function (params) {
                        return params.value.toLocaleString('es-ES')
                    },
                    fontWeight: 'bold'
                },
                data: resultadosMujeres
            }
        ]

    }

    return <div className="contenedor-piramide">
        {infoTitleArray.map((titulo, index) => (
            <h2 key={index}>{titulo}</h2>
        ))}

        <Suspense fallback={<div>Cargando gráfico...</div>}>
            <ReactECharts option={options} style={{ height: '600px', width: '100%' }} />
        </Suspense>
    </div>
}

export default PiramidePob
