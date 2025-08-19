import React, { lazy, Suspense } from "react"
const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartBalancePagos = ({ dataSumaA, dataSumaB }) => {
    console.log(dataSumaA)
    console.log(dataSumaB)
    const numYears = dataSumaA.length
    const reversedYearsLegend = Array.from({ length: numYears }, (_, i) => (2025 - i).toString()).reverse()

    console.log('t', typeof (dataSumaA[0]))

    const reversedSumaA = dataSumaA.map(v => parseInt(v.replaceAll(".", ""))).reverse()
    const reversedSumaB = dataSumaB.map(v => parseInt(v.replaceAll(".", ""))).reverse()

    console.log('re', reversedSumaA)
    console.log('re', reversedSumaB)
    const option = {
        title: {
            text: `Balance pagos`,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            // data: reversedYearsLegend,
            bottom: -2,
        },
        xAxis: {
            type: 'category',
            data: reversedYearsLegend,
        },
        yAxis: {
            type: 'value',
            name: 'Sumas',
            // logBase: 3,
            // minorSplitLine: { show: true },
        },
        series: [
            {
                name: 'Suma A',
                type: 'line',
                data: reversedSumaA,
            },
            {
                name: 'Suma B',
                type: 'line',
                data: reversedSumaB,
            }
        ]
    }

    return <div style={{
        height: "100%", width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <ReactECharts option={option} style={{ height: "70%", width: "100%" }} />
    </div>

}

export default LineChartBalancePagos