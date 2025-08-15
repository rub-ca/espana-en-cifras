import React, { lazy, Suspense } from "react"
import { getIndexComunidad19WithInclude } from "../../js/utilsEmp.js"

const ReactECharts = lazy(() => import('echarts-for-react'))

// PageEmpPubPri comunidad [0] publico [1] privado

const LineChartEmpPubPri = ({ type, comunidadSelected, seriesData, seriesNames }) => {
    const getOption = type === 'all' ? getOptionsAll : getOptionsComunidad
    return getOption({ comunidadSelected, seriesData, seriesNames })
}

function getOptionsAll({ seriesData }) {
    const newArray = seriesData.map(({ name, data }) => ({
        name,
        yearsArray:
            data[1].map((val, i) => Math.round(data[0][i] / (val) * 1000) / 1000)
                .reverse()
    }))

    const numYears = seriesData[0].data[0].length
    const reversedYearsLegend = Array.from({ length: numYears }, (_, i) => (2025 - i).toString()).reverse()

    const option = {
        title: {
            text: 'Relación empleo público y privado',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                const sorted = [...params].sort((a, b) => b.data - a.data)
                let result = `${sorted[0].axisValue}<br/>`
                sorted.forEach(item => {
                    result += `${item.marker} ${item.seriesName}: ${item.data}<br/>`
                })
                return result
            }
        },
        xAxis: {
            type: 'category',
            data: reversedYearsLegend,
        },
        yAxis: {
            type: 'log',
            name: 'ratio',
            logBase: 2,
            minorSplitLine: { show: true },
            min: 0.1,
            max: 1.5,
        },
        series: newArray.map(serie => ({
            name: serie.name,
            type: 'line',
            data: serie.yearsArray,
        })),
    }

    return <ReactECharts option={option} style={{ height: "60%", width: "100%" }} />
}


function getOptionsComunidad({ comunidadSelected, seriesData, seriesNames }) {
    const selectedSplitted = comunidadSelected.split("/")[0].trim()

    let titleChart = selectedSplitted
    if (selectedSplitted.toLowerCase() != "total nacional") {
        titleChart = selectedSplitted.slice(3)
    }

    const data = seriesData[getIndexComunidad19WithInclude(selectedSplitted)].data
    const numYears = data[0].length

    const reversedYearsLegend = Array.from({ length: numYears }, (_, i) => (2025 - i).toString()).reverse()
    const reversedSeriesData = data.map(d => [...d].reverse())

    const maximoPrivado = Math.round(Math.max(...reversedSeriesData.flat()) * 1.15)
    const maximoPrivadoDivided = Math.round(maximoPrivado / 3)
    const maximoPublico = Math.max(Math.max(...reversedSeriesData[0]), maximoPrivadoDivided)

    const colors = [
        'rgba(184, 60, 60, 0.8)',
        'rgba(52, 81, 134, 0.8)',
    ]

    const option = {
        title: {
            text: titleChart,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: seriesNames,
            top: 40,
        },
        xAxis: {
            type: 'category',
            data: reversedYearsLegend,
        },
        yAxis: [
            {
                type: 'value',
                name: seriesNames[0],
                position: 'left',
                axisLabel: {
                    color: colors[0],
                },
                max: maximoPublico
            },
            {
                type: 'value',
                name: seriesNames[1],
                position: 'right',
                axisLabel: {
                    color: colors[1],
                },
                max: maximoPrivado
            },
        ],
        series: reversedSeriesData.map((data, index) => ({
            name: seriesNames[index],
            color: colors[index],
            type: 'line',
            data: data,
            yAxisIndex: index === 1 ? 1 : 0,
        })),
    }

    return <ReactECharts option={option} style={{ height: "40%", width: "100%" }} />
}


export default LineChartEmpPubPri



/**
 * 
 * get options all()
    para mostrar porcentaje

    // const newArray = seriesData.map(({ name, data }) => ({
    //     name,
    //     yearsArray:
    //         data[1].map((val, i) => Math.round((100 / (val / data[0][i])) * 100) / 100)
    //             .reverse()
    // }))


    leyenda en el grafico
    // legend: {
    //     data: newArray.map(s => s.name),
    //     bottom: 10, // ⬅️ aquí pones la leyenda abajo
    // },




 */