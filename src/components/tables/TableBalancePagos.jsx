import ThHeader from './core/ThHeader.jsx'
import TdFirstCell from './core/TdFirstCell.jsx'
import TdAlignRight from './core/TdAlignRight.jsx'
import { getYear } from "../../js/utilsPob.js"
import { getRowClassByTypeOfWork } from "../../js/utilsEmp.js"

const TableBalancePagos = ({ dataEmpPubPriv, dataBalanceDesempleo, dataBalancePensiones, dataBalanceIMV,
    indexToShow, setIndexToShow }) => {

    const numYears = dataEmpPubPriv[0].data[0].length

    const headers = ['Tipo']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year, 2025)}`)

    const rows0 = getRows(dataEmpPubPriv, dataBalanceDesempleo, dataBalancePensiones, dataBalanceIMV, indexToShow, 0)
    const rows1 = getRows(dataEmpPubPriv, dataBalanceDesempleo, dataBalancePensiones, dataBalanceIMV, indexToShow, 1)

    const rows = [...rows0, ...rows1]
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
                            <tr key={rowIndex}>
                                {r.map((cell, cellIndex) =>
                                    cellIndex === 0 ? (
                                        <TdFirstCell
                                            key={cellIndex}
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

export default TableBalancePagos


function getRows(dataEmpPubPriv, dataBalanceDesempleo, dataBalancePensiones, dataBalanceIMV, indexToShow, tableShow) {
    const rows = []
    const numYears = dataEmpPubPriv[0].data[0].length

    // Fila empleo publico
    const rowEmpPub = ['Empleo Público']
    for (let year = 0; year < numYears; year++) {
        const value = dataEmpPubPriv[0].data[0][year]
        let multiplied = Math.round(value * 1000)
        rowEmpPub.push(multiplied.toLocaleString('es-ES'))
    }
    if (indexToShow[0] == tableShow) rows.push(rowEmpPub)

    // Fila empleo privado
    const rowEmpPriv = ['Empleo Privado']
    for (let year = 0; year < numYears; year++) {
        const value = dataEmpPubPriv[0].data[1][year]
        let multiplied = Math.round(value * 1000)
        rowEmpPriv.push(multiplied.toLocaleString('es-ES'))
    }
    if (indexToShow[1] == tableShow) rows.push(rowEmpPriv)


    const pensiones = [
        ['Pensiones Incapacidad', 1],
        ['Pensión Jubilación', 2],
        ['Pensión Viudedad', 3],
        ['Pensión Orfandad', 4],
        ['Pensión Favor Familiar', 5],
    ]
    pensiones.forEach(([nombre, idx]) => {
        const row = [nombre]
        for (let year = 0; year < numYears; year++) {
            const value = dataBalancePensiones[year][idx]
            row.push(value.toLocaleString('es-ES'))
        }
        const indexT = 2 + idx
        if (indexToShow[indexT] === tableShow) rows.push(row)
    })


    const prestaciones = [
        ['Prestación contributiva', 1],
        ['Prestación desempleo', 2],
        ['Prestación renta agraria', 3],
        ['Prestación subsidio agrario', 4],
        ['Prestación renta inserción', 5],
    ]
    prestaciones.forEach(([nombre, idx]) => {
        const row = [nombre]
        for (let year = 0; year < dataBalanceDesempleo.data.length; year++) {
            const value = dataBalanceDesempleo.data[year][idx]
            row.push(value.toLocaleString('es-ES'))
        }
        const indexT = 7 + idx
        if (indexToShow[indexT] === tableShow) rows.push(row)
    })


    const rowImg = ['Ingreso Mínimo Vital']
    dataBalanceIMV.data.forEach((yearData) => {
        const value = yearData.data
        rowImg.push(value.toLocaleString('es-ES'))
    })
    if (indexToShow[12] === tableShow) rows.push(rowImg)

    const rowSuma = [tableShow == 0 ? 'Suma A' : 'Suma B']
    for (let y = 1; y <= numYears; y++) {
        let suma = 0
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][y]) suma += parseInt(rows[i][y].replace(/\./g, '').replace(',', ''))
            else suma += 0
        }
        rowSuma.push(suma.toLocaleString('es-ES'))
    }
    rows.push(rowSuma)

    return rows
}