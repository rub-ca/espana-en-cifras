import React, { lazy, Suspense } from "react"
const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartEmpProvSector = ({ provSelected, listaProvinciaOrdenIne, dataSector }) => {
    const selectedSplitted = provSelected.split("/")[0].trim().replace(/\d+/g, '').trim()
    const data = dataSector[listaProvinciaOrdenIne.findIndex(d => d.includes(selectedSplitted))].data

    const headerSector = ['Total', 'Agricultura', 'Industria', 'Construcción', 'Servicios']
    const headerColors = ['black', 'rgba(55, 196, 47)', 'rgba(243, 175, 72)', 'rgba(243, 72, 72)', 'rgba(75, 72, 243)']
    const numYears = data[0].length

    const reversedYearsLegend = Array.from({ length: numYears }, (_, i) => (2025 - i).toString()).reverse()
    const reversedDataSector = data.map(d => [...d].reverse())

    const newArray = []

    for (let y = 0; y < reversedDataSector.length; y++) {
        const dataYear = reversedDataSector[y]
        const yearArray = []
        for (let s = 0; s < dataYear.length; s++) {
            yearArray.push(dataYear[s])
        }
        newArray.push(yearArray)
    }

    const option = {
        title: {
            text: `Empleo ${selectedSplitted}`,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: headerSector,
            bottom: -2,
        },
        xAxis: {
            type: 'category',
            data: reversedYearsLegend,
        },
        yAxis: {
            type: 'log',
            name: 'trabajadores (m)',
            logBase: 5,
            minorSplitLine: { show: true },
        },
        series: newArray.map((serie, i) => ({
            name: headerSector[i],
            color: headerColors[i],
            type: 'line',
            data: serie,
        })),
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

export default LineChartEmpProvSector