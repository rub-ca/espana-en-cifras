import { getYear, getGenre, addDotsToNumbers, getRowClassByGenre, getIndexPrimarySelected, getPais59, getAgeGroup100 } from "../../js/utilsPob.js"
import ThHeader from './ThHeader.jsx'
import TdFirstCell from './TdFirstCell.jsx'
import TdAlignRight from './TdAlignRight.jsx'

const TablePobMuniPais = ({ data, primarySelected, secondaryDropdowns, page, listeners }) => {
    if (!primarySelected) return <div>No hay datos disponibles</div>

    const dataArray = data[getIndexPrimarySelected(data, primarySelected)].data

    const numGenres = dataArray.length
    const numOrigen = dataArray[0].length
    const numYears = dataArray[0][0].length

    const headers = page === 'PagePobMuniEdad' ? ['Género / Edad'] : ['Género / Pais origen']


    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year)}`)

    const rows = []

    for (let genre = 0; genre < numGenres; genre++) {
        if (secondaryDropdowns[0].selected?.length && !secondaryDropdowns[0].selected.includes(getGenre(genre)))
            continue

        for (let origen = 0; origen < numOrigen; origen++) {
            if (page === 'PagePobMuniPais' && secondaryDropdowns[1].selected?.length && !secondaryDropdowns[1].selected.includes(getPais59(origen)))
                continue

            if (page === 'PagePobMuniEdad' && secondaryDropdowns[1].selected?.length && !secondaryDropdowns[1].selected.includes(getAgeGroup100(origen)))
                continue

            var row = [`${getGenre(genre)} / ${getPais59(origen)}`]
            if (page === 'PagePobMuniEdad') {
                row = [`${getGenre(genre)} / ${getAgeGroup100(origen)}`]
            }
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
        <div className="table">
            <div>
                <table>
                    <thead>
                        <tr className="table-header">
                            {headers.map((h, i) => (
                                <ThHeader
                                    key={i}
                                    onClick={() => listeners[0](h)}
                                    children={h}
                                    cursorPointer={true}
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