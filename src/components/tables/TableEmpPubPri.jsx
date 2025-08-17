import ThHeader from './core/ThHeader.jsx'
import TdFirstCell from './core/TdFirstCell.jsx'
import TdAlignRight from './core/TdAlignRight.jsx'
import { getYear } from "../../js/utilsPob.js"
import { getRowClassByTypeOfWork } from "../../js/utilsEmp.js"

const TableEmpPubPri = ({ data, listeners }) => {
    const numYears = data[0].data[0].length

    const headers = ['Comunidad / Público o Privado']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year, 2025)}`)

    const rows = []

    for (let comunidad = 0; comunidad < data.length; comunidad++) {
        for (let pubpri = 0; pubpri < 2; pubpri++) {
            const row = [`${data[comunidad].name} / ${pubpri === 0 ? "Público" : "Privado"}`]

            for (let year = 0; year < numYears; year++) {
                const value = data[comunidad].data[pubpri][year]
                let multiplied = Math.round(value * 1000)

                row.push(multiplied.toLocaleString('es-ES'))
            }

            rows.push(row)
        }
    }


    return (
        <div className="table table-separator">
            <div>
                <table>
                    <thead>
                        <tr className="table-header table-header-empleo">
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
                            <tr key={rowIndex} className={getRowClassByTypeOfWork(r)}>
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

export default TableEmpPubPri