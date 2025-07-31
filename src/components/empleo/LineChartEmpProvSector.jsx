import React, { lazy, Suspense } from "react"
const ReactECharts = lazy(() => import('echarts-for-react'))

const LineChartEmpProvSector = ({ type, provSelected, dataProv, dataSector }) => {
    if (type === 'provincia_sector') {
        return getGraphProvinciaSector({ provSelected, dataProv, dataSector })
    }
    return null
}

function getGraphProvinciaSector({ provSelected, dataProv, dataSector }) {
    const selectedSplitted = provSelected.split("/")[0].trim().replace(/\d+/g, '').trim()
    console.log('\n\n')
    console.log(`selectedSplitted:${selectedSplitted}:`)

    const index = dataProv.findIndex(d => d.name.includes(selectedSplitted))
    if (index === -1) {
        console.error(`No se encontró la provincia: ${selectedSplitted}`)
        return null
    }

    // let index = 0
    const data = dataSector[index].data
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
            name: 'ratio',
            logBase: 5,
            minorSplitLine: { show: true },
        },
        series: newArray.map((serie, i) => ({
            name: `Serie ${i + 1}`,
            type: 'line',
            data: serie,
        })),
    }

    return <ReactECharts option={option} style={{ height: "40%", width: "100%" }} />
}

export default LineChartEmpProvSector