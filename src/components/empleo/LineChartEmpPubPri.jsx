import React, { lazy, Suspense } from "react"

const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartEmpPubPri = ({ numSeries, seriesData, seriesNames }) => {

    const numYears = seriesData[0].length

    const yearsLegend = []
    for (let i = 0; i < numYears; i++) {
        yearsLegend.push((2024 - i).toString())
    }

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
            data: yearsLegend.reverse(),
            name: 'Año',
        },
        yAxis: {
            type: 'value',
            name: 'Valor',
        },
        series: seriesData.map((data, index) => ({
            name: seriesNames[index],
            type: 'line',
            data: [...data].reverse(),
        })),
    }

    return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
}


export default LineChartEmpPubPri
