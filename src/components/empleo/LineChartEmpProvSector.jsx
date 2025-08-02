import React, { lazy, Suspense } from "react"
const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartEmpProvSector = ({ provSelected, dataProv, dataSector }) => {
    const selectedSplitted = provSelected.split("/")[0].trim().replace(/\d+/g, '').trim()
    const data = dataSector[dataProv.findIndex(d => d.name.includes(selectedSplitted))].data

    const headerSector = ['Total', 'Agricultura', 'Industria', 'Construcción', 'Servicios']
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
            text: 'Evolución anual',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: headerSector,
            top: 40,
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
            name: `Serie ${i + 1}`,
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