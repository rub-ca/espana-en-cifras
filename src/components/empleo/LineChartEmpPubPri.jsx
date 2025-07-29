import React, { lazy, Suspense } from "react"
import { getIndexComunidad19WithInclude } from "../../js/utilsEmp.js"

const ReactECharts = lazy(() => import('echarts-for-react'))

// PageEmpPubPri [0] publico [1] privado

const LineChartEmpPubPri = ({ comunidadSelected, seriesData, seriesNames }) => {
    const selectedSplitted = comunidadSelected.split("/")[0].trim()

    const data = seriesData[getIndexComunidad19WithInclude(selectedSplitted)].data
    const numYears = data[0].length

    const reversedYearsLegend = Array.from({ length: numYears }, (_, i) => (2024 - i).toString()).reverse()
    const reversedSeriesData = data.map(data => [...data].reverse())

    const maximoPrivado = Math.round(Math.max(...reversedSeriesData.flat()) * 1.15)
    const maximoPrivadoDivided = Math.round(maximoPrivado / 3)
    const maximoPublico = (Math.max(...reversedSeriesData[0]) > maximoPrivadoDivided)
        ? Math.max(...reversedSeriesData[0]) : maximoPrivadoDivided

    const option = {
        title: {
            text: 'Evolución anual',
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
                    color: '#1a6ebdff',
                },
                max: maximoPublico
            },
            {
                type: 'value',
                name: seriesNames[1],
                position: 'right',
                axisLabel: {
                    color: '#79bd1aff',
                },
                max: maximoPrivado
            },
        ],
        series: reversedSeriesData.map((data, index) => ({
            name: seriesNames[index],
            type: 'line',
            data: data,
            yAxisIndex: index === 1 ? 1 : 0,
        })),
    }

    return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
}


export default LineChartEmpPubPri
