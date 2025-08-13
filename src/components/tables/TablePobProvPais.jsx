import { getYear, getAgeGroup90, getGenre, addDotsToNumbers, getRowClassByGenre, getPais13, getIndexPrimarySelected } from "../../js/utilsPob.js"
import ThHeader from './core/ThHeader'
import TdFirstCell from './core/TdFirstCell'
import TdAlignRight from './core/TdAlignRight'

const TablePobProvPais = ({ data, primarySelected, secondaryDropdowns, listeners }) => {
    if (!primarySelected) return <div>No hay datos disponibles</div>

    const dataArray = data[getIndexPrimarySelected(data, primarySelected)].data

    const numAgeGroups = dataArray.length
    const numpaises = dataArray[0].length
    const numYears = dataArray[0][0].length
    const numGenres = dataArray[0][0][0].length

    const headers = ['Edad / Pais origen / Género']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year)}`)

    const rows = []

    for (let age = 0; age < numAgeGroups; age++) {
        if (secondaryDropdowns[0].selected?.length &&
            !secondaryDropdowns[0].selected.includes(getAgeGroup90(age))) continue

        for (let pais = 0; pais < numpaises; pais++) {
            if ((secondaryDropdowns[2].selected?.length &&
                !secondaryDropdowns[2].selected.includes(getPais13(pais))) || getPais13(pais) == null) continue

            for (let genre = 0; genre < numGenres; genre++) {
                if (secondaryDropdowns[1].selected?.length &&
                    !secondaryDropdowns[1].selected.includes(getGenre(genre))) continue

                const row = [`${getAgeGroup90(age)} / ${getPais13(pais)} / ${getGenre(genre)}`]
                for (let year = 0; year < numYears; year++) {
                    const value = dataArray[age][pais][year][genre]
                    row.push(addDotsToNumbers(value))
                }

                rows.push(row)
            }
        }
    }
    return (
        <div className="table table-separator">
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
                        {rows.map((r, rowIndex) => (
                            <tr key={rowIndex} className={getRowClassByGenre(r)}>
                                {r.map((cell, cellIndex) =>
                                    cellIndex === 0 ? (
                                        <TdFirstCell
                                            key={cellIndex}
                                            onClick={() => listeners[1](cell)}
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

export default TablePobProvPais