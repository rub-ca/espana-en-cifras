import React, { lazy, Suspense } from "react"

const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartEmpPubPri = ({ numSeries, seriesData, seriesNames }) => {
    const numYears = seriesData[0].length

    const yearsLegend = []
    for (let i = 0; i < numYears; i++) {
        yearsLegend.push((2024 - i).toString())
    }


    console.log("seriesNames", seriesNames)

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
        },
        yAxis: [
            {
                type: 'value',
                name: seriesNames[1],
                position: 'left',
                max: 20000,
                axisLabel: {
                    color: '#79bd1aff',
                },
            },
            {
                type: 'value',
                name: seriesNames[0],
                position: 'right',
                max: 10000,
                axisLabel: {
                    color: '#1a6ebdff',
                },
            },
        ],
        series: seriesData.map((data, index) => ({
            name: seriesNames[index],
            type: 'line',
            data: [...data].reverse(),
            yAxisIndex: index === 1 ? 1 : 0, // La segunda serie usa el eje derecho
        })),
    }

    return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
}


export default LineChartEmpPubPri
