import ThHeader from './ThHeader.jsx'
import TdFirstCell from './TdFirstCell.jsx'
import TdAlignRight from './TdAlignRight.jsx'
import { getYear } from "../../js/utilsPob.js"

const TableEmpPubPri = ({ data, listeners }) => {

    const numYears = data[0].data[0].length

    const headers = ['Comunidad / Público o Privado']
    for (let year = 0; year < numYears; year++) headers.push(`${getYear(year)}`)

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
                                    cursorPointer={true}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {rows.map((r, rowIndex) => (
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
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default TableEmpPubPri