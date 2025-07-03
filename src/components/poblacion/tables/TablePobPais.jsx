import "./TablePob.css"
import { getYear, getAgeGroup90, getGenre, addDotsToNumbers, getRowClassByGenre, getIndexPrimarySelected } from "../../../utilsPob.js"
import ThHeader from './ThHeader'
import TdFirstCell from './TdFirstCell'
import TdAlignRight from './TdAlignRight'

const TablePobPais = ({ data, primarySelected, secondaryDropdowns, listeners }) => {
    if (!primarySelected) return <div>No hay datos disponibles</div>

    const dataArray = data[getIndexPrimarySelected(data, primarySelected)].data

    const numAgeGroups = dataArray.length
    const numYears = dataArray[0].length
    const numGenres = dataArray[0][0].length

    const headers = ['Edad / Género']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year)}`)


    const rows = []

    for (let age = 0; age < numAgeGroups; age++) {
        if (secondaryDropdowns[0].selected?.length && !secondaryDropdowns[0].selected.includes(getAgeGroup90(age)))
            continue

        for (let genre = 0; genre < numGenres; genre++) {
            if (secondaryDropdowns[1].selected?.length && !secondaryDropdowns[1].selected.includes(getGenre(genre)))
                continue

            const row = [`${getAgeGroup90(age)} / ${getGenre(genre)}`]
            for (let year = 0; year < numYears; year++) {
                const value = dataArray[age][year][genre]
                row.push(addDotsToNumbers(value))
            }

            rows.push(row)
        }
    }

    return (
        <div className="table-pob-pais">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
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
                        {rows.map((row, rowIndex) => (
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

export default TablePobPais