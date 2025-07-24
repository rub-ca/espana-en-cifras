import React, { lazy, Suspense } from "react"

const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartEmpPubPri = ({ numSeries, seriesData, seriesNames }) => {
    console.log("\n\n")
    const numYears = seriesData[0].length

    let yearsLegend = []
    for (let i = 0; i < numYears; i++) {
        yearsLegend.push((2024 - i).toString())
    }

    const reversedYearsLegend = yearsLegend.reverse()
    const reversedSeriesData = seriesData.map(data => [...data].reverse())

    console.log("seriesNames", seriesNames)
    console.log("reversedYearsLegend", reversedYearsLegend)
    console.log("reversedSeriesData", reversedSeriesData)

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
                max: 10000
            },
            {
                type: 'value',
                name: seriesNames[1],
                position: 'right',
                axisLabel: {
                    color: '#79bd1aff',
                },
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
