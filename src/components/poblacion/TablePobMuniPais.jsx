import "./TablePob.css"
import { getYear, getGenre, addDotsToNumbers, getRowClassByGenre, getIndexPrimarySelected, getPais59 } from "../../utilsPob.js"
import ThHeader from './ThHeader'
import TdFirstCell from './TdFirstCell'
import TdAlignRight from './TdAlignRight'

const TablePobMuniPais = ({ data, primarySelected, secondaryDropdowns }) => {
    if (!primarySelected) return <div>No hay datos disponibles</div>

    const dataArray = data[getIndexPrimarySelected(data, primarySelected)].data

    const numGenres = dataArray.length
    const numOrigen = dataArray[0].length
    const numYears = dataArray[0][0].length

    const headers = ['Género / Pais origen']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year)}`)


    const rows = []

    for (let genre = 0; genre < numGenres; genre++) {
        if (secondaryDropdowns[0].selected?.length && !secondaryDropdowns[0].selected.includes(getGenre(genre)))
            continue

        for (let origen = 0; origen < numOrigen; origen++) {
            if (secondaryDropdowns[1].selected?.length && !secondaryDropdowns[1].selected.includes(getPais59(origen)))
                continue

            const row = [`${getGenre(genre)} / ${getPais59(origen)}`]
            for (let year = 0; year < numYears; year++) {
                const value = dataArray[genre][origen][year]
                row.push(addDotsToNumbers(value))
            }

            rows.push(row)
        }
    }


    // Reorder rows by the second part of the title (after the slash)
    // this is to keep the order consistent 
    const grouped = {}
    const order = []
    for (const row of rows) {
        const title = row[0]
        const parts = title.split('/')
        const key = parts[1] || title

        if (!grouped[key]) {
            grouped[key] = []
            order.push(key)
        }
        grouped[key].push(row)
    }
    const reorderedRows = order.flatMap(key => grouped[key])

    return (
        <div className="table-pob-pais">
            <div className="table-container">
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
                        {reorderedRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className={getRowClassByGenre(row)}>
                                {row.map((cell, cellIndex) =>
                                    cellIndex === 0 ? (
                                        <TdFirstCell
                                            key={cellIndex}
                                            children={cell}
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

export default TablePobMuniPais