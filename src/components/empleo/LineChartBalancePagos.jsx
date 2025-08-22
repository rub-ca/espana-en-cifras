import React, { lazy, Suspense } from "react"
const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartBalancePagos = ({ dataSumaA, dataSumaB }) => {
    const numYears = dataSumaA.length
    const reversedYearsLegend = Array.from({ length: numYears }, (_, i) => (2025 - i).toString()).reverse()

    const reversedSumaA = dataSumaA.map(v => parseInt(v.replaceAll(".", ""))).reverse()
    const reversedSumaB = dataSumaB.map(v => parseInt(v.replaceAll(".", ""))).reverse()


    const colors = [
        'rgba(95, 184, 60, 0.8)',
        'rgba(52, 81, 134, 0.8)',
    ]

    const option = {
        title: {
            text: `Balance pagos`,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: 80,
            right: 30,
            top: 60,
            bottom: 40
        },
        xAxis: {
            type: 'category',
            data: reversedYearsLegend,
        },
        yAxis: {
            type: 'value',
            name: 'Sumas',
        },
        series: [
            {
                name: 'Suma A',
                type: 'line',
                data: reversedSumaA,
                color: colors[0]
            },
            {
                name: 'Suma B',
                type: 'line',
                data: reversedSumaB,
                color: colors[1]
            }
        ]
    }

    return <div style={{
        height: "100%", width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <ReactECharts option={option} style={{ height: "85%", width: "100%" }} />
    </div>

}

export default LineChartBalancePagos