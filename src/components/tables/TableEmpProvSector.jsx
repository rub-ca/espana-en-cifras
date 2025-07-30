import ThHeader from './ThHeader.jsx'
import TdFirstCell from './TdFirstCell.jsx'
import TdAlignRight from './TdAlignRight.jsx'
import { getYear } from "../../js/utilsPob.js"
import { getRowClassBySectorJob } from "../../js/utilsEmp.js"

// sector 0 total - sector 1 agriculture - sector 2 industry
// sector 3 building -  sector 4 services
const TableEmpProvSector = ({ data, listeners }) => {
    const numYears = data[0].data[0].length

    const headers = ['Comunidad / Sector']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year, 2025)}`)

    const rows = []

    for (let province = 0; province < data.length; province++) {
        for (let sector = 0; sector < 5; sector++) {
            const row = [`${data[province].name} / ${sector === 0 ? "Total" : sector === 1 ? "Agricultura" : sector === 2 ? "Industria" : sector === 3 ? "Construcción" : "Servicios"}`]

            for (let year = 0; year < numYears; year++) {
                const value = data[province].data[sector][year]
                let multiplied = Math.round(value * 1000)

                row.push(multiplied.toLocaleString('es-ES'))
            }
            rows.push(row)
        }
    }


    return (
        <div className="table">
            <div>
                <table>
                    <thead>
                        <tr>
                            {headers.map((h, i) => (
                                <ThHeader
                                    key={i}
                                    children={h}
                                    cursorPointer={false}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, rowIndex) => (
                            <tr key={rowIndex} className={getRowClassBySectorJob(r)}>
                                {r.map((cell, cellIndex) =>
                                    cellIndex === 0 ? (
                                        <TdFirstCell
                                            key={cellIndex}
                                            onClick={() => { listeners[0](cell) }}
                                            children={cell}
                                            cursorPointer={true}
                                        />
                                    ) : (
                                        <TdAlignRight key={cellIndex}>{cell}</TdAlignRight>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default TableEmpProvSector